exports.active = function(app, db, fs){
	app.get('/challenge', function(req, res, next) {
		isLogin(req, res, function(user){
			res.render('challenge');
		}, function(){
			res.redirect('/login');
		});		
	});
	app.post('/challenge', function(req, res, next){
		if(done==true){
		    console.log(req.files);
	  	}
		db.teams.insert({
		  	eventName : req.body.eventName,
		  	eventSummary : req.body.eventSummary,
		  	eventImg : req.files.eventImg.name,
		  	eventCreated : Date()
		}, function(err, post){
		  	if(err){
		        res.render('error', {
		            message: err.message,
		            error: err
		        });
		  	}else{
		  		res.redirect('/');
		  	}
		});		
	});
};