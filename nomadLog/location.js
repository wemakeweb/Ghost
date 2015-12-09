var api = require('../core/server/api/index');
var request = require('request-promise');
var nomadApi = require('./data/api');

module.exports = {
	mount: function(http){
		http.get('/_api/locations', this.lockupLocationByName.bind(this));
		http.get('/_api/log', this.listLogsforUser.bind(this));
		http.post('/_api/log', this.addLogforUser.bind(this));

		// Weather.requestForCurrentCity();
		// Weather.startRequestInterval();
	},

	lockupLocationByName: function(req, res){
		var name = req.query.query;

		res.json({});
	},

	listLogsforUser: function(req, res){
		nomadApi.getLocationsForUser(1).then(function(locations){
			return locations.map(function(location){
				location.coords = location.coords.split(',').map(parseFloat);
				return location;
			});
		}).then(function(locations){
			res.json({
				locations: locations
			});
		});
	},

	addLogforUser: function(req, res){

	}
}

var REQUESTINTERVAL = 15 * 60 * 1000;

var Weather = {
	getConditionsForCity: function(country, city){
		return request({
			uri: 'http://api.wunderground.com/api/cf6de708bb3a7238/geolookup/conditions/forecast/q/' + country + '/' + city + '.json',
			json: true 
		});
	},

	requestForCurrentCity: function(){
		var location = locations[locations.length-1];

		this.getConditionsForCity(location.country, location.city).then(function(result){
			console.log('Weather fetched successfully');
			locations[locations.length-1].weather = {
				temp: result.current_observation.temp_c,
				str: result.current_observation.weather
			}
		}).catch(function(err){ 
			console.log('Weather Error: %s', err);
		});
	},

	startRequestInterval: function(){
		setTimeout(function(){
			this.requestForCurrentCity();
		}.bind(this), REQUESTINTERVAL)
	}
};