const auth = require('../middleware/auth');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { Media } = require('../models/media');
const { User} = require('../models/users');

router.get('/', auth, async(req,res)=>{
    const user = await User.findById(req.user._id);
    const query = { userEmail: user.email };
    await Media.find(query,(err,results)=>{
        res.send(results);
    }).select('mediapath')
});
router.post('/', auth, async(req,res)=>{
    let media = new Media(_.pick(req.body, ['mediapath', 'userEmail']));
    media = await media.save();
    res.send(media);
});
router.delete("/:id", auth, async(req,res)=>{
    let media = await Media.findByIdAndDelete(req.params.id);
    if(!media) return res.status(404).send('video with id not found'); 
});
router.get("/:id",auth, async(req,res)=>{
   let media = await Media.findById(req.params.id);
   if(!media) return res.status(404).send('video with id not found'); 
   res.send(media);
});

module.exports = router;