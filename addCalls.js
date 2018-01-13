var fs = require('fs');
var path = __dirname + '/server/client/ClassContainer/'+process.argv[2]+'/'+process.argv[3]+'/testbuilder/'
fs.exists(path+"detectNetwork.test.js",function(exists){
  console.log(exists)
  var tests =  "\nsetTimeout(function(){\ndetectNetwork('38345678901234')\ndetectNetwork('39345678901234')\ndetectNetwork('343456789012345')\ndetectNetwork('373456789012345')\ndetectNetwork('4234567890123')\ndetectNetwork('4234567890123456')\ndetectNetwork('4234567890123456789')\ndetectNetwork('5134567890123456')\ndetectNetwork('5234567890123456')\ndetectNetwork('5334567890123456')\ndetectNetwork('5434567890123456')\ndetectNetwork('5534567890123456')\nnextStep()\nnextStep()\nnextStep()\nnextStep()\nnextStep()\n},1000)";
  if(exists){
    fs.appendFile(path+"detectNetwork.test.js", tests)
  }
})
