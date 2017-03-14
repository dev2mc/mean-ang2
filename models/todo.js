const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const TodoSchema = new Schema({
  description: String,
  completed: Boolean
});

const Todo = module.exports = mongoose.model('Todo', TodoSchema, 'todo');