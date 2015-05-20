/**
 * Created by chin on 06/10/2014.
 */
// Custom Util functions for simulating various atomic operations of FB
	// like move and copy


var Firebase = require('firebase');


// Update these refs to indicate old location and new location
var old1 = new Firebase('https://finext.firebaseio.com/modelInfo');
var new1 = new Firebase('https://finext.firebaseio.com/models');

function copyFbRecord(oldRef, newRef) {
	oldRef.once('value', function(snap)  {
		console.log('old value: ' + snap.val());
		var test = newRef.set( snap.val(), function(error) {
			if( error && typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
		});
		console.log('The copy to newRef returns: ' + test);
	});
}

function moveFbRecord(oldRef, newRef) {
	oldRef.once('value', function(snap)  {
		console.log('old value: ' + snap.val());
		var test = newRef.set( snap.val(), function(error) {
			if( !error ) {  oldRef.remove(); }
			else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
		});
		console.log('The move to newRef returns: ' + test);
	});
}

// Use either one to cpy or move data

console.log(copyFbRecord(old1, new1));
// console.log(moveFbRecord(old1, new1));