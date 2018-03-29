const mocha = require('mocha');
const request = require('request');
const rp = require('request-promise');



function postingMochaReporter(runner) {
  mocha.reporters.Base.call(this, runner);
  let passes = 0;
  let failures = 0;

  runner.on('pass', function(test){
    passes++;
   //console.log('pass: %s', test.fullTitle());
  });

  runner.on('fail', function(test, err){
    failures++;
    //console.log('fail: %s -- error: %s', test.fullTitle(), err.message);
  });

  runner.on('end', function(){
    console.log('woot!: %d/%d', passes, passes + failures);
    //const total = passes + failures
    //const score = "" + passes + "/" + total;
    const repo = process.argv[process.argv.length -1];
    const github =  process.argv[process.argv.length -2];

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
    //     .then(function (parsedBody) {
    //         // POST succeeded...
    //         console.log('sending', options.body)
    //         console.log(parsedBody)
    //         process.exit(failures);

    //     })
    //     .catch(function (err) {
    //         console.log('lol you done failed', err)
    //         process.exit(failures);

    //     });

    } else {
        process.exit(failures);
    }

  });
}

module.exports = postingMochaReporter;
