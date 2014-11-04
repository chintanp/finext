/**
 * Created by chin on 04/11/2014.
 */

'use strict'

app.factory('Profile', function($window, FIREBASE_URL, $firebase, ModelSync, $q) {

  var ref = new $window.Firebase(FIREBASE_URL);

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
    }
  };

  return profile;
});
