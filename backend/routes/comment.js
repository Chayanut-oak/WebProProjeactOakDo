const express = require("express");
const path = require("path");
const pool = require("../config");
const router = express.Router();
const fs = require('fs');
const { isLoggedIn } = require('../middlewares/index.js')
// Require multer for file upload
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


// Get comment


// Create new comment
router.post('/:id/comments',isLoggedIn, async function(req, res, next){
    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();
    const comment = req.body.comment;

    try {
      let cusid = await pool.query(
        "SELECT customer_id from customer_token where token = ? ;",
        [req.body.token]
      )
        
        let results = await conn.query(
          "INSERT INTO comments( isbn, customer_id, comment,created_when) VALUES(?, ?, ?, NOW());",
          [req.params.id, cusid[0][0].customer_id,comment]
        )
        await conn.commit()
        res.json(cusid)
      } catch (err) {
        await conn.rollback();
        next(err);
      } finally {
        console.log('finally')
        conn.release();
      }
    });


// Update comment





exports.router = router