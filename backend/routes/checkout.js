const express = require("express");
const pool = require("../config");
const path = require("path")
router = express.Router();
const multer = require('multer')
const { isLoggedIn } = require('../middlewares')
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

router.get("/checkout",isLoggedIn, async function (req, res, next) {
  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();
  const userid = req.query.user
  const book = req.query.book
  
  try {

    const orderid = await conn.query("INSERT INTO book_order (customer_id,date_of_borrow,end_of_date) VALUES(?,NOW(),date_add(now(),interval 7 day));", [
      userid,
    ]);
    const orderId = orderid[0].insertId
    book.forEach(async element => {
      await conn.query("INSERT INTO book_order_line (order_id,isbn,status,book_name) VALUES(?,?,?,?);", [
        orderId, element.isbn, "Borrowed",element.book_name]);

      await conn.query("UPDATE books set book_stock = book_stock-1  where isbn = ?", [
        element.isbn]);
    });
    book.forEach(async element => {
      await conn.query("INSERT INTO book_possession (customer_id,isbn) VALUES(?,?);", [
        userid, element.isbn]);
    });
    res.json("8;p")
    conn.commit()
  } catch (error) {
    await conn.rollback();
    next(error);
  } finally {
    console.log('finally')
    conn.release();
  }
});

router.get("/checkbook", async function (req, res, next) {
  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();
  const userid = req.query.user
  try {
    const orderid = await conn.query("SELECT order_id, customer_id FROM book_order where DATE(end_of_date) <= CURDATE();");
    orderid[0].forEach(async order => {
      let isbn = await conn.query("SELECT isbn,order_id from book_order_line  where order_id = ? and status = 'Borrowed' ", [
        order.order_id]);

      isbn[0].forEach(async (book ,index) => {
        await conn.query("UPDATE book_order_line set status = 'Returned'  where isbn = ? and order_id = ?", [
          book.isbn, book.order_id]);
         
          await conn.query("DELETE FROM book_possession where customer_id = ? and isbn = ?", [
            order.customer_id,  book.isbn]);
            await conn.query("UPDATE books set book_stock = book_stock+1  where isbn = ?", [
              book.isbn]);
      });
    });

    res.json(orderid[0])
    conn.commit()
  } catch (error) {
    await conn.rollback();
    next(error);
  } finally {
    console.log('finally')
    conn.release();
  }
});


router.get("/checkcart",isLoggedIn, async function (req, res, next) {
  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();
  const userid = req.query.user
  const isbn = req.query.bookisbn
  try {
    let ownbook = await conn.query("SELECT isbn, customer_id FROM book_possession where customer_id = ? and isbn = ?;",[
      userid,isbn
    ]);
    
    if(ownbook[0].length){
      res.status(400).json("You already borrow this book.")
    }
    conn.commit()
    res.send()
  } catch (error) {
    await conn.rollback();
    next(error);
  } finally {
    console.log('finally')
    conn.release();
  }
});
router.put("/returnBook",isLoggedIn, async function (req, res, next) {
  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();
  const userid = req.body.params.userId
  const isbn = req.body.params.isbn
 console.log( req.body)
  try {
    let returnBookFromPossession = await conn.query("delete from book_possession where isbn = ? and customer_id = ?",[
      isbn, userid
    ]);
    let changeStatus = await conn.query("update Book_order_line set status = 'Returned' where order_line_id = (select order_line_id from book_order_line join book_order using(order_id) where customer_id = ? and isbn = ? and status = 'Borrowed')",[
      userid, isbn
    ]);
    let returnStock = await conn.query('update books set book_stock = book_stock+1 where isbn = ?',[
      isbn
    ])
    let result = await conn.query("select book_img, Book_order_line.book_name, bp.*, bo.* from book_possession bp join books using(isbn) \
    join Book_order_line using(isbn) join Book_order bo using(order_id) where bp.customer_id = ? and status = 'Borrowed'",
      [userid])
    
    conn.commit()
    res.json({result:result[0]})
  } catch (error) {
    await conn.rollback();
    next(error);
  } finally {
    console.log('finally')
    conn.release();
  }
});

router.put("/changeStatus",isLoggedIn, async function (req, res, next) {
  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();
  
 console.log( req.body)


 try {
  let changeStatus = await conn.query("update Book_order_line set status = 'Returned' where order_line_id = ?",[
    req.body.item.order_line_id
  ]);
  let cusid = await conn.query("SELECT customer_id FROM book_order where order_id = ?",[
    req.body.item.order_id
  ]);
  let delbook = await conn.query("DELETE FROM book_possession where customer_id = ? and isbn = ?",[
    cusid[0][0].customer_id,req.body.item.isbn
  ]);
  let orderline = await conn.query("SELECT * FROM book_order_line WHERE order_id = ?",[
    req.body.item.order_id
  ]);
  conn.commit()
  res.json({orderline: orderline[0][0]})
} catch (error) {
  await conn.rollback();
  next(error);
} finally {
  console.log('finally')
  conn.release();
}
});

exports.router = router;