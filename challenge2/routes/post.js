exports.active = function(app, db){
	app.get('/posts/:id', function(req, res){
		var id= req.param('id');

		db.teams.find({
			teamNum: id
		}, function(error, result){
			res.render('posts', {
				data: result
			});
			
		});

	});
};