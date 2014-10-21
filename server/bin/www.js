var	http = require('http'),
	request = require('request'),
	rest = require('restler');

var debug = require('debug')('my-application');
var app = require('../app');
var plate_analyser = require('./feanalyser/plate_analyser');

app.set('port', process.env.PORT || 3000);

// Variable declaration

var g_uid = "";   // Making the UID a global variable.

var server = http.createServer(app);
var io = require('socket.io').listen(server);

var Firebase = require('firebase');

const FIREBASE_URL = 'https://finext.firebaseio.com/';

// var finext = new Firebase('http://finext.firebaseio.com/');


io.on('connection', function(socket) {

	console.log("Socket connected");

	socket.on('BeginSolve', function(uid) {

		console.log("server evented: " + uid.id);

		// Get the data from Firebase using the Firebase REST API here
		g_uid = uid.id;

		request.get(FIREBASE_URL + '/models/' + uid.id + '.json', function optionalCallback (err, httpResponse, body) {

			if (err) {
				return console.error('query to FB failed', err);
			}
			console.log('Firebase responded with:', body);

			var body = JSON.parse(body);

			// Validation of data
			// TODO update the validation logic to ensure JS solvability

			if(body.length < 0) {
				console.log("Length out of range");
			}

			if(body.breadth < 0) {
				console.log("Breadth out of range");
			}

			if(body.thickness < 0) {
				console.log("Thickness out of range");
			}

			if(body.divx < 0) {
				console.log("Divisions in X out of range");
			}

			if(body.divy < 0) {
				console.log("Divisions in Y out of range");
			}


			var delta_n = plate_analyser(body.length, body.breadth, body.thickness, body.divx, body.divy, body.elementTypeSelected.value, body.endTypeSelected.value, body.loadData.loadTypeSelected.value, body.loadData.loadValue);

			var modelRef = new Firebase( FIREBASE_URL + '/models/');
			var resultRef = modelRef.child(g_uid).child("results");

			resultRef.set({displacements : delta_n});


			// Emit the event and send result data along

			socket.emit('ModelSolved', {resultSet: delta_n});

			console.log("Deltan: " + delta_n);
			console.log("Typeof deltan: " + typeof(delta_n));


			// TODO enable option to check the results against staad-pro

			// TODO calculate other quatities like moments and shear here and also send to firebase
			// request.post(FIREBASE_URL + '/models/' + uid.id + '/results/' );
		});


		//   Update the results to the Firebase

		//request.post(FIREBASE_URL + '/models/' + uid.id + '/results/' + )

	});
});

server.listen(3000);
