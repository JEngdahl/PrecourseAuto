var data = require('./../data.js')
var utils = require('utils')
var http = require('http')
var fs = require('fs')
var tempData = data.map(function(e){return e});
var casper = require('casper').create({

  pageSettings: {

    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36"
  }
});

casper
.start()
.then(function(){
this.echo("start")
  this.each(tempData, function(self, item){
    this.echo(item)
    self.thenOpen('http://localhost:9000/'+item.Class+'/'+item.GithubName+'/javascript-koans/KoansRunner.html', function(){
      this.wait(1000, function() {
        var passedTests = this.evaluate(function(){
          return document.querySelector("body > div > div.progress > span:nth-child(1) > div > div > div.completion > div:nth-child(2) > span.value").textContent.split("/")[0];
        });
        item.Koans = passedTests || 0;
        this.echo('Koans: ' + item.FullName +", Passed = "+passedTests+"/55")
      }, function(){
        var passedTests = this.evaluate(function(){
          return document.querySelector("body > div > div.progress > span:nth-child(1) > div > div > div.completion > div:nth-child(2) > span.value").textContent.split("/")[0];
        });
        item.Koans = passedTests || 0;
        //this.echo('Koans: ' + item.FullName +", Passed = "+passedTests+"/55")
      })
    })
  })
})
.then(function(){
  var content = "module.exports = " + JSON.stringify(tempData)
  fs.writeFile('./../data.js',content,'w');
})

casper.run();
