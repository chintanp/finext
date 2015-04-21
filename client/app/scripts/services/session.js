/**
 * Created by CE-IES-IPSA on 21-04-2015.
 */


// A Session service to take care of sessions across application

angular.module('prep').service('Session',

  function () {

    this.create = function (sessionId, userId, userRole) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;

  };

  this.destroy = function () {

    this.id = null;
    this.userId = null;
    this.userRole = null;

  };
});
