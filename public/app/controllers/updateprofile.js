
angular.module('myApp.updateprofile', [])

.controller('UpdateProfileCtrl', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope) {

	$scope.user2 = $rootScope.updateuser;

    $scope.updateUser = function(user) {

        $http.put("/api/user/update", user).then(function(res) {
            window.alert("Profile Updated Successfully!!!");
            $location.path("/BlogPosts");
        }, function(err) {
            console.log(err);
        });

    }

}]);