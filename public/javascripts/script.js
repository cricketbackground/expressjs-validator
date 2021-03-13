$('#upload_excel_button_id').click(function () {
  var file = document.getElementById("inputPostFile").files[0];
  var formData = new FormData();
  formData.append("orders_request", file);
  $.ajax({
    url: '/upload',
    type: 'POST',
    contentType: false,
    processData: false,
    data: formData,
    success: function (response) {
      console.log("Response from upload route", JSON.stringify(response));
    },
    error: function (e) {
      console.log("Upload failed", JSON.parse(e.responseText).message);
    }
  });
});


$('#signup-btn').click(function () {
  $.ajax({
    url: '/users',
    type: 'POST',
    cache: false,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    data: JSON.stringify({
      name: $('#name').val(),
      classYear: $('#classYear').val(),
      weekday: $('#weekday').val(),
      email: $('#email').val(),
      phoneNumber: $('#phoneNumber').val(),
      password: $('#password').val(),
      confirmPassword: $('#confirmPassword').val()
    }),
    success: function () {
      $('#error-group').css('display', 'none');
      alert('Your submission was successful');
    },
    error: function (data) {
      $('#error-group').css('display', 'block');
      var errors = JSON.parse(data.responseText);
      var errorsContainer = $('#errors');
      errorsContainer.innerHTML = '';
      var errorsList = '';

      for (var i = 0; i < errors.length; i++) {
        errorsList += '<li>' + errors[i].msg + '</li>';
      }
      errorsContainer.html(errorsList);
    }
  });
});
