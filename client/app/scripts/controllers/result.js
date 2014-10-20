/**
 * Created by chin on 18/10/2014.
 */

// Controller for formatting results etc.

app.controller('ResultCtrl', function($scope, $rootScope, $location, ModelSync, Auth) {


	$rootScope.resultsAvailable = false;

	$scope.resultSet = {};
	$scope.resultSet.displacements = [];

	ModelSync.getResults($rootScope.uid);

	//angular.copy($rootScope.resultSet.displacements, $scope.resultSet.displacements);
	$scope.resultSet.displacements = $rootScope.resultSet.displacements;
	//alert("uid: " + $rootScope.uid)

	//console.log("results in ResultCtrl: " + results);
	//console.log("$scope in ResultCtrl: " + $scope);
	alert("results.displacements: " + $scope.resultSet.displacements);


	$scope.logout = function() {
		Auth.logout();
		$location.path('/');
	};

});