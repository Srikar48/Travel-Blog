
angular.module('myApp.addposts', [])

.controller('AddPostsCtrl', ['$scope','$location', '$http','$rootScope', function($scope, $location, $http, $rootScope) {

	$scope.postBlog = function(post) {

		if((post.title!='')&&(post.url!='')&&(post.body!=''))
		{
            post.author = $rootScope.currentUser;			
			$http.post("/api/blogPost", post).then(function(posts) {
                window.alert("Post Added Successfully!!!");
                $location.path("/BlogPosts");
            }, function(err) {
            	console.log(err);
            });
			
			$scope.flag1 = false;
		}
		else
		$scope.flag1 = true;

	};

}]);