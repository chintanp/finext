/**
 * Created by chin on 18/10/2014.
 */

// Controller for formatting results etc.

app.controller('ResultCtrl', function($scope, $rootScope, $location, ModelSync, Auth, socket) {

	$rootScope.resultsAvailable = false;

  $scope.signedIn = Auth.signedIn;

  if(Auth.signedIn()) {
    $scope.user = Auth.user;
  }

  $scope.logout = function() {
    Auth.logout();
    $location.path('/');
  };

	$rootScope.resultSet = {};
	$rootScope.resultSet.displacements = [];

	socket.on('ModelSolved', function(data) {

		console.log("model Solved with displacements: " + data.displacements);
		$rootScope.resultSet = data;

		if(data) {
			$rootScope.resultsAvailable = true;
		}
	});

	$scope.logout = function() {
		Auth.logout();
		$location.path('/');
	};

});
