const post = require('./scorePoster')
const fs = require('fs');


function loggingJasmineReporter() {
	
	var passed = 0;
	var total = 0


	this.specDone = function (spec) {
		if (spec.status === 'passed') {
			passed++;
		}
		total++;

	};

	this.jasmineDone = async function (suitInfo, done) {
		location = process.argv[process.argv.length - 3];
		location = location.slice(1);
		location += "/score.txt"
		console.log('location', location);
		console.log('woot passed', passed, "out of:", total)
		fs.appendFileSync(location, passed);
	};

	
};



module.exports = loggingJasmineReporter