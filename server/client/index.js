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
    r.forEach(function(el){
      $("#cContainer").append("<li>"+el.FullName+" Koans:"+el.Koans+" Recursion:"+el.Recursion+" Underbar:"+el.UnderbarOne+"</li>")
    })
  })
})
