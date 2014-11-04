
//..

var server = http.createServer(app);
var io = require('socket.io').listen(server);
var Firebase = require('firebase');

io.on('connection', function(socket) {

	console.log("Socket connected");

	socket.on('BeginSolve', function(uid) {

		console.log("server evented: " + uid.id);

		// ...
	});
});