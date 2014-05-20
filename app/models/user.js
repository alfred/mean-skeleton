var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// Validation helper methods
function validatePresenceOf(input) {
	return input.length;
}

// Model Schema
var UserSchema = new Schema ({
	name : {
		type: String,
		required : 'Name is required'
	},
});

module.exports = mongoose.model('User', UserSchema);