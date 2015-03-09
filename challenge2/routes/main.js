exports.active = function(router, db){
	router.get('/', function(req, res, next) {
		res.render('index', { title: 'Express Testing' });
	});

};