const Todo = require('../models/todo');

module.exports = (app) => {

  app.get('/todos', (req, res) => {
    Todo.find({}, (err, todos) => {
      if (err) {
        console.error(err);
        res.json({msg: `error: ${err}`, data: null});
      }
      if (todos) {
        res.json({msg: 'success', data: todos});
      }
    });
  });

  app.post('/todos', (req, res) => {
    let newTodo = new Todo(req.body);
    newTodo.save((err, data) => {
      if (err) {
        console.error(err);
        res.json({msg: `error: ${err}`, data: null});
      }

      if (data) {
        res.json({msg: 'success', data: data});
      } else {
        res.json({msg: `error`, data: null});
      }
    });
  });

  app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;

    Todo.findByIdAndRemove(id, (err, data) => {
      if (err) {
        console.error(`Error: ${err}`);
        res.json({msg: `error: ${err}`, data: null});
      }

      if (data) {
        res.json({msg: 'success', data: data});
      } else {
        res.json({msg: `error`, data: null});
      }
    });
  });

  app.put('/todos/:id', (req, res) => {
    let id = req.params.id;

    let data = req.body;

    Todo.findByIdAndUpdate(id, data, {new: true}, (err, todo) => {
      if (err) {
        console.error(err);
        res.json({msg: `error: ${err}`, data: null});
      }

      if (todo) {
        res.json({msg: 'success', data: todo});
      } else {
        res.json({msg: `error`, data: null});
      }
    });
  });

};