module.exports = function(app,db,lb) {


  app.get('/',function(req,res){
    res.sendFile(__dirname+'/client/index.html')
  })

  app.get('/repo',function(req,res){
    //http://localhost:3000/repo?class=SSP7&user=cmourani&repo=recursion
    var r = req.query
    if (r.repo === "rc"){
      res.sendFile(lb+'/ClassContainer/'+r.class+'/'+r.user+'/recursion/SpecRunner.html')
    }
    if (r.repo === "ko"){
      res.sendFile(lb+'/ClassContainer/'+r.class+'/'+r.user+'/javascript-koans/KoansRunner.html')
    }
    // if (r.repo === tw){
    //   res.sendFile(lb+'/ClassContainer/'+r.class+'/'+r.user+'/'+twittler+'/src/test.html')
    // }
    if (r.repo === "tb"){
      res.sendFile(lb+'/ClassContainer/'+r.class+'/'+r.user+'/testbuilder/index.html')
    }
    if (r.repo === "ub"){
      res.sendFile(lb+'/ClassContainer/'+r.class+'/'+r.user+'/underbar/SpecRunner.html')
    }
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
          res.send(resp.map(function(el){
            if(el.Koans > 50){
              el.KoansColor = "green"
            }else if(el.Koans < 25){
              el.KoansColor = "red"
            }else{
              el.KoansColor = "yellow"
            }

            if(el.UnderbarOne > 120){
              el.UnderbarColor = "green"
            }else if(el.UnderbarOne < 60){
              el.UnderbarColor = "red"
            }else{
              el.UnderbarColor = "yellow"
            }

            if(el.Recursion >= 2){
              el.RecursionColor = "green"
            }else if(el.Recursion <= 1){
              el.RecursionColor = "red"
            }else{
              el.RecursionColor = "yellow"
            }

            return el
          }));
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
