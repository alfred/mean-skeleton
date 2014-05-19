// Module for API Routes (serving JSON)
module.exports = function(app) {
	var mongoose = require('mongoose'),
		People = require('../models/people')

	// Example API route
	app.get('/peoples', function(req, res) {

		// Checks the People collection and returns all of them`
		People.find(function(err, peoples) {

			// returns all people in JSON format
			res.send(peoples);
		});
	});
}