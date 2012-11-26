//
// bitlash-tcp.js: bitlash interface library for node.js
//
//	Copyright 2012 Bill Roy (MIT License, see LICENSE file)
//
var net = require('net');
var Bitlash = require('./lib/bitlash.js');

var bitlash = new Bitlash.Bitlash({}, function (readytext) {
	console.log(readytext);
	var server = net.createServer(function(connection) {
		connection.on('data', function(data) {
			console.log(data.toString());
			bitlash.exec(data.toString() + '\n', function(reply) {
				reply += '\n';
				connection.write(reply);
				console.log(reply);
			});
		});
	});
	var port = 3000;
	server.listen(port);
	console.log('Listening on port:', port);
});
