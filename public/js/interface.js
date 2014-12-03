function validLogin(){      
  var email=$('#email').val();
  var password=$('#password').val();
  $.ajax({
    type: "POST",
    url: "/sessions",
    data: {"email": email, "password": password},
    cache: false,
    success: function(result){
        if(result=='correct'){
          var page = $(location).attr('href');
          $("#popupLogin").fadeOut('slow', function() {
            $(document.body).load(page).fadeIn('slow');
          });
          init();         
        }else{
          console.log('fail');
            $("#loginerror").html('<p>' + result + '<p>');
            return false;
        }
    }
});
}

function init() {
  console.log('shit')
  var controller = new Controller();
  var socket = io.connect();
  controller.init(socket);
  socket.emit('start');
}

$(document).ready(function(){
});