
angular.module('myApp.myposts', [])

.controller('MyPostsCtrl', ['$scope','$location', '$http','$rootScope', function($scope, $location, $http, $rootScope) {

	var user = {
		name: $rootScope.currentUser
	};

	function init() {

            getMyPosts();

    }

    init();

    function getMyPosts() {
 
        $http.post("/api/myPost", user).then(function(posts) {
            $scope.posts = posts.data;
        }, function (err){
           	console.log(err);
        });

    }

    $scope.deletePost = function(postId) {

        $http.delete("api/deletePost/"+postId).then(function(res) {
        	window.alert("Post Deleted Successfully!!!")
            getMyPosts();
        }, function(err) {
            console.log(err);
        });

    };

    $scope.editPost = function(postId) {

        $http.post("api/getPost/"+postId).then(function(res) {
        	$rootScope.mypost = res.data;
        	$location.path("/EditPost");
        }, function(err) {
            console.log(err);
        });

    };

}]);