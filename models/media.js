const mongoose = require('mongoose');
const mediaSchema = new mongoose.Schema({
    mediapath:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true
    },
    date:{
        type:String,
        default:Date.now
    }
})

const Media = mongoose.model("Media", mediaSchema);
exports.Media = Media;