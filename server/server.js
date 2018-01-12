let express = require("express")
let app = express()
var keys = require('./keys.js')
var mysql = require('mysql');
var bodyParser = require('body-parser');
var levelBack = __dirname.split("/")
levelBack[levelBack.length-1] = ''
levelBack = levelBack.join("/")
app.use(express.static(__dirname+"/client"));
app.use(express.static(__dirname+"ClassContainer"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var db = mysql.createConnection(keys);
var routes = require('./routes.js')(app,db,levelBack)

db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + db.threadId);
});

app.listen(process.env.PORT || 3000);
