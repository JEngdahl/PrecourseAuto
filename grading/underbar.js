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
   self.thenOpen('http://localhost:9000/'+item.Class+'/'+item.GithubName+'/underbar/SpecRunner.html', function(){
     self.waitForSelector('#mocha-report > li:nth-child(3) > ul > li:nth-child(8) > ul > li:nth-child(2) > h2', function() {
          var passedTests = self.evaluate(function(){
            return document.querySelector("#mocha-stats > li.passes > em").textContent
          })
          item.UnderbarOne = passedTests || 0;
          self.echo('Underbar 1 & 2: ' + item.FullName +", Passed = "+passedTests+"/141")
      },function(){
          var passedTests = self.evaluate(function(){
            return document.querySelector("#mocha-stats > li.passes > em").textContent
          })
          item.UnderbarOne = passedTests || 0;
          self.echo('Underbar 1 & 2: ' + item.FullName +", Passed = "+passedTests+"/141")
      }, 3000);
    })
  })
})
.then(function(){
  var content = JSON.stringify(tempData)
  fs.remove('data.js')
  this.echo("Deleted")
  fs.write('data.js',content,"w")
  this.echo("Created")
})

casper.run();
