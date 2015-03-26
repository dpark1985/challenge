exports.active = function(app, db){
	app.get('/', function(req, res, next) {
		isLogin(req, res, function(user){
			res.render('main', { 
				user: user.name,
			});
		}, function(){
			res.render('main', { 
				user: 'Please login'
			});
		});		
	});

	app.get('/all', function(req, res){
		db.teams.find(function(error, posts){
			res.json(posts);
		});
	});

};