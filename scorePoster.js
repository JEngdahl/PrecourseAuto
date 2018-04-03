const request = require('request');
const rp = require('request-promise');


const syncRequest = require('sync-request');

function scorePoster(passes,  cb) {
	const repo = process.argv[process.argv.length - 1];
	const github = process.argv[process.argv.length - 2];

	const options = {
		method: 'POST',
		uri: 'http://35.173.188.239:3000/api/updateone',
		body: {
			score: passes,
			repo,
			github
		},
		json: true // Automatically stringifies the body to JSON
	};

	if (passes > 0) {
		console.log('yay', options.body)
		// rp(options)
		// 	.then(function (parsedBody) {
		// 		// POST succeeded...
		// 		console.log('sending', options.body)
		// 		console.log(parsedBody)

		// 	})
		// 	.catch(function (err) {
		// 		console.log('lol you done failed', err)
		// 		process.exit(failures);

        //     })
        //     .finally(function() {
        //         if (cb) {
        //             cb();
        //         }
		//     })
		// using syncRequest cause Jasmine broke asnyc reporters
		syncRequest('POST', 'http://35.173.188.239:3000/api/updateone', {json: options.body} )
		if (cb) {
			cb()
		}
		
	};
};

module.exports = scorePoster