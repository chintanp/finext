/**
 * Created by chin on 03/10/2014.
 */
// Provides the service for three way data binding with angularfire

'use strict';

angular.module('prep').factory('ModelSync',

  function($rootScope, FIREBASE_URL, socket) {

  /*var ref = new Firebase(FIREBASE_URL + 'models');
  var baseRef = new Firebase(FIREBASE_URL);

  var models = $firebaseArray(ref);
*/
  // CRUD functions exposed in this service, to work on modelInfo object.
  var ModelSync = {

    all: models,

    create: function(model) {

      $rootScope.model = model;

      /*return models.$add(model).then( function(ref) {

        // Also save the model UID to the user_models collection for ease of retrieval.
        // $firebase(ref.parent().parent().child('user_models').$set(model.creatorUID, ref.name()));
        //baseRef.child('user_models').child(model.creatorUID).push(ref.key());

        console.log("Firebase replied with : " + ref.key());
        var uid = ref.key();
        $rootScope.uid = uid;

        socket.emit('BeginSolve', {id: uid});
        //localStorage.setItem("id", uid);
      });*/

    },

    find: function(modelId) {

      return $firebaseObject(ref.child(modelId));

    },

    delete: function(model) {

      ref.child('models').remove(model.$id);

    }
  };

  return ModelSync;
});
