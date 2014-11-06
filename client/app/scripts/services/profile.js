/**
 * Created by chin on 04/11/2014.
 */

'use strict'

app.factory('Profile', function($window, FIREBASE_URL, $filter, $firebase, ModelSync, $q) {

  var ref = new $window.Firebase(FIREBASE_URL);
  var ref1 = new Firebase(FIREBASE_URL + '/models');
  var sync = $firebase(ref1);

  var profile = {
    get: function(userId) {
      return $firebase(ref.child('profile').child(userId)).$asObject();
    },

    getModels: function(userId) {

      var defer = $q.defer();

      $firebase(ref.child('user_models').child(userId))
        .$asArray()
        .$loaded()
        .then(function(data) {
          var models = {};

          for(var i = 0; i < data.length; i++) {
            var value = data[i].$value;
            models[value] = ModelSync.find(value);
          }
          defer.resolve(models);
        });

      return defer.promise;
    },

    getCurrentModel: function (modelId) {

      /*var defer = $q.defer();

      $firebase(ref.child('models').child(modelId))
        .$asArray()
        .$loaded()
        .then(function(data) {

          var model = {};

          if(data) {
            model = $filter('json')(data);
          }

          defer.resolve(model);
        });

      return defer.promise;*/

     /* var data = $firebase(ref.child('models').child(modelId)).$asArray();

      var model = {};

      if(data) {
        model = $filter('json')(data);
      }

      return model;*/

      var sync = $firebase(ref1.child(modelId));
      var list = sync.$asArray();
      var obj = {};
      list.$loaded().then(function() {
        console.log("List: " + list);
        return list;


      });



    }
  };

  return profile;
});
