/**
 * Created by chin on 18/10/2014.
 */

// Controller for formatting results etc.

app.controller('ResultCtrl', function($scope, $rootScope, $location, ModelSync, Auth, socket) {


	$rootScope.resultsAvailable = false;

	//$scope.resultSet = {};
	//$scope.resultSet.displacements = [];

	// ModelSync.getResults();

	//angular.copy($rootScope.resultSet.displacements, $scope.resultSet.displacements);
	//$scope.resultSet.displacements = $rootScope.resultSet.displacements;
	//alert("uid: " + $rootScope.uid)

	//console.log("results in ResultCtrl: " + results);
	//console.log("$scope in ResultCtrl: " + $scope);
	//alert("results.displacements: " + $scope.resultSet.displacements);

	$rootScope. resultSet = {};
	$rootScope.resultSet.displacements = [];

	socket.on('ModelSolved', function(data) {
		console.log("model Solved with data: " + data);
		$rootScope.resultSet.displacements = data.resultSet;

		if($rootScope.resultSet.displacements) {
			$rootScope.resultsAvailable = true;
		}
	});

	$scope.logout = function() {
		Auth.logout();
		$location.path('/');
	};

});