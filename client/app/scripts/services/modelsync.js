/**
 * Created by chin on 03/10/2014.
 */
// Provides the service for three way data binding with angularfire

'use strict';

app.factory('ModelSync', function($firebase, $rootScope, FIREBASE_URL, socket) {

	var ref = new Firebase(FIREBASE_URL + 'models');

	var models = $firebase(ref).$asArray();

	// CRUD functions exposed in this service, to work on modelInfo object.
	var ModelSync = {

		all: models,

		create: function(model) {
			return models.$add(model).then(function(ref) {
				console.log("Firebase replied with : " + ref.name());
				var uid = ref.name();
				$rootScope.uid = uid;
				socket.emit('BeginSolve', {id: uid});
			});
		},

		find: function(modelId) {
			return $firebase(ref.child(modelId)).$asObject();
		},

		delete: function(model) {
			return models.$remove(model);
		}

		/*getResults: function(modelId) {
			*//*console.log("ModelId:" + modelId);

			$rootScope. resultSet = {};
			$rootScope.resultSet.displacements = [];

			$rootScope.resultSet.displacements = $firebase(ref.child(modelId).child("results")).$asArray();
			*//**//*results.$loaded().then(function(data) {
				console.log("Data in getResults: " + data);
				if(data) {
					console.log("Data received from firebase");
					$rootScope.resultsAvailable = true;
					$rootScope.resultSet = data;
				}*//**//*
			if($rootScope.resultSet.displacements) {
				$rootScope.resultsAvailable = true;
				$rootScope.resultSet.displacements = JSON.parse($rootScope.resultSet.displacements);
			}
*//*


			return;
		}*/
	};

	return ModelSync;
});