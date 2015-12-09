exports.up = function(db, Promise) {
	return db.schema.table('user', function(table) {
		table.string('nomadlog_name');
	});
};

exports.down = function(db, Promise) {
	return db.schema.table('user', function(table){
		table.dropColumn('nomadlog_name');
	});
};