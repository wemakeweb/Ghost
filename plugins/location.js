var api = require('../core/server/api/index');
var request = require('request-promise');

var locations = [
	{
		city: 'Bangkok',
		country: 'Thailand',
		timezone: 'Asia/Bangkok',
		cords: [13.735115, 100.561646]
	},
	{
		city: 'Koh Samui',
		country: 'Thailand',
		timezone: 'Asia/Bangkok',
		cords: [9.512978, 100.013425]
	},
	{
		city: 'Ao Nang',
		country: 'Thailand',
		timezone: 'Asia/Bangkok',
		cords: [8.052805, 98.814320]
	},
	{
		city: 'Phuket',
		country: 'Thailand',
		timezone: 'Asia/Bangkok',
		cords: [7.880640, 98.391227]
	}
];

module.exports = {
	mount: function(http){
		http.get('/_api/locations', this.listLocations.bind(this));

		Weather.requestForCurrentCity();
		Weather.startRequestInterval();
	},

	listLocations: function(req, res){
		res.send(JSON.stringify({
			locations: locations
		}));
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
		});
	},

	startRequestInterval: function(){
		setTimeout(function(){
			this.requestForCurrentCity();
		}.bind(this), REQUESTINTERVAL)
	}
};