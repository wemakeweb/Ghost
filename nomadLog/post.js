var api = require('../core/server/api/index');


module.exports = {
	mount: function(http){
		http.get('/_api/posts/:id', this.loadPost.bind(this));
		http.get('/_api/posts/', this.loadPosts.bind(this));
	},

	loadPosts: function(req, res){
		api.posts.browse({
			published: true
		}).then(function(posts){
			res.send(JSON.stringify(posts));
		});
	},

	loadPost: function(req, res){
		var post;

		api.posts.read({
			id: req.params.id
		}).then(function(result){
			post = result.posts[0];

			return api.users.read({
				id: post.author
			});
		}).then(function(result){
			var user = result.users[0];
			
			post.author = {
				name: user.name,
				image: user.image,
				slug: user.slug
			};

			res.send(JSON.stringify({
				post: post
			}));
		});
	}
}