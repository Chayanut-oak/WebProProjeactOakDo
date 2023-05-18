const express = require("express");
const pool = require("../config");
const path = require("path")
router = express.Router();
const multer = require('multer')
const { isLoggedIn } = require('../middlewares')
const { generateToken } = require("../utils/token");
const Joi = require('joi')
const argon2 = require('argon2');
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './static/uploads')
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })
router.get("/", async function (req, res, next) {
  try {
    const query = await pool.query("SELECT * FROM Books join Book_type using (isbn) join Type using(Type_id);")
    res.json({
      book: query[0]
    });
  } catch (err) {
    return next(err)
  }
});
router.get("/User", isLoggedIn, async function (req, res, next) {
  const conn = await pool.getConnection()
  await conn.beginTransaction();
  const token = req.query.token

  try {
    let results1 = await conn.query("SELECT customer_id FROM customer_token WHERE token = ?;",
      [token])
    let results2 = await conn.query("SELECT admin_id FROM admin_token WHERE token = ?;",
      [token])
    const adminID = results2[0][0]

    const cusID = results1[0][0]
    if (results1[0].length != 0) {
      let cusinfo = await conn.query("SELECT * FROM Customer where customer_id = ?;", [
        cusID.customer_id
      ])
      let possession = await conn.query('select book_img, book_name, bp.*, bo.* from book_possession bp join books using(isbn) \
      join Book_order_line using(isbn) join Book_order bo using(order_id) where bp.customer_id = ? and status = "Borrowed"', [
        cusID.customer_id
      ])
      return res.json({ customer_info: cusinfo[0][0], possession: possession[0], role: req.user.type })

    }
    if (results2[0].length != 0) {
      let adminInfo = await conn.query("SELECT * FROM admin where admin_id = ?;", [
        adminID.admin_id
      ])
      return res.json({ admin_info: adminInfo[0][0], role: req.user.type })
    }


    // await conn.query("SELECT b.book_name , c.customer_img, c.start_membership, \
    // bo.date_of_borrow, bo.end_of_date, b.book_img, c.customer_id, c.fname, c.lname, c.email,\
    // c.phone_num, bp.isbn FROM Customer c left JOIN Book_possession bp ON c.customer_id = bp.customer_id \
    // left JOIN Books b on bp.isbn = b.isbn left JOIN Book_order bo on c.customer_id = bo.customer_id left \
    // JOIN Book_order_line bol on bol.order_id= bo.order_id where c.customer_id = ? group by b.book_name;",
    //   [cusID.customer_id])

    conn.commit()
  } catch (error) {
    await conn.rollback();
    next(error);
  } finally {
    conn.release();
  }
});
router.put('/NewUser', isLoggedIn, upload.single('profile_img'), async (req, res, next) => {

  const conn = await pool.getConnection()
  await conn.beginTransaction();
  const fname = req.body.fname
  const lname = req.body.lname
  const phonenum = req.body.numphone
  const customer_id = req.body.customer_id
  const file = req.file
  try {
    if (req.user.type == 'customer') {
      if (file != null) {
        await conn.query(
          "UPDATE Customer SET customer_img = ? WHERE customer_id = ?;",
          [file.path.substr(6), customer_id])
      }
      if (fname) {
        await conn.query(
          "UPDATE Customer SET fname = ? WHERE customer_id = ?;",
          [fname, customer_id])
      }
      if (lname) {
        await conn.query(
          "UPDATE Customer SET lname = ? WHERE customer_id = ?;",
          [lname, customer_id])
      }
      if (phonenum) {
        await conn.query(
          "UPDATE Customer SET phone_num = ? WHERE customer_id = ?;",
          [phonenum, customer_id])
      }
      let cusinfo = await conn.query("SELECT * FROM Customer where customer_id = ?;", [
        customer_id
      ])
      res.json({ cusinfo: cusinfo[0][0], role: req.user.type })
    }
    if (req.user.type == 'admin') {
      if (file != null) {
        await conn.query(
          "UPDATE admin SET admin_img = ? WHERE admin_id = ?;",
          [file.path.substr(6), customer_id])
      }
      if (fname) {
        await conn.query(
          "UPDATE admin SET admin_fname = ? WHERE admin_id = ?;",
          [fname, customer_id])
      }
      if (lname) {
        await conn.query(
          "UPDATE admin SET admin_lname = ? WHERE admin_id = ?;",
          [lname, customer_id])
      }
      if (phonenum) {
        await conn.query(
          "UPDATE admin SET admin_phone = ? WHERE admin_id = ?;",
          [phonenum, customer_id])
      }
      let cusinfo = await conn.query("SELECT * FROM admin where admin_id = ?;", [
        customer_id
      ])
      res.json({ cusinfo: cusinfo[0][0], role: req.user.type })
    }
    conn.commit()

  } catch (error) {
    await conn.rollback();
    return next(error)
  } finally {
    console.log('finally')
    conn.release();
  }
});






const checkPassSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required()
})


router.post('/checkPass', async function (req, res, next) {
  try {
    await checkPassSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.status(400).send(err)
  }
  const email = req.body.email;
  const password = req.body.password;

  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();
  try {
    const results = await conn.query(
      "SELECT * from customer where email = ?;",
      [email]
    );
    const results2 = await conn.query(
      "SELECT * from admin where admin_email = ?;",
      [email]
    );

    if (results[0].length != 0) {
      if (!(await argon2.verify(results[0][0].password, password))) {
        throw new Error('Invalid Password')
      }
      results[0][0].type = 'customer'
      const val = { result: results[0], bool: true }
      res.json(val)
    }
    else if (results2[0].length != 0) {

      if (!(await argon2.verify(results2[0][0].admin_password, password))) {
        throw new Error('Invalid Password')
      }
      results2[0][0].type = 'admin'
      const val2 = { result: results2[0], bool: true }
      res.json(val2)
    } else {
      throw new Error(error)
    }
  } catch (err) {
    res.status(401).json("Invalid Password")
  }

});





const checkEmailSchema = Joi.object({
  email: Joi.string().required().email(),
  customer_id: Joi.required()
})


router.put('/NewEmail', isLoggedIn, async (req, res, next) => {

  try {
    await checkEmailSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.status(400).send(err)
  }

  const conn = await pool.getConnection()
  await conn.beginTransaction();
  const email = req.body.email
  const customer_id = req.body.customer_id

  try {
    if (req.user.type == 'customer') {
      if (email) {
        await conn.query(
          "UPDATE Customer SET email = ? WHERE customer_id = ?;",
          [email, customer_id])
      }
      let cusinfo = await conn.query("SELECT * FROM Customer where customer_id = ?;", [
        customer_id
      ])
      res.json({ cusinfo: cusinfo[0][0], role: req.user.type })
    }
    if (req.user.type == 'admin') {
      if (email) {
        await conn.query(
          "UPDATE admin SET admin_email = ? WHERE admin_id = ?;",
          [email, customer_id])
      }
      let cusinfo = await conn.query("SELECT * FROM admin where admin_id = ?;", [
        customer_id
      ])
      res.json({ cusinfo: cusinfo[0][0], role: req.user.type })
    }
    conn.commit()

  } catch (error) {
    await conn.rollback();
    return next(error)
  } finally {
    console.log('finally')
    conn.release();
  }
});









