const express = require("express");
const path = require("path")
const pool = require("../config");
const Joi = require('joi')
const argon2 = require('argon2');
const { generateToken } = require("../utils/token");
const { isLoggedIn } = require('../middlewares')
var nodemailer = require('nodemailer');


router = express.Router();

const multer = require('multer');
const { error } = require("console");


const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
})


// Login
router.post('/SignIn', async function (req, res, next) {
  try {
    await loginSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.status(400).send(err)
  }

  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();
  const email = req.body.email;
  const password = req.body.password;
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
        throw new Error('Invalid Email or Password')
      }
      results[0][0].type = 'customer'
      
      const [tokens] = await conn.query(
        'SELECT * FROM customer_token WHERE customer_id=?',
        [results[0][0].customer_id]
      )
      let token = tokens[0]?.token
      if (!token) {
        // Generate and save token into database
        token = generateToken()
        await conn.query(
          'INSERT INTO customer_token(customer_id, token) VALUES (?, ?)',
          [results[0][0].customer_id, token]
        )
        conn.commit()
      }
      const val = { result: results[0], message: "customer", token: token }
      res.json(val)
    }
    else if (results2[0].length != 0) {
      if (!(await argon2.verify(results2[0][0].admin_password, password))) {
        throw new Error('Invalid Email or Password')
      }
     
      results2[0][0].type = 'admin'
      const [tokens] = await conn.query(
        'SELECT * FROM admin_token WHERE admin_id=?',
        [results2[0][0].admin_id]
      )
     
      let token = tokens[0]?.token
     
      if (!token) {
        // Generate and save token into database
        token = generateToken()
        await conn.query(
          'INSERT INTO admin_token(admin_id, token) VALUES (?, ?)',
          [results2[0][0].admin_id, token]
        )
        conn.commit()
      }

      const val2 = { result: results2[0], message: "Addmin", token: token }
    
      res.json(val2)
    } else {
      throw new Error(error)
    }
  } catch (err) {
    res.status(401).json("Invalid Email or Password")
  }

});



const passwordValidator = (value, helpers) => {
  if (value.length < 8) {
    throw new Joi.ValidationError('Password must contain at least 8 characters')
  }
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    throw new Joi.ValidationError('Password must be harder')
  }
  return value
}

const emailValidator = async (value, helpers) => {
  const [rows, _] = await pool.query(
    "SELECT email FROM customer WHERE email = ?",
    [value]
  )
  if (rows.length > 0) {
   
    const message = 'This email is already taken' + rows.length
    throw new Joi.ValidationError(message, { message })
  }
  return value
}

const signupSchema = Joi.object({
  email: Joi.string().required().email().external(emailValidator),
  pnum: Joi.string().required().pattern(/0[0-9]{9}/),
  fname: Joi.string().required().max(150),
  lname: Joi.string().required().max(150),
  password: Joi.string().required().custom(passwordValidator),
  conpassword: Joi.string().required().valid(Joi.ref('password')),
  address: Joi.string().required().max(150),
})



router.post('/SignUp', async function (req, res, next) {

  try {
    await signupSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.status(400).json(err)
  }
  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();

  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const password = await argon2.hash(req.body.password);
  const conpassword = req.body.conpassword;
  const address = req.body.address;
  const pnum = req.body.pnum;
  


  try {
    let results2 = await conn.query(
      "SELECT email from Customer where email = ? ;",
      [email]
    ); 
    let results3 = await conn.query(
      "SELECT admin_email from Admin where admin_email = ? ;",
      [email]
    ); 
    if (results2[0].length > 0) {
      res.status(401).json("This E-mail already in exit!")
    } else if (results3[0].length > 0) {
      res.status(401).json("This E-mail already in exit! Addmin")
    }
    else if (await argon2.verify(password, conpassword)) {
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


router.get('/user/me', isLoggedIn, async (req, res, next) => {
  // req.user ถูก save ข้อมูล user จาก database ใน middleware function "isLoggedIn"
 
    res.json(req.user)
 
  
})

router.post('/checkmail', async (req, res, next) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction();
  email = req.body.email
  console.log(email)
   try {
    let results = await conn.query(
      "SELECT email from Customer where email = ? ;",
      [email]
    ); 
    if(results[0].length != 0){
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'chayanut.oakley@gmail.com',
          pass: 'pwjgacchalvrhwwl'
        }
      });
      var mailOptions = {
        from: 'chayanut.oakley@gmail.com',
        to: req.body.email,
        subject: 'link to change new password.',
        text: 'http://localhost:8080/ResetPassword'
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(400).send("error")
        } else {
          console.log('Email sent: ' + info.response);
          res.send("success")
        }
      
      });
    }
   } catch (err) {
    next(error)
   }
 
  
})
// // Create new comment
// router.post('/:blogId/comments', function (req, res, next) {
//   return
// });

// // Update comment
// router.put('/comments/:commentId', function (req, res, next) {
//   return
// });

// // Delete comment
// router.delete('/comments/:commentId', function (req, res, next) {
//   return
// });

// // Delete comment
// router.put('/comments/addlike/:commentId', function (req, res, next) {
//   return
// });

const newPassSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().custom(passwordValidator),
  conpassword: Joi.string().required().valid(Joi.ref('password')),
})


router.post('/resetPass', async function (req, res, next) {
  try {
    await newPassSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.status(400).send(err)
  }
  const email = req.body.email;
  const password = await argon2.hash(req.body.password);
  const conpassword = req.body.conpassword;

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
      if (email) {
        await conn.query(
          "UPDATE Customer SET password = ? WHERE email = ?;",
          [password ,email])
      }
      else{
        next(error)
      }
      res.json("Reset Password Success")
    }
    if (results2[0].length != 0) {
      if (email) {
        await conn.query(
          "UPDATE admin SET admin_password = ? WHERE admin_email = ?;",
          [password ,email])
      }
      res.json("Reset Password Success")
    }
    else{
      next(error)
    }
    conn.commit()

  } catch (error) {
    await conn.rollback();
    res.status(401).json("Invalid Password")
  } finally {
    console.log('finally')
    conn.release();
  }

});




exports.router = router