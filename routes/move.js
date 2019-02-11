const express = require('express');
const router = express.Router();

const Move = require('../models/move');
const User = require('../models/user');

const { isLoggedIn } = require('../helpers/middlewares');

router.get('/get', (req, res, next) => {
  const owner = req.session.currentUser._id;
  //const owner = "5c58027f5b796433e23b6eb0"
  console.log(owner)
  Move.find({ owner })
    
    .then(move => {
      if (!move) {
        return res.status(404).json({
          error: 'move-not-found'
        });
      }
      return res.status(200).json(move);
    })
    .catch(next);
});

router.post('/newmove', (req, res, next) => {
  const { title, date, origin, destination, description, owner } = req.body;
  const newMove = Move({ 
    title, 
    date, 
    origin, 
    destination, 
    description, 
    owner,
  });
  return newMove.save().then(() => {
    res.json(newMove);
  })
});


module.exports = router;

