const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const { User } = require('../models/users');

router.post("/",async(req,res)=>{
  const { email } = req.body;
    let user = await User.findOne({email});
    // create a token
    const token = jwt.sign({_id:user._id}, process.env.jwtResetPasswordKey);
    // send email
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'namanajid54@gmail.com',
          pass: 'mygmail23'
        }
      });
      
      var mailOptions = {
        from: 'namanajid54@gmail.com',
        to: email,
        subject: 'Reset your password',
        html:`<p>http://localhost:8000/api/users/resetpassword/${token}</p>`
      };
      
      // save token into users database
      user = await user.updateOne({resetPassword:token},(err,success)=>{
        if(err) throw err.message;
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            res.send('Email sent: ' + info.response);
          }
        });
      });
});

module.exports = router;