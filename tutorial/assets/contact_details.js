$(document).ready(function(){

    $('form').on('submit', function(){
        // console.log('inside');
        var details = [$('form input')];
        var contact_details = {name: name.val(),email: email.val(),msg: message.val()};
  
        $.ajax({
          type: 'POST',
          url: '/contact',
          data: contact_details,
          success: function(data){
            //do something with the data via front-end framework
            // location.reload();
            // window.location = '/contact-success';
            alert('Thanks '+data.name+'for contacting');
          }
        });
  
        return false;
  
    });
  
  });