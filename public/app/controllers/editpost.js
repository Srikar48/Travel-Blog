
angular.module('myApp.editpost', [])

.controller('EditPostCtrl', ['$scope','$location', '$http','$rootScope', function($scope, $location, $http, $rootScope) {

	$scope.post1 = $rootScope.mypost;

    $scope.editBlog = function(post) {

        post.time = Date.now();
        $http.put("/api/editPost", post).then(function(res) {
            window.alert("Post Edited Successfully!!!");
            $location.path("/MyPosts");
        }, function(err) {
            console.log(err);
        });

    }

}]);