router.post("/Addbook", isLoggedIn, upload.single('book_img'), async function (req, res, next) {
  const conn = await pool.getConnection()
  await conn.beginTransaction();
  const isbn = req.body.isbn
  const book_name = req.body.book_name
  const book_desc = req.body.book_desc
  const published_date = req.body.published_date
  const book_stock = req.body.book_stock
  const alias = req.body.alias
  const author = req.body.author
  const publisher_name = req.body.publisher_name
  const file = req.file;
  const type = req.body.type;
  try {
    let oldisbn = await conn.query(
      "SELECT isbn FROM Books where isbn = ?;", [
      isbn])
    if (oldisbn[0].length == 0) {
      let authorid = await conn.query(
        "SELECT author_id FROM Author where author_name = ?;", [
        author]
      )
      if (authorid[0].length == 0) { //นี่คือไม่มีAuthorเลยadd
        let newauthor = await conn.query(
          "INSERT INTO Author(author_name,author_alias) values(?,?);", [
          author, alias])
        authorid = newauthor[0].insertId
      } else {
        authorid = authorid[0][0].author_id
      }

      let pubid = await conn.query(
        "SELECT publisher_id FROM Publisher where publisher_name = ?;", [
        publisher_name])

      pubid = pubid[0][0]
      if (!pubid) { //นี่คือไม่มีpublisherเลยadd
        let newpub = await conn.query(
          "INSERT INTO Publisher(publisher_name) values(?);", [
          publisher_name]
        )
        pubid = newpub[0].insertId
      } else {
        pubid = pubid.publisher_id
      }

      if (file) {
        let newbook = await conn.query(
          "REPLACE  INTO Books VALUES(?,?,?,?,?,?,?);",
          [isbn, book_name, file.path.substr(6), book_desc, published_date, pubid, book_stock])
      }
      let newbookauthor = await conn.query(
        "INSERT INTO Book_Author(author_id,isbn) values(?,?);", [
        authorid, isbn]
      )
      let typeid = await conn.query(
        "SELECT Type_id FROM Type where book_type = ?;", [
        type]
      )
      let newbooktype = await conn.query(
        "INSERT INTO Book_type(isbn,Type_id) values(?,?);", [
        isbn, typeid[0][0].Type_id]
      )
    } else {
      res.status(401).json("This Book already in exit!")
    }
    let newbook = await conn.query(
      "SELECT b.* ,c.*,a.* ,t.* FROM Books b  JOIN publisher c USING(publisher_id) join book_author USING(isbn) join Author a using(author_id) join book_type using(isbn) join Type t using(type_id);"
    )
    res.send(newbook[0])
    conn.commit()
  } catch (error) {
    await conn.rollback();
    next(error);
  } finally {
    console.log('finally')
    conn.release();
  }
});

router.get("/book", async function (req, res, next) {

  try {
    let book = await pool.query(
      "SELECT distinct b.* ,c.*,a.* ,t.* FROM Books b  JOIN publisher c USING(publisher_id) join book_author USING(isbn) join Author a using(author_id) join book_type using(isbn) join Type t using(type_id);"
    )
    let user = await pool.query(
      "SELECT c.customer_id, c.fname, c.lname, c.email, c.start_membership, bo.order_id,bo.date_of_borrow ,bo.end_of_date ,bol.order_line_id,bol.isbn,bol.status FROM Customer c join book_order bo using (customer_id) left join book_order_line bol using(order_id);"
    )
    let cus = await pool.query(
      "SELECT c.customer_id, c.fname, c.lname, c.email, c.start_membership FROM Customer c;"
    )
    let author = await pool.query(
      "SELECT * FROM Author;"
    )
    res.send({ book: book[0], customerH: user[0], customer: cus[0], author: author[0] })

  } catch (error) {
    next(error)
  }
});
router.delete("/bookdel", isLoggedIn, async function (req, res, next) {

  try {
    let delbook = await pool.query(
      "DELETE FROM Books where isbn = ?;", [req.query.isbn]
    )
    res.send("success")

  } catch (error) {
    next(error)
  }
});

