# bitlash-node - Control Bitlash-enabled Arduinos with Node.js

## Usage

### bitlash.init(options, [readycallback])

### bitlash.exec(command, [callback])

### bitlash.stop()

### bitlash.sendFile(filename)

If filename starts with http: or https: the contents of the url are sent to Bitlash.

## Examples

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
						run_blinky = true;
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
