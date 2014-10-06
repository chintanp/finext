/**
 * Created by chin on 06/10/2014.
 */
'use strict';

app.controller('NavCtrl', function($scope, $location, ModelSync, Auth) {


	$scope.logout = function() {
		Auth.logout();
	};
});