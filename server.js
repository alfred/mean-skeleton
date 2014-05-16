var express = require('express');
var app = express();

app.configure(function() {
	// To expose public assets to the world
	app.use(express.static(__dirname + '/public'));

	// log every request to the console
	app.use(express.logger('dev'));

	// For parsing response head/body
	app.use(express.json());
	app.use(express.urlencoded());
}).listen(3000);

console.log("App listenting on port 3000");