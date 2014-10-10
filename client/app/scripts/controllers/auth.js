'use strict';

app.controller('AuthCtrl',
	function($scope, $location, Auth, User) {
		if(Auth.signedIn()) {
			$location.path('/input');
		}

		$scope.$on('$firebaseSimpleLogin:login', function(e, user) {
			console.log('User ' + user.id + ' successfully logged in. ')
			$location.path('/input');
		});

		$scope.login = function() {
			Auth.login($scope.user).then(function() {
				$location.path('/input');
			}, function(error) {
				$scope.error = error.toString();
			});
		};

		$scope.register = function() {
			Auth.register($scope.user).then(function(authUser) {
				User.create(authUser, $scope.user.username);
				console.log(authUser);
				Auth.login($scope.user).then(function () {
					$location.path('/input');
				});
			});
		};
	});