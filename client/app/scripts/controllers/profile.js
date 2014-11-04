

'use strict'

app.controller('ProfileCtrl', function($scope, $routeParams, Profile) {

  var uid = $routeParams.userId;

  $scope.profile = Profile.get(uid);

  Profile.getModels(uid).then(function(models) {

    $scope.models = models;

  });
});

