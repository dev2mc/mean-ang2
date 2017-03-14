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

    // User.find({}, (err, mails) => {
    //   if (err) {
    //     console.error(err);
    //     res.json({msg: `error: ${err}`, data: null});
    //   }
    //   if (mails) {
    //     res.json({msg: 'success', data: mails});
    //   }
    // });
  });

  // app.get('/mails/:id', (req, res) => {
  //   const id = req.params.id;

  //   Mail.findById(id, (err, mail) => {
  //     if (err) {
  //       console.error(err);
  //       res.json({msg: `error: ${err}`, data: null});
  //     }
  //     if (mail) {
  //       res.json({msg: 'success', data: mail});
  //     } else {
  //       res.json({msg: `error`, data: null});
  //     }
  //   });
  // });

  // app.post('/mails', (req, res) => {
  //   let newMail = new Mail(req.body);
  //   newMail.save((err, data) => {
  //     if (err) {
  //       console.error(err);
  //       res.json({msg: `error: ${err}`, data: null});
  //     }

  //     if (data) {
  //       res.json({msg: 'success', data: data});
  //     } else {
  //       res.json({msg: `error`, data: null});
  //     }
  //   });
  // });

  // app.put('/mails/:id', (req, res) => {
  //   let id = req.params.id;

  //   let data = req.body;

  //   Mail.findByIdAndUpdate(id, data, {new: true}, (err, mail) => {
  //     if (err) {
  //       console.error(err);
  //       res.json({msg: `error: ${err}`, data: null});
  //     }

  //     if (mail) {
  //       res.json({msg: 'success', data: mail});
  //     } else {
  //       res.json({msg: `error`, data: null});
  //     }
  //   });
  // });

  // app.delete('/mails/:id', (req, res) => {
  //   let id = req.params.id;

  //   Mail.findByIdAndRemove(id, (err, data) => {
  //     if (err) {
  //       console.error(`Error: ${err}`);
  //       res.json({msg: `error: ${err}`, data: null});
  //     }

  //     if (data) {
  //       res.json({msg: 'success', data: data});
  //     } else {
  //       res.json({msg: `error`, data: null});
  //     }
  //   });
  // });

};