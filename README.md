# bitlash-node - Control Bitlash-enabled Arduinos with Node.js

This is a node.js library that enables PC control of a USB-connected Arduino running Bitlash.  Bitlash is an interpreter that runs on the Arduino and executes commands sent over the serial port.  More on Bitlash at http://bitlash.net

You can execute Bitlash commands, files of Bitlash commands, or a url whose contents contain Bitlash commands; bitlash-node returns the resulting bitlash output to your node.js code.

It's also easy to use bitlash-node without Bitlash with some small tweaks to your Arduino C program.  See the section below for details.

## Requirements

- You need Bitlash on the Arduino.  For more information on bitlash see http://bitlash.net

- You need node.js.  See http://nodejs.org

## Installation

	$ git clone http://github.com/billroy/bitlash-node
	$ cd bitlash-node

For a quick test, plug in your Arduino and run:

	$ node test.js

## Usage

### bitlash.init(options [, function(banner) {...}]);

Call this once to open the serial connection to Bitlash.  The readycallback function will be called once Bitlash is ready to accept commands.  It is passed the text of the signon banner.

	bitlash.init({baud:9600}, function(readytext) {
		console.log(readytext);
	});

Options:

- port: serial port
- baud: serial port baud rate (57600)
- debug: true for debug spew
- echo: echo serial port to terminal


### bitlash.exec(command [, function(reply) {}]);

Execute the given Bitlash command on the Arduino and call the callback function with the resulting Bitlash output as its first and only argument.

	bitlash.exec('print millis', function(reply) {
		console.log('millis:', reply);
	});


### bitlash.stop();

Sends ^C to Bitlash to stop any looping functions.

	bitlash.stop();

### bitlash.sendFile(filename [, function(bigreply) {}]);

Sends a file of commands to Bitlash, one line at a time.  Accumulates the output of all the commands and passes it to the (optional) callback function when complete.

If filename starts with http: or https: the contents of the url are sent to Bitlash.

	bitlash.sendFile('testfile', function(reply) {
		console.log('and the output was:', reply);
	});

## Sample Node.js program

(See the file test.js in the distribution.)

	var Bitlash = require('./lib/bitlash.js');
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


## Example: bitlash-tcp.js

See this example for a simple use of the bitlash library to expose a usb-connected bitlash over tcp.

## Using bitlash-node without Bitlash

It's easy to use bitlash-node with your own Arduino C program.  Instead of Bitlash commands, send the commands your program expects.  Bitlash expects commands to end with a newline character ('\n'), so make sure your program expects the same.

One change you need to make is to send the standard Bitlash prompt string at the end of your command's output.  The standard prompt is "\n> ", or three characters, the newline '\n', the greater-than '>', and a blank ' '.  This allows bitlash-node to understand when your command's execution and output are complete.




## BUGS

- BUG: catch and handle bitlash exceptions

- move to EventEmitter model

- test bitlash.stop
