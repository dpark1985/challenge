exports.active = function(app, db){
	app.get('/feeds', function(req, res, next) {
		db.teams.find(function(error, data){
			res.render('feeds', {
				Tdata: data
			});
		});
	});
};