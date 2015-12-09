function timestamp(o){
	var d = new Date(o);

	return d.getFullYear().toString() +
      padDate(d.getMonth() + 1) +
      padDate(d.getDate()) +
      padDate(d.getHours()) +
      padDate(d.getMinutes()) +
      padDate(d.getSeconds());
}

var padDate = function(segment) {
  segment = segment.toString();
  return segment[1] ? segment : '0' + segment;
}

exports.seed = function(db, Promise) {
	return Promise.all([
		db.table('user').insert([
			{nomadlog_url: 'itsgettingreal', nomadlog_name: 'Its Getting real'}
		]),

		db.table('location').insert([
			{
				city: 'Stuttgart',
				country: 'Germany',
				timezone: 'Europe/Berlin',
				coords: [9.163473, 48.789982].join(',')
			},
			{
				city: 'Bangkok',
				country: 'Thailand',
				timezone: 'Asia/Bangkok',
				coords: [100.561646, 13.735115].join(',')
			},
			{
				city: 'Koh Samui',
				country: 'Thailand',
				timezone: 'Asia/Bangkok',
				coords: [100.013425, 9.512978].join(',')
			},
			{
				city: 'Ao Nang',
				country: 'Thailand',
				timezone: 'Asia/Bangkok',
				coords: [98.814320, 8.052805].join(',')
			},
			{
				city: 'Phuket',
				country: 'Thailand',
				timezone: 'Asia/Bangkok',
				coords: [98.391227, 7.880640].join(',')

			},
			{
				city: 'Singapore',
				country: 'Singapore',
				timezone: 'Asia/Singapore',
				coords: [103.860052, 1.349736].join(',')
			},
			{
				city: 'Kuala Lumpur',
				country: 'Malaysia',
				timezone: 'Asia/Kuala_Lumpur',
				coords: [101.690962, 3.107455].join(',')
			}
		]),

		db.table('log').insert([
			{
				user_id: 1,
				location_id: 1,
				arrival: null,
				departure: '04.11.2015'
			},
			{
				user_id: 1,
				location_id: 2,
				arrival: '04.11.2015',
				departure: '09.11.2015'
			},
			{
				user_id: 1,
				location_id: 3,
				arrival: '09.11.2015',
				departure: '13.11.2015'
			},
			{
				user_id: 1,
				location_id: 4,
				arrival: '03.11.2015',
				departure: '17.11.2015'
			},
			{
				user_id: 1,
				location_id: 5,
				arrival: '17.11.2015',
				departure: '21.11.2015'

			},
			{
				user_id: 1,
				location_id: 5,
				arrival: '21.11.2015',
				departure: '25.11.2015'
			},
			{
				user_id: 1,
				location_id: 6,
				arrival: '21.11.2015',
				departure: null
			}
		].map(function(obj){
			if(obj.arrival !== null){
				var t = obj.arrival.split('.').reverse();
				obj.arrival = timestamp(t.join('.'));
			}

			if(obj.departure !== null){
				var t = obj.departure.split('.').reverse();
				obj.departure = timestamp(t.join('.'));
			}

			return obj;
		}))
	]);
};