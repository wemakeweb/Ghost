var db = require('./base');

var Api = {};

Api.getLocationsForUser = function(nomadlog_id) {
	return db
		.connection()
		.select()
		.from('log')
		.where('user_id', nomadlog_id)
		.join('location', 'location.id', 'log.location_id')
};

module.exports = Api;