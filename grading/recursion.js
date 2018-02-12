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
  this.each(tempData, function(self, item){
      self.thenOpen('http://localhost:9000/'+item.Class+'/'+item.GithubName+'/recursion/SpecRunner.html', function(){
        var passedTests = this.evaluate(function(){
          return document.querySelector("#mocha-stats > li.passes > em").textContent;
        });

        item.Recursion = passedTests;
        this.echo('Recursion: ' + item.FullName +", Passed = "+passedTests+"/4")
      }, function(){
        var passedTests = this.evaluate(function(){
          return document.querySelector("#mocha-stats > li.passes > em").textContent;
        });

        item.Recursion = passedTests;
        this.echo('Recursion: ' + item.FullName +", Passed = "+passedTests+"/4")
      },3000)
  })
})
.then(function(){
  var content = "module.exports = " + JSON.stringify(tempData)
  fs.remove('data.js')
  this.echo("Deleted")
  fs.write('data.js',content,"w")
  this.echo("Created")
})

casper.run();
