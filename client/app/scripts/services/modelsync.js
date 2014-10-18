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
		},

		getResults: function(modelId) {
			console.log("ModelId:" + modelId);
			var results = $firebase(ref.child(modelId).child("results")).$asArray();
			results.$loaded().then(function(data) {
				console.log("Data in getResults: " + data);
				$rootScope.resultSet = data;
				return;
			});


		}
	};

	return ModelSync;
});