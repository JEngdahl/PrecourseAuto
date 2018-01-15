var fs = require('fs');
var path = __dirname + '/server/client/ClassContainer/'+process.argv[2]+'/'+process.argv[3]+'/testbuilder/'
fs.exists(path+"detectNetwork.test.js",function(exists){
  console.log(exists)
  var tests =  "\nlocalStorage.setItem('testing:1', 'true');\nlocalStorage.setItem('testing:2', 'true');\nlocalStorage.setItem('testing:3', 'true');\nlocalStorage.setItem('testing:4', 'true');";
  if(exists){
    fs.appendFile(path+"detectNetwork.test.js", tests)
  }
})
