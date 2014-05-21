var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// Validation helper methods
function validateTitleCase(input) {
	try {
		firstLetter = input.substring(0, 1);
		return true;
	}
	catch(err) {
		return false;
	}
}

// Model Schema
var UserSchema = new Schema ({
	name : {
		type: String,
		required : 'Field is required message'
	},
});

module.exports = mongoose.model('User', UserSchema);