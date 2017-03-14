const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.Promise = global.Promise;

// Connect To Database
mongoose.connect(config.database, config.options);

let mconnection = mongoose.connection;

// On Connection
mconnection.on('connected', () => {
  console.log('Connected to database ');
});

// On Error
mconnection.on('error', (err) => {
  console.log('Database error: '+ err);
});

const app = express();

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

require('./routes/todos')(app);

require('./routes/tasks')(app);

require('./routes/mails')(app);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});
