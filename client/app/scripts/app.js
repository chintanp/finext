'use strict';


// TODO global error and exception handling,
// TODO offline firebase connection or API mockup

/* global app:true */

var prep = angular.module('prep', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
		'ngDropdowns',
    'mobile-angular-ui',
		'firebase'
  ])
	.constant('FIREBASE_URL', 'https://finext.firebaseio.com/');

angular.module('postp', []);


// angular.bootstrap(document.getElementById("textContainer"), ["prep"]);

 angular.module("page", ["prep", "postp"], function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: ''
      })
	    .when('/input', {
		    templateUrl: 'views/input.html',
		    controller: 'InputCtrl',
        resolve: {
          user: function(Auth) {
            return Auth.resolveUser();
          }
        }
	    })
      .when('/users/:userId', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        resolve: {
          user: function(Auth) {
            return Auth.resolveUser();
          }
        }
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'AuthCtrl'
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
		    controller: 'ResultCtrl',
        resolve: {
          user: function(Auth) {
            return Auth.resolveUser();
          }
        }
	    })
      .when('/graph', {
        templateUrl: 'views/graph.html',
        controller: 'GraphCtrl'
       /* resolve: {
          user: function(Auth) {
            return Auth.resolveUser();
          }
        }*/
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular.bootstrap(document.getElementById("textContainer"), ["prep"]);
