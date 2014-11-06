

'use strict'

app.controller('ProfileCtrl', function($scope, $rootScope, $location, $routeParams, Profile, ModelSync) {

  var uid = $routeParams.userId;

  $rootScope.model = {};
  $rootScope.model.results = {};

  $scope.profile = Profile.get(uid);

  Profile.getModels(uid).then(function(models) {

    $scope.models = models;

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
});

