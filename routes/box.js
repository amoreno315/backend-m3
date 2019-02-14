const express = require('express');
const router = express.Router();

const Box = require('../models/box');
const Move = require('../models/move');

const { isLoggedIn } = require('../helpers/middlewares');

router.post('/newbox', (req, res, next) => {
  const {boxnummer, boxname, category, description, storagelocation, owner, move} = req.body;
  const newBox = Box ({
    boxnummer, 
    boxname,
    category,
    description,
    storagelocation,
    owner, 
    move,

  });
  return newBox.save()
    .then((newBox) => {
      
     res.json(newBox);
  })
});

router.get('/get', (req, res, next) => {
  const owner = req.session.currentUser._id;
  //const owner = "5c58027f5b796433e23b6eb0"
  //const move = "5c5ff5fb4bbc1ef6b2bfe998"
  console.log(owner)
  // const populateQuery = [{path:'move', match: { _id: "5c5ff5fb4bbc1ef6b2bfe998"}}];
  // Box.find({ owner: req.session.currrentUser._id, move: req.params.id})

  Box.find({ owner })
    //.populate('move')
    .then(box => {
      if (!box) {
        return res.status(404).json({
          error: 'box-not-found'
        })
      }
      return res.status(200).json(box);
    })
    .catch(next);
})

router.get('/:id', (req, res, next) => {
  //const owner = req.session.currentUser._id;
  //const owner = "5c58027f5b796433e23b6eb0"
  // console.log(owner)
  const id = req.params.id;
  //const id = "5c651b60b4de1c741ba12dfd"
  Box.findById(id)
    // .populate('boxes')
    .then(box => {
      if (!box) {
        return res.status(404).json({
          error: 'box-not-found'
        });
      }
      return res.status(200).json(box);
    })
    .catch(next);
});

router.patch('/addItem', (req, res, next) => {
  const {nameitem, quantity, description, image, idBox} = req.body;
  const idPostman = "5c651b60b4de1c741ba12dfd"
  const id = req.params.id
  Box.findByIdAndUpdate(idPostman)
    .then(box => {
      box.items.push({nameitem, quantity, description, image})
      return res.json(box)
    })
})


module.exports = router;
