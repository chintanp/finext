/**
 * Created by chin on 03/10/2014.
 */
// Provides the service for three way data binding with angularfire

'use strict';

app.factory('Sync', function($firebase, FIREBASE_URL) {

	var ref = new Firebase(FIREBASE_URL + 'modelInfo');

	var modelInfo = $firebase(ref).$asArray();

	// CRUD functions exposed in this service, to work on modelInfo object.
	var Sync = {

		all: modelInfo,

		create: function(model) {
			return modelInfo.$add(model);
		},

		find: function(modelId) {
			return $firebase(ref.child(modelId)).$asObject();
		},

		delete: function(model) {
			return modelInfo.$remove(model);
		}
	};

	return Sync;
});