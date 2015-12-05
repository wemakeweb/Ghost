module.exports = NomadLog;

var config = require('./config/dev.json');

var plugins = [
	require('./post'), 
	require('./location'), 
	require('./blog')
];

var models = [
	require('./models/user')
]

var DBBase = require('./data/base');


function NomadLog(){
	this.setupDB();
}

NomadLog.prototype.setupDB = function(){
	this.db = new DBBase(config);
	this.db.setupModels(models)
	.then(function(){
		console.log('All models ready');
	}.bind(this))
	.catch(function(err){
		console.log(err)
	})
};


NomadLog.prototype.mount = function(parentApp){
	plugins.forEach(function(plugin){
		plugin.mount(parentApp);
	});
};