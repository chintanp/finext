/**
 * Created by chin on 06/10/2014.
 */

'use strict';

app.factory('User', function($firebase, FIREBASE_URL, Auth) {

	var ref = new Firebase(FIREBASE_URL + 'users');

	var users = $firebase(ref);

	var User = {
		create: function(authUser, username) {

			var user = $firebase(ref.child(username)).$asObject();

			return user.$loaded(function() {
				user.username = username;
				user.md5_hash = authUser.md5_hash;
				user.$priority = authUser.uid;
				user.$save();
			});
		},
		findByUsername: function(username) {
			if(username) {
				return ($firebase(ref.child(username)).$asObject());
			}
		}
	};

	return User;
});
