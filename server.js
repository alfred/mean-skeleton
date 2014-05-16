var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

app.configure(function() {
	// To expose public assets to the world
	app.use(express.static(__dirname + '/public'));

	// log every request to the console
	app.use(express.logger('dev'));

	// For parsing responses
	app.use(express.json());
	app.use(express.urlencoded());
}).listen(3000);

console.log("App listening on port 3000");