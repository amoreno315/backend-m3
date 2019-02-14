const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const User = require('../models/user');

const { isLoggedIn } = require('../helpers/middlewares')

router.put('/update', isLoggedIn(), (req, res, next) => {
  const data = req.body
  const user = req.session.currentUser._id;
  User.findByIdAndUpdate(user, data)
 
  .then((result)=>{

    res.status(200).json(data)
  })
  .catch(next)
});


router.patch('/addMove', (req, res) => {
  const move = req.body
  const id = req.session.currentUser._id;
  User.findById(id)
  .then(user =>{

    User.findOne( {username:contact.contact.contact})
    .then(friend =>{
      const friendId = friend._id;
      user.contacts.push(ObjectId(friendId))
      user.save()
      .then((result)=>{
        res.status(200).json(result)

      })
    .catch();  
    })
  .catch()  
  })
});



router.get('/updated', (req, res, next) => {
  const userId = req.session.currentUser._id;
  User.findById(userId)
  
  .then((result)=>{
    res.status(200).json(result)
    
  })
  .catch(next)
});



module.exports = router;