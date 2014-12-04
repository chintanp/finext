'use strict';

// Is the user dependency injected here ?

app.controller('AuthCtrl',
	function($scope, $rootScope, $firebaseAuth, FIREBASE_URL, $location, Auth) {

    var ref = new Firebase(FIREBASE_URL);

    $rootScope.auth = $firebaseAuth(ref);

		if(Auth.signedIn()) {
			$location.path('/input');
		}

		$scope.login = function() {

      $rootScope.auth.$authWithPassword($scope.user).then(function(authData) {
        console.log("Logged in as:", authData.uid);

        $location.path('/input');
      }).catch(function(error) {
        console.error("Authentication failed:", error);
      });
			/*Auth.login($scope.user).then(function() {
				$location.path('/input');
			}, function(error) {
				$scope.error = error.toString();
			});*/

		};

		$scope.register = function() {

      $rootScope.auth.$createUser($scope.user.email, $scope.user.password).then(function() {
        console.log("User created successfully!");

        return $rootScope.auth.$authWithPassword($scope.user);
      }).then(function(authData) {
        console.log("Logged in as:", authData.uid);
        var user = {};
        user.username = $rootScope.user.username;
        user.email = $rootScope.user.email;
        user.md5_hash = CryptoJS.MD5($rootScope.user.email).toString();
        user.uid = authData.uid;
        Auth.createProfile(user);
        $location.path('/input');

      }).catch(function(error) {
        console.error("Error: ", error);
      });
			/*Auth.register($scope.user).then(function() {
				return Auth.login($scope.user).then(function () {

				}).then(function () {
					$location.path('/input');
				});
			}, function(error) {
				$scope.error = error.toString();
			});*/
		};


	});
