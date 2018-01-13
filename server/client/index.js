console.log("hello")
$("document").ready(function(){
 var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://34.207.251.58:3000/api/classlist",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
  var splitResponse = response.split(" ");
  splitResponse = splitResponse.sort();

  splitResponse.forEach(function(e){
   $("#listCohorts").append("<li>"+e+"</li>")
  })
});
 console.log("yas")
})

$(document).on('click','#listCohorts li',function(){
  $("#cContainer").text("")
  var clicked = this.innerText
  var settings = {
   "async": true,
   "crossDomain": true,
   "url": "http://34.207.251.58:3000/api/class?c="+clicked,
   "method": "GET",
   "headers": {
     "Content-Type": "application/json",
   }
  }
  $.ajax(settings).done(function(r){
    console.log(r)
    r.sort(function(a,b){
      if(a.UnderbarOne > b.UnderbarOne){
        return -1
      }
      if(a.UnderbarOne < b.UnderbarOne){
        return 1
      }
      return 0
    })
    r.forEach(function(el){
      $("#cContainer").append("<li>"+el.FullName+" <a href='http://34.207.251.58:9000/"+el.Class+"/"+el.GithubName+"/javascript-koans/KoansRunner.html'>Koans</a>:<div class='"+el.KoansColor+"'>"+el.Koans+"</div> Recursion:<div class='"+el.RecursionColor+"'>"+el.Recursion+"</div> Underbar:<div class='"+el.UnderbarColor+"'>"+el.UnderbarOne+"</div></li>")
    })
  })
})
