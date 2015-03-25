
var challengeMain = angular.module('challengeMain', ['ngRoute'], function($routeProvider){
	$routeProvider.when('/', {
	  templateUrl: '/templates/feed.html',
	  controller: function($scope, $http, $socket, $scroll){
		var time = new Date().getTime();
		var url = '/posts?dummy=' + Date.now();

		$http.get(url).success(function(data, status){
		  $scope.posts = data;

		  if(data.length != 0) {time = data[data.length -1].regdate;}
		});	

		$scope.items = ['전체', '마감순', 'other'];
		$scope.selection = $scope.items[0];

		$scope.change = function() {
			if($scope.selection == "전체"){
				$http.get(url).success(function(data, status){
				  $scope.posts = data;

				  if(data.length != 0) {time = data[data.length -1].regdate;}
				});	
			}
		};

	  }
	});
	$routeProvider.otherwise({ redirectTo: '/' });
});







var socketCallback;

var socket = io.connect();
socket.on('message', function(data){
	socketCallback && socketCallback(data);
});

challengeMain.factory('$socket', function($rootScope){
	return {
	  onPush: function(callback){
	    socketCallback = function(receive){
	      callback(receive);
	      $rootScope.$apply();
	    };
	  }
	}
});


var scrollCallback;
var scroll = function(){
	var scrollHeight = $(window).scrollTop() + $(window).height();
	var documentHeight = $(document).height();

	if(scrollHeight > documentHeight -200){
	  scrollCallback && scrollCallback();
	  $(window).off('scroll', scroll);
	}
};

$(window).on('scroll', scroll);

challengeMain.factory('$scroll', function($rootScope){
	return {
	  infinity: function(callback){
	    scrollCallback = function(){
	      callback();
	      $rootScope.$apply();
	    };
	  },
	  restart: function(callback){
	    $(window).on('scroll', scroll);
	  }
	}
});


