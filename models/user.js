const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const config = require('../config/database');

let Schema = mongoose.Schema;

let tasksSchema = new Schema({
  _id: String,
  name: String,
  tag: String,
  description: String,
  favorite: Boolean
});

let todosSchema = new Schema({
  _id: String,
  description: String,
  completed: Boolean
});

let mailsSchema = new Schema({
  _id: String,
  fromName: String,
  fromAddress: String,
  to: String,
  category: String,
  subject: String,
  date: Number,
  body: String,
  sent: Boolean,
  starred: Boolean,
  read: Boolean,
  openedTimes: Number
});

const UserSchema = new Schema({
  name: String,
  email: String,
  username: String,
  password: String,
  // tasks: { type : Array , 'default': [] },
  tasks: [tasksSchema],
  // todos: { type : Array , 'default': [] },
  todos: [todosSchema],
  // mails: { type : Array , 'default': [] }
  mails: [mailsSchema]
});

const User = module.exports = mongoose.model('User', UserSchema, 'users');

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  User.findOne(query, callback);
};

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) {throw err;}
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) {throw err;}
    callback(null, isMatch);
  });
};
