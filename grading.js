var data = require('./data.js')
var utils = require('utils')
var http = require('http')
var fs = require('fs')
var tempData = data.map(function(e){return e});
var casper = require('casper').create({

  pageSettings: {

    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36"
  }
});

casper.on('remote.message', function(message) {
    this.echo(message);
});
casper
.start()
.then(function(){
this.echo("start")
  this.each(tempData, function(self, item){
	this.echo(item)
    if(item.Class === "SSP8"){
      item.Class = "SSP7"
    }
    self.thenOpen('http://localhost:9000/'+item.Class+'/'+item.GithubName+'/javascript-koans/KoansRunner.html', function(){
      var passedTests = this.evaluate(function(){
        return document.querySelector("body > div > div.progress > span:nth-child(1) > div > div > div.completion > div:nth-child(2) > span.value").textContent.split("/")[0];
      });
      item.Koans = passedTests || 0;
      this.echo('Koans: ' + item.FullName +", Passed = "+passedTests+"/55")
    })
  })
})
.then(function(){
  this.each(tempData, function(self, item){
    if(item.Class === "SSP8"){
      item.Class = "SSP7"
    }
   self.thenOpen('http://localhost:9000/'+item.Class+'/'+item.GithubName+'/underbar/SpecRunner.html', function(){
     self.waitForSelector('#mocha-report > li:nth-child(3) > ul > li:nth-child(8) > ul > li:nth-child(2) > h2', function() {
          var passed = self.evaluate(function(){
            return document.querySelector("#mocha-stats > li.passes > em").textContent
          })
          item.UnderbarOne = passedTests || 0;
          self.echo('Underbar 1 & 2: ' + item.FullName +", Passed = "+passedTests+"/141")
      },1000);
      // var passedTests = this.evaluate(function(){
      //   return document.querySelector("#mocha-stats > li.passes > em").textContent;
      // });
      // item.UnderbarOne = passedTests || 0;
      // this.echo('Underbar 1 & 2: ' + item.FullName +", Passed = "+passedTests+"/141")
    })
  })
})
.then(function(){
  this.each(tempData, function(self, item){
      self.thenOpen('http://localhost:9000/'+item.Class+'/'+item.GithubName+'/recursion/SpecRunner.html', function(){
        var passedTests = this.evaluate(function(){
          return document.querySelector("#mocha-stats > li.passes > em").textContent;
        });

        item.Recursion = passedTests;
        this.echo('Recursion: ' + item.FullName +", Passed = "+passedTests+"/4")
      })
  })
})
.then(function(){
  this.each(tempData, function(self, item){
      self.thenOpen('http://localhost:9000/'+item.Class+'/'+item.GithubName+'/testbuilder/index.html', function(){
        var passedTests = this.evaluate(function(){
          return document.querySelector("#mocha-stats > li.passes > em").textContent;
        });

        item.Testbuilder = passedTests;
        this.echo('Testbuilder: ' + item.FullName +", Passed = "+passedTests+"/4")
      })
  })
})
.then(function(){
  fs.write('./gradedata.js', JSON.stringify(data), 'w');
})

casper.run();
