const passport = require('passport');
const User = require('../models/user');
const generateId = require('../utils/generateId.js');

module.exports = (app) => {

  app.get('/mails', passport.authenticate('jwt', {session:false}), (req, res) => {
    let id = req.user;

    User.getUserById(id, (err, user) => {

      if(err){
        console.error(err);
        res.json({msg: `error: ${err}`, data: null});
      }

      if(user){
        let mails = user.mails;
        res.json({msg: 'success', data: mails});
      } else {
        res.json({msg: `error: no user`, data: null});
      }
    });
  });

  app.get('/mails/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
    const mailId = req.params.id;
    const userId = req.user;

    User.findById(userId, (err, user) => {
      if (err) {
        console.error(err);
        res.json({msg: `error: ${err.message}`, data: null});
      }
      if (user) {
        let mailItem = user.mails.id(mailId);

        if (mailItem) {
          res.json({msg: 'success', data: mailItem});
        } else {
          res.json({msg: `error`, data: null});
        }

      } else {
        res.json({msg: `error`, data: null});
      }
    });
  });

  app.post('/mails', passport.authenticate('jwt', {session:false}), (req, res) => {
    let id = req.user;
    let newMail = req.body;
    newMail._id = generateId();

    User.getUserById(id, (err, user) => {
      if(err){
        console.error(err);
        res.json({msg: `error: ${err.message}`, data: null});
      }

      if(user) {
        user.mails.push(newMail);

        user.save(function (err) {
          if (err) {
            console.log(err);
            res.json({msg: `error: ${err.message}`, data: null});
          }

          let newMailAdded = user.mails.id(newMail._id);

          if(newMailAdded) {
            res.json({msg: 'success', data: newMailAdded});
          } else {
            res.json({msg: `error`, data: null});
          }
        });
      }
    });
  });

  app.put('/mails/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
    let mailId = req.params.id;
    let id = req.user;

    if (mailId === 'starmult') {
      let idsArr = req.body;

      User.getUserById(id, (err, user) => {
        if(err){
          console.error(err);
          res.json({msg: `error: ${err.message}`, data: null});
        }

        if(user) {
          idsArr.forEach((v) => {
            let mailItem = user.mails.id(v);
              if (mailItem) {
                mailItem.starred = !mailItem.starred;
                user.mails.id(v).remove();
                user.mails.push(mailItem);
              }
          });

          user.save(function (err) {
            if (err) {
              console.log(err);
              res.json({msg: `error: ${err.message}`, data: null});
            }

            res.json({msg: 'success', data: idsArr});
          });
        }
      });

    } else if (mailId === 'readmult') {
      let idsArr = req.body;

      User.getUserById(id, (err, user) => {
        if(err){
          console.error(err);
          res.json({msg: `error: ${err.message}`, data: null});
        }

        if(user) {
          idsArr.forEach((v) => {
            let mailItem = user.mails.id(v);
              if (mailItem) {
                mailItem.read = !mailItem.read;
                user.mails.id(v).remove();
                user.mails.push(mailItem);
              }
          });

          user.save(function (err) {
            if (err) {
              console.log(err);
              res.json({msg: `error: ${err.message}`, data: null});
            }

            res.json({msg: 'success', data: idsArr});
          });
        }
      });

    } else {

      let updatedMail = req.body;

      User.getUserById(id, (err, user) => {
        if(err){
          console.error(err);
          res.json({msg: `error: ${err.message}`, data: null});
        }

        if(user) {
          user.mails.id(mailId).remove();
          user.mails.push(updatedMail);

          user.save(function (err) {
            if (err) {
              console.log(err);
              res.json({msg: `error: ${err.message}`, data: null});
            }

            let updatedMailDown = user.mails.id(mailId);

            if(updatedMailDown) {
              res.json({msg: 'success', data: updatedMailDown});
            } else {
              res.json({msg: `error`, data: null});
            }
          });
        }
      });
    }
  });

  app.delete('/mails/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
    let id = req.user;
    let mailId = req.params.id;

    if (mailId === 'multiple') {
      let idsArr = req.body;

      User.getUserById(id, (err, user) => {
        if(err){
          console.error(err);
          res.json({msg: `error: ${err.message}`, data: null});
        }

        if(user) {
          idsArr.forEach((mailItemId) => {
            user.mails.id(mailItemId).remove();
          });
        }

        user.save((err) =>{
          if (err) {
            console.log(err);
            res.json({msg: `error: ${err.message}`, data: null});
          }

          res.json({msg: 'success', data: idsArr});
        });
      });

    } else {
      let deletedMail = {};

      User.getUserById(id, (err, user) => {
        if(err){
          console.error(err);
          res.json({msg: `error: ${err.message}`, data: null});
        }

        if(user) {
          deletedMail = user.mails.id(mailId);

          user.mails.id(mailId).remove();
        }

        user.save((err) =>{
          if (err) {
            console.log(err);
            res.json({msg: `error: ${err.message}`, data: null});
          }

          res.json({msg: 'success', data: deletedMail});
        });
      });
    }
  });
};