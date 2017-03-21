const passport = require('passport');
const User = require('../models/user');
const generateId = require('../utils/generateId.js');

module.exports = (app) => {

  app.get('/tasks', passport.authenticate('jwt', {session:false}), (req, res) => {
    let id = req.user;

    User.getUserById(id, (err, user) => {

      if(err){
        console.error(err);
        res.json({msg: `error: ${err.message}`, data: null});
      }

      if(user){
        let tasks = user.tasks;
        res.json({msg: 'success', data: tasks});
      } else {
        res.json({msg: `error: no user`, data: null});
      }
    });
  });

  app.post('/tasks', passport.authenticate('jwt', {session:false}), (req, res) => {
    let id = req.user;
    let newTask = req.body;
    newTask._id = generateId();

    User.getUserById(id, (err, user) => {
      if(err){
        console.error(err);
        res.json({msg: `error: ${err.message}`, data: null});
      }

      if(user) {
        user.tasks.push(newTask);

        user.save(function (err) {
          if (err) {
            console.log(err);
            res.json({msg: `error: ${err.message}`, data: null});
          }

          let newTaskAdded = user.tasks.id(newTask._id);

          if(newTaskAdded) {
            res.json({msg: 'success', data: newTaskAdded});
          } else {
            res.json({msg: `error`, data: null});
          }
        });
      }
    });
  });


  app.delete('/tasks/:id', passport.authenticate('jwt', {session:false}), (req, res) => {

    let taskId = req.params.id;

    if (taskId === 'multiple') {
      let id = req.user;
      let tasksIdsArr = req.body;

      User.getUserById(id, (err, user) => {
        if(err){
          console.error(err);
          res.json({msg: `error: ${err.message}`, data: null});
        }

        if(user) {
          let idsArrLength = tasksIdsArr.length;
          while(idsArrLength--) {
            let id = tasksIdsArr[idsArrLength];
            user.tasks.id(id).remove();
          }
        }

        user.save((err) =>{
          if (err) {
            console.log(err);
            res.json({msg: `error: ${err.message}`, data: null});
          }

          res.json({msg: 'success', data: true});
        });
      });

    } else {
      let id = req.user;
      let deletedTask = {};

      User.getUserById(id, (err, user) => {
        if(err){
          console.error(err);
          res.json({msg: `error: ${err.message}`, data: null});
        }

        if(user) {
          deletedTask = user.tasks.id(taskId);

          user.tasks.id(taskId).remove();
        }

        user.save((err) =>{
          if (err) {
            console.log(err);
            res.json({msg: `error: ${err.message}`, data: null});
          }

          res.json({msg: 'success', data: deletedTask});
        });
      });
    }


  });



  app.put('/tasks/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
    let id = req.user;
    let taskId = req.params.id;
    let updatedTask = req.body;

    User.getUserById(id, (err, user) => {
      if(err){
        console.error(err);
        res.json({msg: `error: ${err.message}`, data: null});
      }

      if(user) {
        user.tasks.id(taskId).remove();
        user.tasks.push(updatedTask);

        user.save(function (err) {
          if (err) {
            console.log(err);
            res.json({msg: `error: ${err.message}`, data: null});
          }

          let updatedTaskDown = user.tasks.id(taskId);

          if(updatedTaskDown) {
            res.json({msg: 'success', data: updatedTaskDown});
          } else {
            res.json({msg: `error`, data: null});
          }
        });
      }
    });
  });
};