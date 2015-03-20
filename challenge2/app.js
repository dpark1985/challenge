
//모듈 추출
var debug = require('debug')('challenge2');
var http = require('http');
var nconf = require('nconf');
var mongojs = require('mongojs');
var everyauth = require('everyauth');
var socket_io = require('socket.io');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
var session = require('express-session')
var RedisStore = require('connect-redis')(session);
var redis = require('redis');

var customGlobal = require('./routes/global');
var customAuth = require('./routes/auth');
var customMain = require('./routes/main');
var customSocket = require('./routes/socket');
var customChallenge = require('./routes/challenge');
var customFeeds = require('./routes/feeds');
var customPost = require('./routes/post');

//데이터베이스 연결
var db = mongojs.connect('Challenge', ['users', 'events', 'teams']);

var client = redis.createClient();
process.on('exit', function(){
    client.quit();
});
var options = {
    client: client
}

//세션 저장소를 생성
var sessionStore = new RedisStore(options);

//nconf 파일 설정
nconf.file('config.json');

//서버 생성
var app = express();
var server = http.createServer(app);

//소켓 서버 생성
var io = socket_io.listen(server);
io.set('log level', 2);

//기본 모듈 실행
customGlobal.active(nconf);
customAuth.active(everyauth, db);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('your secret here'));
app.use(session({
    key: 'session',
    store: sessionStore
}));
app.use(everyauth.middleware());
app.use(router);
app.use(express.static(path.join(__dirname, 'public')));



//라우터
customMain.active(app, db);
customSocket.active(io, client, sessionStore);
customChallenge.active(app, db);
customFeeds.active(app, db);
customPost.active(app, db);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//서버를 실행합니다.
server.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});
