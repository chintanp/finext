
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/index')
  , users = require('./routes/users')
  , http = require('http')
  , path = require('path')
  , favicon = require('static-favicon')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser');

var app = express();

console.log("app.get('env'): " + app.get('env'));

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

// Development settings

if(app.get('env') === 'development'  || app.get('env') === 'development ') {
	console.log('In development'  + 'and _dirname = ' + __dirname);
	console.log('Process.env.PORT: ' + process.env.PORT )

	// app.use(express.static(path.join(__dirname, '/dist')));

	app.use(express.static(path.join(__dirname, '../client')));
	app.use(express.static(path.join(__dirname, '../client/.tmp')));
	//app.use(express.static(path.join(__dirname, '../client/bower_components')));
	app.use(express.static(path.join(__dirname, '../client/app')));

	// Error handling
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// Production settings

if(app.get('env') === 'production' || app.get('env') === 'production ') {
	app.use(express.static(path.join(__dirname, '/dist')));

	// Production error handler
	// no stacktrace leaked to the user

	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});
}

module.exports = app;
