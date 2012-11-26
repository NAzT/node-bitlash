//
// bitlash-web.js: bitlash web interface library for node.js
//
//	Copyright 2012 Bill Roy (MIT License, see LICENSE file)
//
//	In one terminal: 	
//		$ node bitlash-web.js
//	In another: 		
//		$ curl -X POST -H 'Content-Type:application/json' -d '{"cmd":"peep"}' localhost:3000/bitlash
//
var util = require('util');
var express = require('express');
var app = express();

app.configure(function () {
	app.use(express.logger());
	app.use(express.bodyParser());
});

app.get('/', function(req, res) { res.send('Authorized users only: POST bitlash commands to /bitlash\n');});

app.post('/bitlash', function(req, res) {
	console.log('Post:', typeof req.body, req.body, req.body.cmd);
	console.log('Command:', req.body.cmd);
	bitlash.exec(req.body.cmd, function(reply) {
		res.send(reply + '\n');
	});
});

var Bitlash = require('./lib/bitlash.js');
var bitlash = new Bitlash.Bitlash({}, function (readytext) {});

var webport = 3000;
app.listen(webport);
console.log('Listening on port', webport);