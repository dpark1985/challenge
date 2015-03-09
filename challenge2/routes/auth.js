exports.active = function(everyauth, db){
	//everyauth 모듈 기본 설정
	var auth = everyauth.password.loginWith('login');
	everyauth.everymodule.userPkey('_id');
	everyauth.everymodule.findUserById(function(id, callback){
		db.users.findOne({
			_id: db.ObjectId(id)
		}, function(error, user){
			callback(error, users);
		});
	});


	//로그아웃 설정
	everyauth.everymodule.logoutPath('/logout');
	everyauth.everymodule.logoutRedirectPath('/');


	//가입 설정
	auth.registerView('register');
	auth.getRegisterPath('/register');
	auth.postRegisterPath('/register');
	auth.extractExtraRegistrationParams(function(request){ });
	auth.validateRegistration(function(userAttribute, errors){ });
	auth.registerUser(function(userAttribute){ });
	auth.registerSuccessRedirect('/');


	//로그인 설정
	auth.loginView('login');
	auth.getLoginPath('/login');
	auth.postLoginPath('/login');
	auth.authenticate(function(login, password){ });
	auth.loginSuccessRedirect('/');
};