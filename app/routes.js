module.exports = function(app) {
	// Wildcard route serving static html page
	app.get('*', function(req, res) {
		res.sendfile('public/views/index.html');
	});
}