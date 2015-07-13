/**
 * Created by chin on 02/10/2014.
 */

'use strict';

angular.module('prep').controller('PlateInputCtrl', function($scope, $location, $rootScope, socket) {

  if(typeof $rootScope.model === 'undefined') {
    $rootScope.model = {
      length: '',
      breadth: '',
      thickness: '',
      density: '',
      elasticity: '',
      poisson: '',
      divx: '',
      divy: ''
    };

    $rootScope.model.loadData = {};
    $rootScope.model.loadData.loadTypeSelected = {};
    $rootScope.model.loadData.loadValue = {};

    $rootScope.model.endTypeSelected = {};
    $rootScope.model.elementTypeSelected = {};
  }

  // Types updated to match the backend, now start from one, all except context.

  $scope.endTypeOptions = [
    {
      text: 'Simply Supported',
      value: 1
    },
    {
      text: 'Fixed',
      value: 2
    },
    {
      text: 'Beam Supported',
      value: 3
    }
  ];

  $scope.loadTypeOptions = [
    {
      text: 'Concentrated at Center',
      value: 1
    },
    {
      text: 'UDL',
      value: 2
    }
  ];

  $scope.elementTypeOptions = [
    {
      text: '4-Noded',
      value: 1
    },
    {
      text: '8-Noded',
      value: 2
    }
  ];

  $scope.contextTypeOptions = [
    {
      text: 'Use Context',
      value: 0
    },
    {
      text: 'Use Default',
      value: 1
    }

  ];

  $scope.contextTypeSelected = {};

  //angular.copy($scope.user, Auth.user);

  $scope.solve = function() {

    // angular.copy($scope.user, Auth.user);

    // send the model data to the backend and request the creation of a unique id
    socket.emit('BeginSolve', $rootScope.model);
  /*  ModelSync.create($rootScope.model).then(function() {

      //console.log("$push returned : in CTRL: " + ref.name());
      // May reset the UI to initial state.
      // TODO change the alert box to a AngularUI modal to get the values confirmed from the user
      alert("Data saved, new model created");
      $location.path('/results');

    });*/
  };
});
