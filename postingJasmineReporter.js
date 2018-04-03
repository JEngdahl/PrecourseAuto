const post = require('./scorePoster')


function postingJasmineReporter() {
	
	var passed = 0;
	var total = 0


	this.specDone = function (spec) {
		if (spec.status === 'passed') {
			passed++;
		}
		total++;

	};

	this.jasmineDone = async function (suitInfo, done) {
		console.log('woot passed', passed, "out of:", total)
		post(passed, done);
	};

	
};



module.exports = postingJasmineReporter