'use strict';

// Is the user dependency injected here ?

app.controller('AuthCtrl',
	function($scope, $rootScope, $location, Auth, user) {

		if(Auth.signedIn()) {
			$location.path('/input');
		}

		/*$scope.$on('$firebaseSimpleLogin:login', function(e, user) {
			console.log('User ' + user.id + ' successfully logged in. ')
			$location.path('/input');
		});*/

		$scope.login = function() {
			Auth.login($scope.user).then(function() {
				$location.path('/input');
			}, function(error) {
				$scope.error = error.toString();
			});
		};

		$scope.register = function() {
			Auth.register($scope.user).then(function(user) {
				return Auth.login($scope.user).then(function () {
					user.username = $scope.user.username;
					return Auth.createProfile(user);
				}).then(function () {
          $rootScope.model = {};
					$location.path('/input');
				});
			}, function(error) {
				$scope.error = error.toString();
			});
		};


	});
