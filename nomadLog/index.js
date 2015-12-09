module.exports = NomadLog;

var config = require('./config/dev.json');

var DBBase = require('./data/base');

var plugins = [
	require('./post'), 
	require('./location'), 
	require('./blog')
];

function NomadLog(){
	this.setupDB();
}

NomadLog.prototype.setupDB = function(){
	this.db = new DBBase(config);

	/* this.db.migrate().then(function(version){
		console.log('Migrations done', version.join('.'));
		return this.db.seed();
	}.bind(this)).then(function(){
		console.log('Seeding done');
	}).catch(function(err){
		console.log('DB error', err.stack || err);
	}); */
};

NomadLog.prototype.mount = function(parentApp){
	plugins.forEach(function(plugin){
		plugin.mount(parentApp);
	});
};