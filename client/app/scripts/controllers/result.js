/**
 * Created by chin on 18/10/2014.
 */

// Controller for formatting results etc.

app.controller('ResultCtrl', function($scope, $rootScope, ModelSync, Auth) {

	ModelSync.getResult($rootScope.uid);

	//alert("uid: " + $rootScope.uid)

	//console.log("results in ResultCtrl: " + results);
	//console.log("$scope in ResultCtrl: " + $scope);
	alert("results.displacements: " + $rootScope.resultSet);

	$scope.logout = function() {
		Auth.logout();
		$location.path('/');
	};

});