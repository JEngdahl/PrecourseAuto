var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://localhost:1337/addclass",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
  },
  "processData": false,
  "data": ''
}

$( document ).ready(function() {
    console.log( "ready!" );
    $("#send").on("click",function(){
      var ddata = {};
      var inClass = document.getElementById('class').value;
      var names = document.getElementById('names').value.split('\n');
      var githubs = document.getElementById('githubs').value.split('\n');
      ddata.names = names
      ddata.handles = githubs
      ddata.class = inClass
      settings.data = JSON.stringify(ddata)
      console.log(settings.data)
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
    })
});