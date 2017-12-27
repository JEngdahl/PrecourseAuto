var casper = require('casper').create({
  pageSettings: {
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36"
  }
});

casper.on('remote.message', function(message) {
    this.echo(message);
});
casper.start('http://localhost:9000/ssp11-javascript-koans/KoansRunner.html');

casper.then(function() {
    this.echo('First Page: ' + this.getTitle());
    var passedTests = this.evaluate(function(){
        return document.querySelector("body > div > div.progress > span:nth-child(1) > div > div > div.completion > div:nth-child(2) > span.value").textContent;
    });
    this.echo(passedTests)
      casper.capture('screenshots/SS1.png');
});
casper.then(function() {
    this.thenOpen('http://localhost:9000/ssp11-testbuilder/index.html', function() {
        casper.capture('screenshots/SS2.png');
    });
});


casper.run();