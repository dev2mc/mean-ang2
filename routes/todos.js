const passport = require('passport');
const User = require('../models/user');
const generateId = require('../utils/generateId.js');

module.exports = (app) => {

  app.get('/todos', passport.authenticate('jwt', {session:false}), (req, res) => {
    let id = req.user;

    User.getUserById(id, (err, user) => {

      if(err){
        console.error(err);
        res.json({msg: `error: ${err.message}`, data: null});
      }

      if(user){
        let tasks = user.todos;
        res.json({msg: 'success', data: tasks});
      } else {
        res.json({msg: `error: no user`, data: null});
      }
    });
  });

  app.post('/todos', passport.authenticate('jwt', {session:false}), (req, res) => {
    let id = req.user;
    let newTodo = req.body;
    newTodo._id = generateId();

    User.getUserById(id, (err, user) => {
      if(err){
        console.error(err);
        res.json({msg: `error: ${err.message}`, data: null});
      }

      if(user) {
        user.todos.push(newTodo);

        user.save(function (err) {
          if (err) {
            console.log(err);
            res.json({msg: `error: ${err.message}`, data: null});
          }

          let newTodoAdded = user.todos.id(newTodo._id);

          if(newTodoAdded) {
            res.json({msg: 'success', data: newTodoAdded});
          } else {
            res.json({msg: `error`, data: null});
          }
        });
      }
    });
  });

  app.put('/todos/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
    let id = req.user;
    let todoId = req.params.id;
    let updatedTodo = req.body;

    User.getUserById(id, (err, user) => {
      if(err){
        console.error(err);
        res.json({msg: `error: ${err.message}`, data: null});
      }

      if(user) {
        user.todos.id(todoId).remove();
        user.todos.push(updatedTodo);

        user.save(function (err) {
          if (err) {
            console.log(err);
            res.json({msg: `error: ${err.message}`, data: null});
          }

          let updatedTodoDown = user.todos.id(todoId);

          if(updatedTodoDown) {
            res.json({msg: 'success', data: updatedTodoDown});
          } else {
            res.json({msg: `error`, data: null});
          }
        });
      }
    });
  });

  app.delete('/todos/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
    let id = req.user;
    let todoId = req.params.id;
    let deletedTodo = {};

    User.getUserById(id, (err, user) => {
      if(err){
        console.error(err);
        res.json({msg: `error: ${err.message}`, data: null});
      }

      if(user) {
        deletedTodo = user.todos.id(todoId);

        user.todos.id(todoId).remove();
      }

      user.save((err) =>{
        if (err) {
          console.log(err);
          res.json({msg: `error: ${err.message}`, data: null});
        }

        res.json({msg: 'success', data: deletedTodo});
      });
    });
  });
};