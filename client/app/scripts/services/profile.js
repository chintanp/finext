/**
 * Created by chin on 04/11/2014.
 */

'use strict'

angular.module('prep').factory('Profile', function($window, FIREBASE_URL, $filter, $firebaseObject, ModelSync, $q, $firebaseArray) {

  var ref = new $window.Firebase(FIREBASE_URL);
  var ref1 = new Firebase(FIREBASE_URL + '/models');
  var ref2 = new Firebase(FIREBASE_URL);

  var Profile = {
    get: function (userId) {
      return $firebaseObject(ref.child('profile').child(userId));
    },

    getModels: function (userId) {

      var defer = $q.defer();

      $firebaseArray(ref.child('user_models').child(userId))
        .$loaded()
        .then(function (data) {
          var models = {};

          for (var i = 0; i < data.length; i++) {
            var value = data[i].$value;
            models[value] = ModelSync.find(value);
          }
          defer.resolve(models);
        });

      return defer.promise;
    },

    delete: function (userId, key, model) {
      // ModelSync.delete(model);

      ref.child('models').remove(key);

      $firebaseArray(ref.child('user_models').child(userId))
        .$loaded()
        .then(function (data) {
          for (var i = 0; i < data.length; i++) {
            var value = data[i].$value;
            if (value === key) {
              ref.child('user_models').child(userId).remove(data[i].$id);
              alert("Record removed");
            }
          }
        })
    }
  }

  return Profile;
});
