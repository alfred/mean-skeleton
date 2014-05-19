var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var PeopleSchema = new Schema ({
	name : String
});

module.exports = mongoose.model('People', PeopleSchema);