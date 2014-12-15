

'use strict'

angular.module('prep').controller('ProfileCtrl', function($scope, $rootScope, $location, $routeParams, Profile, Auth) {

  var uid = $routeParams.userId;

  $rootScope.model = {};
  $rootScope.model.results = {};

  $scope.profile = Profile.get(uid);

  var prof = $scope.profile;

  prof.$loaded().then(function() {

    /*angular.forEach(prof, function(value, key) {

      $scope.profile[key] = value;

    });*/
  });

  Profile.getModels(uid).then(function(models) {

    if(!models) {
      $scope.modelsExist = false;
    }
    else {
      $scope.models = models;
      $scope.modelsExist = true;
    }


  });

  $scope.loadModel = function(model) {

    // var model = Profile.getCurrentModel(modelId);
    console.log(model);

    $rootScope.model = model;

    $location.path('/input');

  };

  $scope.loadResults = function(model) {
    // localStorage.setItem("results", ModelSync.find(modelId).results);

    console.log(model.results);

    $rootScope.model.results = model.results;

    $location.path('/results');
  }

  $scope.deleteModel = function(key, model) {

    Profile.delete(uid, key, model);
    delete $scope.models[key];
    $rootScope.model = {};
    $rootScope.model.results = {};
  }

  $scope.logout = function() {

    $rootScope.model = {};
    Auth.logout();
    $location.path('/');
  };

});

