'use strict';

app.factory('Auth',
	function($firebase, $firebaseAuth, FIREBASE_URL, $rootScope) {

		var ref = new Firebase(FIREBASE_URL);

		$rootScope.auth = $firebaseAuth(ref);

		var Auth = {
			register: function(user) {
				return $rootScope.auth.$createUser(user.email, user.password);
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
				/*return $rootScope.auth.$authWithPassword(user).then(function(authData) {
				 console.log("Logged in as:", authData.uid);
				 }).catch(function(error) {
				 console.error("Authentication failed:", error);
				 });*//*

				$rootScope.auth.$authWithPassword(user).then(function(authData) {
					console.log("Logged in as:", authData.uid);
					var user = {};
					user.username = '';
					user.username = $rootScope.user.username;
					user.md5_hash = CryptoJS.MD5($rootScope.user.email).toString();
					user.uid = authData.uid;
					return this.createProfile(user);
				}).catch(function(error) {
					console.error("Authentication failed:", error);
				});*/

				console.log("Logged in: ");
				angular.copy(user, Auth.user);

				$rootScope.model = {};
				$rootScope.model.results = {};

				Auth.user.profile = $firebase(ref.child('profile').child(Auth.user.uid)).$asObject();

				console.log(Auth.user);
			},
			logout: function() {

				$rootScope.model = {};
				$rootScope.model.results = {};

				if(Auth.user && Auth.user.profile) {
					Auth.user.profile.$destroy();
				}
				angular.copy({}, Auth.user);
				return $rootScope.auth.$unauth();
			},
			resolveUser: function() {

				var authData = $rootScope.auth.$getAuth();

				if (authData) {
					console.log("Logged in as:", authData.uid);
				} else {
					console.log("Logged out");
				}
				// return $rootScope.auth.$getCurrentUser();
			},
			signedIn: function() {

				var authData = $rootScope.auth.$getAuth();

				if (authData) {
					angular.copy(user, Auth.user);
					Auth.user.profile = $firebase(ref.child('profile').child(Auth.user.uid)).$asObject();
					return true;
				} else {
					return false;
				}
			},

			user: {}
		};

		/*	$rootScope.signedIn = function() {
		 return Auth.signedIn();
		 };*/

		$rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
		 console.log("Logged in: ");
		 angular.copy(user, Auth.user);

		  $rootScope.model = {};
		 $rootScope.model.results = {};

		 //Auth.user = user;

		 Auth.user.profile = $firebase(ref.child('profile').child(Auth.user.uid)).$asObject();

		 //$scope.$apply(Auth.user);

		 console.log(Auth.user);

		 });

		/* $rootScope.$on('$firebaseSimpleLogin:logout', function() {
		 console.log("Logged out: ");

		 $rootScope.model = {};
		 $rootScope.model.results = {};

		 if(Auth.user && Auth.user.profile) {
		 Auth.user.profile.$destroy();
		 }
		 angular.copy({}, Auth.user);
		 });*/
		return Auth;

	});
