var api = require('../core/server/api/index');
var request = require('request-promise');

var locations = [
	{
		city: 'Stuttgart',
		country: 'Germany',
		timezone: 'Europe/Berlin',
		cords: [9.163473, 48.789982],
		departure: '04.11.2015'
	},
	{
		city: 'Bangkok',
		country: 'Thailand',
		timezone: 'Asia/Bangkok',
		cords: [100.561646, 13.735115],
		departure: '09.11.2015'
	},
	{
		city: 'Koh Samui',
		country: 'Thailand',
		timezone: 'Asia/Bangkok',
		cords: [100.013425, 9.512978],
		departure: '13.11.2015'
	},
	{
		city: 'Ao Nang',
		country: 'Thailand',
		timezone: 'Asia/Bangkok',
		cords: [98.814320, 8.052805],
		departure: '17.11.2015'
	},
	{
		city: 'Phuket',
		country: 'Thailand',
		timezone: 'Asia/Bangkok',
		cords: [98.391227, 7.880640],
		departure: '21.11.2015'

	},
	{
		city: 'Singapore',
		country: 'Singapore',
		timezone: 'Asia/Singapore',
		cords: [103.860052, 1.349736],
		departure: '25.11.2015'
	},
	{
		city: 'Kuala Lumpur',
		country: 'Malaysia',
		timezone: 'Asia/Kuala_Lumpur',
		cords: [101.690962, 3.107455]
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