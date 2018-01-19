let express = require("express")
let app = express()
var keys = require('./keys.js')
var mysql = require('mysql');
var compare = require('alphanumeric-sort').compare;
var bodyParser = require('body-parser');
app.use(express.static(__dirname+"/client/build"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var db = mysql.createConnection(keys);
var routes = require('./routes.js')(app,db,compare)

db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + db.threadId);
});

app.listen(process.env.PORT || 3000);
