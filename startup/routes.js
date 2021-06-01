const express = require('express');
const users = require('../routes/users');
const media = require('../routes/media');
const auth = require('../routes/auth');
const forgotPassword = require('../routes/forgotPassword');
const resetPassword = require('../routes/resetPassword');

module.exports = function(app){
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use('/api/users', users);
    app.use('/api/upload/media', media);
    app.use('/api/auth', auth);
    app.use('/api/users/forgotpassword', forgotPassword);
    app.use('/api/users/resetpassword',resetPassword);
}