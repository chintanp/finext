'use strict';

// Is the user dependency injected here ?

/// TODO: Decouple the controller from authentication logic:
// Controller should only collect the login info and pass it to the authentication
// service, where the real authentication logic is to be implemented.

angular.module('prep').controller('AuthCtrl',
	function($scope, $rootScope, $firebaseAuth, FIREBASE_URL, $location, Auth) {



    // New authentication

    $scope.login = function (credentials) {

      // Calls the login function in Auth service
      Auth.login(credentials).then(function (user) {

        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $scope.setCurrentUser(user);

      }, function () {

        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);

      });
    };



		/*

     var ref = new Firebase(FIREBASE_URL);

     $rootScope.auth = $firebaseAuth(ref);

     if(Auth.signedIn()) {
     $location.path('/input');
     }

		$scope.login = function(user) {

      $rootScope.auth.$authWithPassword($scope.user).then(function(authData) {
        console.log("Logged in as:", authData.uid);
	      Auth.login(authData);
        $location.path('/input');
      }).catch(function(error) {
        console.error("Authentication failed:", error);
      });
			/!*Auth.login($scope.user).then(function() {
				$location.path('/input');
			}, function(error) {
				$scope.error = error.toString();
			});*!/

		};

     $scope.register = function() {

     $rootScope.auth.$createUser($scope.user.email, $scope.user.password).then(function() {
     console.log("User created successfully!");

     return $rootScope.auth.$authWithPassword($scope.user);
     }).then(function(authData) {
     console.log("Logged in as:", authData.uid);
     var user = {};
     user.username = $scope.user.username;
     user.email = $scope.user.email;
     user.md5_hash = CryptoJS.MD5($scope.user.email).toString();
     user.uid = authData.uid;
     Auth.createProfile(user);
     Auth.login(user);
     $location.path('/input');

     }).catch(function(error) {
     console.error("Error: ", error);
     });
*/

			/*Auth.register($scope.user).then(function() {
				return Auth.login($scope.user).then(function () {

				}).then(function () {
					$location.path('/input');
				});
			}, function(error) {
				$scope.error = error.toString();
			});*/



	});
