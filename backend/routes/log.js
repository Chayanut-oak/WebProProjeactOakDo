const express = require("express");
const path = require("path")
const pool = require("../config");


router = express.Router();

const multer = require('multer');
const { error } = require("console");

// Login
router.post('/SignIn', async function (req, res, next) {
  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();
  const email = req.body.email;
  const password = req.body.password;

  try {
    let results = await conn.query(
      "SELECT * from Customer where email = ? and password = ?;",
      [email, password]
    );
    let results2 = await conn.query(
      "SELECT * from Admin where admin_email = ? and admin_password = ?;",
      [email, password]
    );
    if (results[0].length != 0) {
      const val = { result: results[0], message: "customer" }
      res.json(val)
    } else if (results2[0].length != 0) {
      const val2 = { result: results2[0], message: "Addmin" }
      res.json(val2)
    } else {
      throw new Error(error)
    }
  } catch (err) {
    res.status(401).json("Invalid Email or Password")
  }

});
router.post('/SignUp', async function (req, res, next) {
  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const password = req.body.password;
  const conpassword = req.body.conpassword;
  const address = req.body.address;
  const pnum = req.body.pnum;
  try {
    let results2 = await conn.query(
      "SELECT email from Customer where email = ? ;",
      [email]
    );console.log(results2[0])
    let results3 = await conn.query(
      "SELECT admin_email from Admin where admin_email = ? ;",
      [email]
    );console.log(results3[0])
    if (results2[0].length > 0  ) {
      res.status(401).json("This E-mail already in exit!")
    }else if ( results3[0].length > 0) {
      res.status(401).json("This E-mail already in exit! Addmin")
    }
    else if (password == conpassword) {
      await conn.query(
        "INSERT INTO Customer(fname, lname, email, password, address, phone_num, start_membership) VALUES(?, ?, ?, ?,? ,?,NOW());",
        [fname, lname, email, password, address, pnum]
      );
      conn.commit()
      res.json("success")
      
    } else {
      throw new Error(error)
    }
  } catch (err) {
    res.status(401).json("Please fill these required information.")
  }

});
router.get("/propic", async function (req, res, next) {
  try {
    let propic = await pool.query(
      "SELECT customer_img from Customer where email = ? ;",
      [req.query.mail]
    )
    res.json({ propic: propic[0] })

  } catch (error) {
    next(error)
  }
});
// Create new comment
router.post('/:blogId/comments', function (req, res, next) {
  return
});

// Update comment
router.put('/comments/:commentId', function (req, res, next) {
  return
});

// Delete comment
router.delete('/comments/:commentId', function (req, res, next) {
  return
});

// Delete comment
router.put('/comments/addlike/:commentId', function (req, res, next) {
  return
});


exports.router = router