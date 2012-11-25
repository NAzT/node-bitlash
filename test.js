var Bitlash = require('./bitlash');

var bitlash = new Bitlash.Bitlash({echo:true}, function (readytext) {
	console.log('Banner:', readytext);
	bitlash.exec('ls', function(reply) {
		console.log('Reply 1 from bitlash:', reply);

		bitlash.exec('print millis', function(reply2) {
			console.log('Reply 2 from bitlash:', reply2);

			bitlash.exec('peep', function(reply3) {
				console.log('Reply 3 from bitlash:', reply3);
			});
		});
	});
});