router.get("/product/:id", async function (req, res, next) {
  const conn = await pool.getConnection()
  await conn.beginTransaction();
  try {
    const selbook = await conn.query("SELECT * FROM books join book_author using(isbn) join author using (author_id) WHERE isbn=?", [
      req.params.id,
    ]);
    const result = await conn.query("SELECT * FROM Comments join Customer using(customer_id) WHERE isbn=?", [
      req.params.id,
    ]);

    res.json({ book: selbook[0][0], comment: result[0] })

    conn.commit()
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    console.log('finally')
    conn.release();
  }
});
router.put("/update", isLoggedIn, upload.single('newbook_img'), async function (req, res, next) {
  const conn = await pool.getConnection()
  await conn.beginTransaction();
  const isbn = req.body.isbn
  const book_name = req.body.book_name
  const book_desc = req.body.book_desc
  const published_date = req.body.published_date
  const book_stock = req.body.book_stock
  const alias = req.body.alias
  const author = req.body.author
  const publisher_name = req.body.publisher_name
  const file = req.file;
  const type = req.body.type;
  const oldisbn = req.body.oldisbn;
  const oldfile = req.body.oldfile;

  try {
    if (file) {
      const setimg = await conn.query("UPDATE Books set book_img = ? where isbn = ?", [
        file.path.substr(6), oldisbn
      ]);
    } else {
      const setoldimg = await conn.query("UPDATE Books set book_img = ? where isbn = ?", [
        oldfile, oldisbn]);
    }
    let authorid = await conn.query(
      "SELECT author_id FROM Author where author_name = ?;", [
      author]
    )
    if (authorid[0].length == 0) { //นี่คือไม่มีAuthorเลยadd
      let newauthor = await conn.query(
        "INSERT INTO Author(author_name,author_alias) values(?,?);", [
        author, alias])
      authorid = newauthor[0].insertId
    } else {
      authorid = authorid[0][0].author_id
    }

    let pubid = await conn.query(
      "SELECT publisher_id FROM Publisher where publisher_name = ?;", [
      publisher_name])

    pubid = pubid[0][0]
    if (!pubid) { //นี่คือไม่มีpublisherเลยadd
      let newpub = await conn.query(
        "INSERT INTO Publisher(publisher_name) values(?);", [
        publisher_name]
      )
      pubid = newpub[0].insertId
    } else {
      pubid = pubid.publisher_id
    }
    const setbook = await conn.query("UPDATE Books set isbn = ?,book_name = ?, book_desc = ?, publishered_date = ?,publisher_id = ?,book_stock = ?  where isbn = ?", [
      isbn, book_name, book_desc, published_date + 1, pubid, book_stock, oldisbn
    ]);
    let newtypeid = await conn.query(
      "SELECT Type_id FROM Type where book_type = ?;", [
      type])
    const newtype = await conn.query("UPDATE book_type set Type_id = ? where isbn = ?", [
      newtypeid[0][0].Type_id, isbn
    ]);
    const changeauthor = await conn.query("UPDATE Book_author set author_id = ? where isbn = ?", [
      authorid, isbn
    ]);
    let book = await conn.query(
      "SELECT distinct b.* ,c.*,a.* ,t.* FROM Books b  JOIN publisher c USING(publisher_id) join book_author USING(isbn) join Author a using(author_id) join book_type using(isbn) join Type t using(type_id);"
    )
    res.send(book[0])
    conn.commit()
  } catch (error) {
    await conn.rollback();
    next(error);
  } finally {
    console.log('finally')
    conn.release();
  }
});

router.get("/order", async function (req, res, next) {
  cus_id = req.query.customer_id
  try {
    const orderid = await pool.query("SELECT * FROM book_order WHERE customer_id=?", [
      cus_id,
    ]);


    res.json({ orderid: orderid[0] })

  } catch (err) {
    next(err);
  } finally {
    console.log('finally')
  }
});
router.get("/orderline", isLoggedIn, async function (req, res, next) {
  orderid = req.query.order_id
  try {
    const orderline = await pool.query("SELECT * FROM book_order_line WHERE order_id = ?", [
      orderid,
    ]);
    res.json({ orderline: orderline[0] })
  } catch (err) {
    next(err);
  } finally {
    console.log('finally')
  }
});

exports.router = router;
