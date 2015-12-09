exports.up = function(db, Promise) {
	return Promise.all([
		db.schema.createTable('user', function(t) {
	 		t.increments('id');
	 		t.string('nomadlog_url').unique();
		}),

		db.schema.createTable('location', function(t){
	 		t.increments('id');
	 		t.string('coords');
			t.string('city');
			t.string('country');
			t.string('timezone');
	 	}),

		db.schema.createTable('log', function(t){
			t.increments('id');
			t.timestamp('departure').nullable();
			t.timestamp('arrival').nullable();

			// refs
			t.integer('user_id').unsigned().references('user.id');
			t.integer('location_id').unsigned().references('location.id');
	 	})
	 ]);
};

exports.down = function(db, Promise) {
	return Promise.all([
		db.schema.deleteTable('user'),
		db.schema.deleteTable('log'),
	 	db.schema.deleteTable('location')
	]);
};