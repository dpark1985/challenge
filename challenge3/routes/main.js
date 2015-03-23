exports.active = function(app, db){
	app.get('/', function(req, res, next) {
		isLogin(req, res, function(user){
			res.render('index', { 
				user: user.name,
			});
		}, function(){
			res.render('index', { 
				user: 'Please login'
			});
		});		
	});

};