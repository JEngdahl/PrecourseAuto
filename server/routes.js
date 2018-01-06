module.exports = function(app,db) {


  app.get('/',function(req,res){
    res.sendFile(__dirname+'/client/index.html')
  })


  app.get('/api/classlist', function(req, res){
    db.query("SELECT DISTINCT class FROM precourse.Students;",function(err,resp){
      if(err){
        res.send(err)
      }
      res.send(resp.map(e=>e.class).join(" "))
    })
  })


  app.get('/api/bashclassnames', function(req, res){
    db.query("SELECT DISTINCT GithubName FROM precourse.Students WHERE class='"+req.query.c+"';",function(err,resp){
      console.log(resp)
      if(err){
        res.send(err)
      }
      res.send(resp.map(e=>e.GithubName).join(" "))
    })
  })


  app.get('/api/class', function(req, res){
    console.log(req.query.c)
    if(req.query.c === "all"){
      db.query("SELECT * FROM precourse.Students;",function(err,resp){
        if(err){
          res.send(err)
        }
        console.log(resp)
        res.send(resp)
      })
    } else {
      db.query("SELECT * FROM precourse.Students WHERE class='"+req.query.c+"';",function(err,resp){
        if(err){
          res.send(err)
        }
        res.send(resp)
      })
    }
  })


  app.post('/api/addclass',function(req, res){
    //console.log(req.body)
    var r = req.body
    r.names.forEach(function(e,i){
      console.log(e)
      db
      .query("INSERT INTO precourse.Students (`FullName`,`GithubName`,`Class`) VALUES ('"+e+"','"+r.handles[i]+"','"+r.class+"');",function(){
        if(i === r.names.length - 1){
	  res.send("done")
	}
      })
	
       })
  })

  app.post('/api/updatebyhandle', function(req, res){
    var r = JSON.parse(req.body.data);
    r.forEach(function(e,i){
      //"id":2,"FullName":"Aaron Valdez","GithubName":"A-A-RonV","Class":"SSP8","UnderbarOne":"100","UnderbarTwo":null,"Testbuilder":null,"Koans":"54","Recursion":null
      db.query("UPDATE precourse.Students SET Koans = "+e.Koans+", UnderbarOne = "+e.UnderbarOne+", Recursion = "+e.Recursion+" WHERE id ="+e.id+";",function(err){
        if(err){
          console.log(err)
        } else {
          console.log(i+1 + " of " + r.length)
        }
      });

    })
    res.send("all good")
    })
}
