const express = require("express");
const pool = require("../config");
const path = require("path")
router = express.Router();
const multer = require('multer')
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

router.get("/checkout", async function (req, res, next) {
  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();
  const userid =  req.query.user
  const book =  req.query.book
  console.log(req.query.book)
   try{
    const orderid = await conn.query("INSERT INTO book_order (customer_id,date_of_borrow,end_of_date) VALUES(?,NOW(),date_add(now(),interval 7 day));", [
      userid,
    ]);
   const orderId = orderid[0].insertId
   book.forEach(async element => {
    await conn.query("INSERT INTO book_order_line (order_id,isbn,status) VALUES(?,?,?);", [
      orderId,element.isbn,"Borrowed"]);
   });
   book.forEach(async element => {
    await conn.query("INSERT INTO book_possession (customer_id,isbn) VALUES(?,?);", [
      userid,element.isbn]);
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

exports.router = router;