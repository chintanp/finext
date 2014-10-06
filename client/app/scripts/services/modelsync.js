/**
 * Created by chin on 03/10/2014.
 */
// Provides the service for three way data binding with angularfire

'use strict';

app.factory('ModelSync', function($firebase, FIREBASE_URL, socket) {

	var ref = new Firebase(FIREBASE_URL + 'models');

	var models = $firebase(ref).$asArray();

	// CRUD functions exposed in this service, to work on modelInfo object.
	var ModelSync = {

		all: models,

		create: function(model) {
			return models.$add(model).then(function(ref) {
				console.log("Firebase replied with : " + ref.name());
				var uid = ref.name();
				socket.emit('BeginSolve', {id: uid});
			});
		},

		find: function(modelId) {
			return $firebase(ref.child(modelId)).$asObject();
		},

		delete: function(model) {
			return models.$remove(model);
		}
	};

	return ModelSync;
});