var express = require('express');
var http = require('http');
var mongoose = require('mongoose');

var socket = require('./lib');
var routes = require('./routes');
var bodyParser = require('body-parser');

var fortune = require('./lib/fortune.js');
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});

var app = express();
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
//app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
//app.set('ipaddr', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1")
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



var server=http.Server(app);
var io = require('socket.io').listen(server);
server.listen(process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP);
socket(io);

routes(server,app,express);

