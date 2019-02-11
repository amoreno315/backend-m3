const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

const { isLoggedIn } = require('../helpers/middlewares');

router.get('/me', (req, res, next) => {
  if (req.session.currentUser) {
    res.json(req.session.currentUser);
  } else {
    res.status(404).json({
      error: 'not-found'
    });
  }
});

router.post('/login', (req, res, next) => {
  if (req.session.currentUser) {
    return res.status(401).json({
      error: 'unauthorized'
    });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(422).json({
      error: 'validation'
    });
  }

  User.findOne({
      username
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: 'not-found'
        });
      }
      // TODO async bcrypt
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        return res.status(200).json(user);
      }
      return res.status(404).json({
        error: 'not-found'
      });
    })
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  const {
    username,
    password,
    firstname,
    lastname,
    avatar,
  } = req.body;

  if (!username || !password) {
    return res.status(422).json({
      error: 'empty'
    });
  }

  User.findOne({
      username
    }, 'username')
    .then((userExists) => {
      if (userExists) {
        return res.status(422).json({
          error: 'username-not-unique'
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = User({
        username,
        password: hashPass,
        firstname,
        lastname,
        avatar,
      });

      return newUser.save().then(() => {
        req.session.currentUser = newUser;
        res.json(newUser);
      });
    })
    .catch(next);
});

router.post('/logout', (req, res) => {
  req.session.currentUser = null;
  return res.status(204).send();
});

// router.put('/edit', (req, res, next) => {
//   const data = req.body
//   const user = req.session.currentUser._id;
//   User.findByIdAndUpdate(user, data)
 
//   .then((result)=>{

//     res.status(200).json(data)
//   })
//   .catch(next)
// });

// router.put('/edit', isLoggedIn(), (req, res, next) => {
//   const { data } = req.body;
//   const userId = req.session.currentUser._id;
//   User.findByIdAndUpdate(user, data)
//     .then((user) => {
//       if (!user) {
//         return res.status(404).json({
//           error: 'user-not-found'
//         });
//       }
//       req.session.currentUser = user;
//       return res.status(200).json(user);
//     })
//     .catch(next);
// });
router.put('/update', (req, res, next) => {
  const data = req.body
  const user = req.session.currentUser._id;
  User.findByIdAndUpdate(user, data)
 
  .then((result)=>{

    res.status(200).json(data)
  })
  .catch(next)
});
router.get('/private', isLoggedIn(), (req, res, next) => {
  res.status(200).json({
    message: 'This is a private message'
  });
});

module.exports = router;
