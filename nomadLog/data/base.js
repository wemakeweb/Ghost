var knex = require('knex');

module.exports = DBSingleton;

function DBSingleton(config){
	this.connection = knex({
		dialect: config.database.type,
	  	connection: {
	    	filename: config.database.path
	  	}
	});
};

DBSingleton.prototype.setupModels = function(models){
	var connection = this.connection;
	var promises = [];

	models.forEach(function(model){
		promises.push(model.setup(connection));
	});

	return Promise.all(promises);
};