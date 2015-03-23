
var register = angular.module('register', ['ngRoute'], function($routeProvider){
	$routeProvider.when('/register', {
		templateUrl: '/templates/register.html'

	});
	$routeProvider.when('/register/details', {
		templateUrl: '/templates/registerDetails.html'
	});
	$routeProvider.otherwise({redirectTo: '/register'});
});

register.controller('registerValidation1', ['$scope', function($scope){


}]);