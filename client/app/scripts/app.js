'use strict';


// TODO global error and exception handling,
// TODO offline firebase connection or API mockup

/* global app:true */

var app = angular.module('confeaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
		'ngDropdowns',
		'firebase'
  ])
	.constant('FIREBASE_URL', 'https://finext.firebaseio.com/');

 app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'InputCtrl'
      })
	    .when('/input', {
		    templateUrl: 'views/input.html',
		    controller: 'InputCtrl'
	    })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'AuthCtrl',
		    resolve: {
			    user: function(Auth) {
				    return Auth.resolveUser();
			    }
		    }
      })
	    .when('/login', {
		    templateUrl: 'views/login.html',
		    controller: 'AuthCtrl',
		    resolve: {
			    user: function(Auth) {
				    return Auth.resolveUser();
			    }
		    }
	    })
	    .when('/results', {
		    templateUrl: 'views/results.html',
		    controller: 'ResultCtrl'
	    })
      .when('/graph', {
        templateUrl: 'views/graph.html',
        controller: 'GraphCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
