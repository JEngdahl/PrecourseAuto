let express = require("express")
let app = express()
var mysql = require('mysql');
var bodyParser = require('body-parser');
var keys = require('./keys.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("./client"))

var db = mysql.createConnection(keys);

db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + db.threadId);
});

app.get('/',function(req,res){
  res.sendFile(__dirname+'/client/index.html')
})

app.post('/addclass',function(req,res){
  console.log(req.body)
  var r = req.body
  if(r.handles.length < 1){
    res.send("no data")
  }
  if(!r.class){
    res.send("no class field")
  }
  if(r.handles.length !== r.names.length){
    res.send("not the same length")
  }
  r.names.forEach(function(e,i){
    db.query("INSERT INTO precourse.Students (`FullName`,`GithubName`,`Class`) VALUES ('"+e+"','"+r.handles[i]+"','"+r.class+"');")
  })
})



app.listen(process.env.PORT || 1337)
