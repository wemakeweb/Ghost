var api = require('../core/server/api/index');


module.exports = {
	mount: function(http){
		http.get('/_api/blog', this.getBlog.bind(this));
	},

	getBlog: function(req, res){
		var blog = {};
		var allowedKeys = ['title', 'description'];

		api.settings.browse().then(function(settings){
			settings.forEach(function(setting){
				if(allowedKeys.indexOf(setting.key) > -1){
					blog[setting.key] = setting.value
				}
			});

			res.json({
				blog: blog
			})
		});
	}
}