const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

module.exports = (app) => {
  // Register
  app.post('/register', (req, res) => {
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      tasks: [],
      todos: [],
      mails: []
    });

    User.find({'username': newUser.username}, (err, users) => {
      if (err) {
         res.json({success: false, msg: err.message});
      }

      if (users.length === 0) {
        User.find({'email': newUser.email}, (err, users) => {
          if (err) {
            res.json({success: false, msg: err.message});
          }

          if (users.length === 0) {
            User.addUser(newUser, (err, user) => {
              if(err){
                res.json({success: false, msg:'Failed to register user'});
              } else {
                res.json({success: true, msg:'User registered'});
              }
            });
          }

          if (users.length > 0) {
            res.json({success: false, msg:'User with this email already exists'});
          }
        });
      }

      if (users.length > 0) {
        res.json({success: false, msg:'User with this username already exists'});
      }
    });
  });
  

  // Authenticate
  app.post('/authenticate', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
      if(err) {throw err;}
      if(!user){
        return res.json({success: false, msg: 'User not found'});
      }

      User.comparePassword(password, user.password, (err, isMatch) => {
        if(err) {throw err;}
        if(isMatch){
          let tokenUser = {};
          tokenUser.username = user.username;
          tokenUser.password = user.password;
          tokenUser.name = user.name;
          tokenUser._id = '' + user._id;

          const token = jwt.sign(tokenUser, config.secret, {
            expiresIn: 604800 // 1 week
          });

          res.json({
            success: true,
            token: 'JWT '+token,
            user: {
              id: user._id,
              name: user.name,
              username: user.username,
              email: user.email
            }
          });
        } else {
          return res.json({success: false, msg: 'Wrong password'});
        }
      });
    });
  });

  // Profile
  app.get('/profile', passport.authenticate('jwt', {session:false}), (req, res) => {
    res.json({_id: req.user});
  });
};
