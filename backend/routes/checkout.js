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

router.post("/checkout", async function (req, res, next) {
  userid = req.query.user
  orderid = req.query.order_id
  console.log(userid)
   try{
    const orderline = await pool.query("SELECT * FROM book_order_line WHERE order_id = ?", [
      orderid,
    ]);

   res.json({orderline:orderline[0]}) 
    
   }catch (err) {
      next(err);
    } finally {
      console.log('finally')
    }
  });
exports.router = router;