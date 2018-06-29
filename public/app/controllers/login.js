
angular.module('myApp.login', [])

.controller('LoginCtrl', ['$scope','$location', '$http','$rootScope', function($scope, $location, $http, $rootScope) {

    $scope.flag = false;

	$scope.submit = function (users) {

		$http.post("/api/user/login", users).then(function(userFound) {
			if(userFound.data==null) {
				$scope.flag = true;
			}
			else {
				$scope.flag = false;
				$rootScope.currentUser = userFound.data.name;
				$location.path('/BlogPosts');
			}
		}, function(err) {
        	console.log(err);
    	});
				
	};

	$scope.signup = function () {
		$location.path('/SignUp');
	}

}]);