
angular.module('myApp.blogposts', [])

.controller('BlogPostsCtrl', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope) {

	$scope.flag1 = false;

    var user = {
        name: $rootScope.currentUser
    };

	function init() {

            getAllPosts();

    }

    init();

    function getAllPosts() {
            
        $http.get("/api/blogPost").then(function(posts) {
            $scope.posts = posts.data;
        }, function (err){
           	console.log(err);
        });

    }

    $scope.addPosts = function() {

        $location.path("/AddPosts");

    }

    $scope.myPosts = function() {

        $location.path("/MyPosts");

    }

    $scope.likePost = function(postId) {

        $http.put("api/blogPost/likePost/"+postId).then(function(res) {
            getAllPosts();
        }, function(err) {
            console.log(err);
        });

    };

    $scope.dislikePost = function(postId) {

        $http.put("api/blogPost/dislikePost/"+postId).then(function(res) {
            getAllPosts();
        }, function(err) {
            console.log(err);
        });

    };

    $scope.signout = function() {

        $location.path("/");

    }

    $scope.update = function() {

        $http.post("api/getUser", user).then(function(res) {
            $rootScope.updateuser = res.data;
            $location.path("/UpdateProfile");
        }, function(err) {
            console.log(err);
        });

    }

}]);