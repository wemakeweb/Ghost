var knex = require('knex');

function DBSingleton(config){
	this.migrations = config.database.migrations;
	this.connection = knex(config.database);
	DBSingleton.instance = this;
};

DBSingleton.getInstance = function(){
	return DBSingleton.instance;
};

DBSingleton.connection = function(){
	return DBSingleton.instance.connection;
};

DBSingleton.prototype.migrate = function() {
	return this.connection.migrate.latest();
};

DBSingleton.prototype.seed = function(){
	return this.connection.seed.run();
};

module.exports = DBSingleton;