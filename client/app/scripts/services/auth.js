'use strict';

app.factory('Auth',
	function($firebase, $firebaseSimpleLogin, FIREBASE_URL, $rootScope) {

		var ref = new Firebase(FIREBASE_URL);

		var auth = $firebaseSimpleLogin(ref);

		var Auth = {
			register: function(user) {
				return auth.$createUser(user.email, user.password);
			},
			createProfile: function(user) {
				var profile = {
					username: user.username,
					md5_hash: user.md5_hash
				};

        // Now referring to ref/profile - and then should create profile based on name: user.uid
				var profileRef = $firebase(ref.child("profile"));

        // $set - creates a child with name user.uid and has data profile
				return profileRef.$set(user.uid, profile);
			},
			login: function(user) {
				return auth.$login('password', user);
			},
			logout: function() {
				return auth.$logout();
			},
			resolveUser: function() {
				return auth.$getCurrentUser();
			},
			signedIn: function() {
				return !!Auth.user.provider;
			},

      user: {}
		};

	/*	$rootScope.signedIn = function() {
			return Auth.signedIn();
		};*/

		$rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
			console.log("Logged in: ");
			angular.copy(user, Auth.user);

      //Auth.user = user;

      // TODO check the properties of Auth.user, does angular.copy work as expected, ?
			Auth.user.profile = $firebase(ref.child('profile').child(Auth.user.uid)).$asObject();

			console.log(Auth.user);

		});

		$rootScope.$on('$firebaseSimpleLogin:logout', function() {
			console.log("Logged out: ");

			if(Auth.user && Auth.user.profile) {
				Auth.user.profile.$destroy();
			}
			angular.copy({}, Auth.user);
		});

		return Auth;

	});
