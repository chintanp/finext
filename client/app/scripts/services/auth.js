'use strict';

app.factory('Auth',
	function($firebaseSimpleLogin, FIREBASE_URL, $rootScope) {

		var ref = new Firebase(FIREBASE_URL);

		var auth = $firebaseSimpleLogin(ref);

		var Auth = {
			register: function(user) {
				return auth.$createUser(user.email, user.password, function(error, user) {
					if(!error) {
						console.log('User ID: ' + user.id + ', Email: ' + user.email);
					}
				});
			},
			signedIn: function() {
				return auth.user != null;
			},
			login: function(user) {
				return auth.$login('password', user).then(function(user) {
					console.log(" Written from auth service: Logged in as: ", user.uid);
				}, function(error) {
					console.error("Login failed : ", error);
				});
			},
			logout: function() {
				return auth.$logout();
			}
		};

		$rootScope.signedIn = function() {
			return Auth.signedIn();
		};

		return Auth;

	});