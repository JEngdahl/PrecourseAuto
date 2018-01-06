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
   $("#classList") 
  })
}); 
 console.log("yas")
})
