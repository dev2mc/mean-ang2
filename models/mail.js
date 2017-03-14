const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const MailSchema = new Schema({
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

const Mail = module.exports = mongoose.model('Mail', MailSchema, 'mail');