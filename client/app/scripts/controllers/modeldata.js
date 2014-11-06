/**
 * Created by chin on 02/10/2014.
 */

'use strict';

app.controller('InputCtrl', function($scope, $location, $rootScope, ModelSync, Auth, socket) {

	//var myFireBaseRef = new Firebase("http://finext.firebaseio.com/modelInfo");

  $scope.signedIn = Auth.signedIn;

	if(Auth.signedIn()) {
		$scope.user = Auth.user;
	}

  // console.log(user);

	$scope.logout = function() {
		Auth.logout();
		$location.path('/');
	};



  //$scope.logout = Auth.logout;

	//$scope.username = Auth.
	$scope.modelInfo = ModelSync.all; /*{ length : " ",
	 breadth : " ",
	 thickness : " ",
	 divx : " ",
	 divy : " "
	 };
  */
  if($rootScope.model) {
    $scope.model =  { length : $rootScope.model.length || ' ',
      breadth : $rootScope.model.breadth || '',
      thickness : $rootScope.model.thickness || '',
      density : $rootScope.model.density || '',
      elasticity: $rootScope.model.elasticity || '',
      poisson: $rootScope.model.poisson || '',
      divx : $rootScope.model.divx || '',
      divy : $rootScope.model.divy || ''
    };

    $scope.model.loadData = $rootScope.model.loadData || { };
    $scope.model.loadData.loadTypeSelected = $rootScope.model.loadData.loadTypeSelected || {};
    $scope.model.loadData.loadValue = $rootScope.model.loadData.loadValue || {};
  }

  else {
    $scope.model = {
      length: '',
      breadth: '',
      thickness: '',
      density: '',
      elasticity: '',
      poisson: '',
      divx: '',
      divy: ''
    };

    $scope.model.loadData = { };
    $scope.model.loadData.loadTypeSelected = {};
    $scope.model.loadData.loadValue = {};
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

	// $scope.model.endTypeSelected = {};

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

	// $scope.model.elementTypeSelected = {};

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


	$scope.solve = function() {

		$scope.model.creator = $scope.user.profile.username;
		$scope.model.creatorUID = $scope.user.uid;

		ModelSync.create($scope.model).then(function() {

			//console.log("$push returned : in CTRL: " + ref.name());
			// May reset the UI to initial state.
			// TODO change the alert box to a AngularUI modal to get the values confirmed from the user
			alert("Data saved, new model created");
			$location.path('/results');

		});
	};

	/*socket.on('newz', function(data) {
	 console.log("The server sent: " + data);
	 //alert("The server sent: " + data);
	 socket.emit('event', {my: 'data'});
	 });*/

});
