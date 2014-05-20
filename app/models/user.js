var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// Validation helper methods
function validatePresenceOf(input) {
	return this.provider;
}

// Model Schema
var UserSchema = new Schema ({
	name : {
		type: String,
		required : true,
		validations : [validatePresenceOf, 'Name cannot be blank']
	},
});

module.exports = mongoose.model('User', UserSchema);