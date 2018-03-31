const mocha = require('mocha');
const post = require('./scorePoster')



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
    
    
    if (passes > 0) {
        post(passes, process.exit(failures))
    } else {
        process.exit(failures);
    }

  });
}

module.exports = postingMochaReporter;
