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

  // Few more constants to help with authentication and session management

  prep.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  });

  prep.constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    editor: 'editor',
    guest: 'guest'
  });

// angular.bootstrap(document.getElementById("textContainer"), ["prep"]);

 prep.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'ApplicationCtrl'
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
        templateUrl: 'views/graph.html'

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

angular.element(document).ready(function() {
	angular.bootstrap(document.getElementById("textContainer"), ["prep"]);
});
