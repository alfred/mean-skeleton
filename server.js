// Dependencies
var express = require('express');
var app = express();
var mongoose = require('mongoose');

// Configs
var db = require('./config/db');
// Connect to the DB
mongoose.connect(db.url);

// App Config
app.configure(function() {
	// To expose public assets to the world
	app.use(express.static(__dirname + '/public'));

	// log every request to the console
	app.use(express.logger('dev'));

	// For parsing responses
	app.use(express.json());
	app.use(express.urlencoded());
});

// Routes
require('./app/routes')(app);

// Start the app with listen
app.listen(3000);