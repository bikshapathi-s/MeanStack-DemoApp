process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Requiring dependencies
var mongoose = require('mongoose');

// Configure Mongoose
var db = mongoose.connect('mongodb://localhost/LeaveMS');
require('./app/models/leavetype.server.model');
require('./app/models/organization.server.model');
require('./app/models/role.server.model');
require('./app/models/leave.server.model');
require('./app/models/user.server.model');

// Configure Express
var express = require('./config/express');
var app = express();

// Bootstrap passport config
var passport = require('./config/passport')();

// Bootstrap application
app.listen(3000);

// Tell developer about it
console.log('Server running at http://localhost:3000/');