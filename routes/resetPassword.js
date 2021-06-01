const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const { User } = require('../models/users');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

router.put('/:token', async(req,res)=>{
    const token = req.params.token;
    let { newPassword } = req.body;
    jwt.verify(token, process.env.jwtResetPasswordKey);
    let user = await User.findOne({resetPassword:token});
    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(newPassword, salt);
    const obj = {
        password:newPassword,
        resetPassword:""
    };
    _.extend(user,obj);
    user = await user.save();  
    res.send(user);
});

module.exports = router;