/**
 * Created by chin on 03/10/2014.
 */
// Provides the service for three way data binding with angularfire

'use strict';

app.factory('ModelSync', function($firebase, $rootScope, FIREBASE_URL, socket) {

  var ref = new Firebase(FIREBASE_URL + 'models');
  var baseRef = new Firebase(FIREBASE_URL);

  var models = $firebase(ref).$asArray();

  // CRUD functions exposed in this service, to work on modelInfo object.
  var ModelSync = {

    all: models,

    create: function(model) {
      $rootScope.model = model;
      return models.$add(model).then(function(ref) {

        // Also save the model UID to the user_models collection for ease of retrieval.
        // $firebase(ref.parent().parent().child('user_models').$set(model.creatorUID, ref.name()));
        $firebase(baseRef.child('user_models').child(model.creatorUID)).$push(ref.name());

        console.log("Firebase replied with : " + ref.key());
        var uid = ref.key();
        $rootScope.uid = uid;

        socket.emit('BeginSolve', {id: uid});
        //localStorage.setItem("id", uid);
      });
    },

    find: function(modelId) {
      return $firebase(ref.child(modelId)).$asObject();
    },

    delete: function(model) {

      $firebase(ref.child('models')).$remove(model.$id);
      /*models.$remove(model).then(function(ref) {
        return ref.name();
      });*/
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
