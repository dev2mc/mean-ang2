const Task = require('../models/task');

module.exports = (app) => {

  app.get('/tasks', (req, res) => {
    Task.find({}, (err, tasks) => {
      if (err) {
        console.error(err);
        res.json({msg: `error: ${err}`, data: null});
      }
      if (tasks) {
        res.json({msg: 'success', data: tasks});
      }
    });
  });

  app.post('/tasks', (req, res) => {
    let newTask = new Task(req.body);
    newTask.save((err, data) => {
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

  app.put('/tasks/:id', (req, res) => {
    let id = req.params.id;

    let data = req.body;

    Task.findByIdAndUpdate(id, data, {new: true}, (err, task) => {
      if (err) {
        console.error(err);
        res.json({msg: `error: ${err}`, data: null});
      }

      if (task) {
        res.json({msg: 'success', data: task});
      } else {
        res.json({msg: `error`, data: null});
      }
    });
  });

  app.delete('/tasks/:id', (req, res) => {
    let id = req.params.id;

    Task.findByIdAndRemove(id, (err, data) => {
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

};