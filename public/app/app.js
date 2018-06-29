// Declare app level module which depends on views, and components
angular.module('myApp', ['myApp.login','myApp.signup','myApp.updateprofile','myApp.blogposts','myApp.myposts', 'myApp.addposts','myApp.editpost','ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

	.when('/', {
		templateUrl: 'app/views/login.html'
	})

	.when('/SignUp', {
		templateUrl: 'app/views/signup.html'
	})	

	.when('/UpdateProfile', {
		templateUrl: 'app/views/updateprofile.html'
	})

	.when('/BlogPosts', {
		templateUrl: 'app/views/blogposts.html'
	})

	.when('/MyPosts', {
		templateUrl: 'app/views/myposts.html'
	})

	.when('/AddPosts', {
		templateUrl: 'app/views/addposts.html'
	})

	.when('/EditPost', {
		templateUrl: 'app/views/editpost.html'
	})

	.otherwise({
		redirectTo: '/'
	});

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});
