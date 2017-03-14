const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: String,
  tag: String,
  description: String,
  favorite: Boolean
});

const Task = module.exports = mongoose.model('Task', TaskSchema, 'tasks');