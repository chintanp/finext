/**
 * Created by chin on 18/10/2014.
 */

// Controller for formatting results etc.

angular.module('prep').controller('ResultCtrl', function($scope, $rootScope, $location, $filter, socket) {

  $rootScope.resultsAvailable = false;

  $scope.showGraph = function() {

    $location.path('/graph');
  };

  if($rootScope.model.results) {
    $rootScope.resultsAvailable = true;
    $rootScope.resultSet = $rootScope.model.results || {};
  }
  else {
    $rootScope.resultsAvailable = false;
    $rootScope.resultSet = {};
  }

	socket.on('ModelSolved', function(data) {

    console.log("model Solved with displacements: " + data.displacements);
    $rootScope.resultSet = data;

    if (data) {
      $rootScope.resultsAvailable = true;
    }
  });
});
