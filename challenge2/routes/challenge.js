exports.active = function(app, db){
	app.get('/challenge', function(req, res, next) {
		isLogin(req, res, function(user){
			res.render('challenge');
		}, function(){
			res.redirect('/');
		});		
	});
	app.post('/challenge', function(req, res, next){
		db.teams.insert({
			teamNum: 1,
			sports: {
				sportsType: req.body.name,
				sportsMin: 11
			},
			teamBuilt: new Date(),
			teamMember: [],
			teamComplete: false
		}, function(error, result){
			if(error){
				res.redirect('/');
			}else {
				res.redirect('/');
			}
		});
	});
};