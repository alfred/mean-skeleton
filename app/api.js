// Module for API Routes (serving JSON)
module.exports = function(app) {
	// Example API route
	app.get('/peoples', function(req, res) {

		// Checks the People collection and returns all of them`
		People.find(function(err, peoples) {

			// returns all people in JSON format
			res.json(peoples);
		});
	});
}