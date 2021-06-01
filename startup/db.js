const mongoose = require('mongoose');
module.exports = function(){
    mongoose.connect('mongodb://localhost/mediaDatabase',{useNewUrlParser:true, useUnifiedTopology:true})
        .then(()=>console.log('conn to db')).catch((err)=>{console.log(err.message)});
}