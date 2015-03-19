var app = angular.module('SportsChallenge', []);

app.directive('scHeader', function(){
	return {
		restrict: 'E',
		templateUrl: "templates/scheader.html"
	}
});

app.directive('scindexAdd', function(){
	return {
		restrict: 'E',
		templateUrl: "templates/scindexAdd.html"
	}
});

app.directive('scFooter', function(){
	return {
		restrict: 'E',
		templateUrl: "templates/scfooter.html"
	}
});
