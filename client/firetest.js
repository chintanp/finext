

var Firebase = require('firebase');

const FIREBASE_URL = 'http://finext.firebaseio.com/';

// var finext = new Firebase('http://finext.firebaseio.com/');

var g_uid = "-JZXjJY2Gz8Ip_ySGoiS";

var modelRef = new Firebase( FIREBASE_URL + '/models/');
var resultRef = modelRef.child(g_uid + '/results/');


/*modelRef = modelRef.limit(1);


modelRef.on('child_added', function(snapshot) {

	var localModel = snapshot.name();

	console.log("The new push id is: " + localModel);

});*/

jsonData = {"displacements" : 1001};

resultRef.set(jsonData);
