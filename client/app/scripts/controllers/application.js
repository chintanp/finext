/**
 * Created by CE-IES-IPSA on 21-04-2015.
 */

angular.module('prep').controller('ApplicationController',

  function ($scope, USER_ROLES, Auth) {

  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = Auth.isAuthorized;

  $scope.setCurrentUser = function (user) {

    $scope.currentUser = user;

  };

});
