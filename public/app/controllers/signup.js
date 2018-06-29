
angular.module('myApp.signup', [])

.controller('SignupCtrl', ['$scope','$location','$http', function($scope, $location, $http) {

$scope.signup = function(user) {
		
	$http.post("/api/user/signup", user).then(function(users) {
		window.alert("Account Created Successfully!!!");
		$location.path("/");
	}, function(err) {
        console.log(err);
    });
};

}]);