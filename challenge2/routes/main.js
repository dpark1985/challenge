exports.active = function(app, everyauth, db){
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
	app.post('/', function(req, res, next){

	});
};