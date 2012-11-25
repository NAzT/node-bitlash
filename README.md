# bitlash-node - Control Bitlash-enabled Arduinos with Node.js

This is a node.js library that enables PC control of a USB-connected Arduino running Bitlash.  You can execute Bitlash commands, files of Bitlash commands, or a url whose contents contain Bitlash commands; bitlash-node returns the resulting bitlash output to your node.js code.


## Requirements

- You need Bitlash on the Arduino.  For more information on bitlash see http://bitlash.net

- You need node.js.  See http://nodejs.org

## Installation

	$ git clone http://github.com/billroy/bitlash-node
	$ cd bitlash-node

For a quick test, plug in your Arduino and run:

	$ node test.js

## Usage

### bitlash.init(options, [readycallback])

Call this once to open the serial connection to Bitlash.  The readycallback function will be called once Bitlash is ready to accept commands.

Options:

- baud
- port

- debug
- echo
- prompt

	bitlash.init({baud:9600}, function(readytext) {
		console.log(readytext);
	});

### bitlash.exec(command, [callback])

Execute the given Bitlash command on the Arduino and call the callback function with the resulting Bitlash output.

	bitlash.exec('print millis', function(reply) {
		console.log('millis:', reply);
	});


### bitlash.stop()

Sends ^C to Bitlash to stop any looping functions.

	bitlash.stop();

### bitlash.sendFile(filename)

If filename starts with http: or https: the contents of the url are sent to Bitlash.

	bitlash.sendFile('testfile');

## Sample Code

	var Bitlash = require('./bitlash');
	var run_blinky = false;
	
	var bitlash = new Bitlash.Bitlash({}, function (readytext) {
		console.log('Banner:', readytext);
	
		bitlash.exec('ls', function(reply) {
			console.log('Reply 1 from bitlash:', reply);
	
			bitlash.exec('print millis', function(reply2) {
				console.log('Reply 2 from bitlash:', reply2);
	
				bitlash.exec('peep', function(reply3) {
					console.log('Reply 3 from bitlash:', reply3);
	
					bitlash.sendFile('testfile', function (reply4) {
						console.log('Reply 4 from bitlash:', reply4);
					});
				});
			});
		});
	});
	
	setInterval(function() {
		if (!run_blinky) return;
		bitlash.exec('d13=!d13', function(reply) {
			//console.log(reply);
		});
	}, 125);


## BUGS

- BUG: need a way to catch and handle bitlash exceptions

- move to EventEmitter model

- test http: file source
 
- test bitlash.stop
