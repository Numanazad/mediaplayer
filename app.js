const express = require('express');
const app = express();
require('dotenv').config();
const routes = require('./startup/routes')(app);
const db = require('./startup/db')();

const port = 8000 || process.env.PORT;
app.listen(port,(err)=>console.log(err));