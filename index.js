$(document).ready(function() {
  // Init
  $('.image-section').hide();
  $('.loader').hide();
  $('#result').hide();

  const webcamElement = document.getElementById('webcam');

  // Upload Preview
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
        $('#imagePreview').hide();
        $('#uploadedImage').hide();
        $('#imagePreview').fadeIn(650);
        img_url = e.target.result;
        //assingning the image to the DOM element 

        document.getElementById("uploadedImage").src = img_url;

      }
      reader.readAsDataURL(input.files[0]);
    }
  }
  $("#imageUpload").change(function() {
    $('.image-section').show();
    $('#btn-predict').show();
    $('#result').text('');
    $('#result').hide();

    readURL(this);
  });

  // Predict
  $('#btn-predict').click(function() {
    $('#result').show();


    // Make prediction by calling api /predict
    let net;


    async function app() {
      var form_data = new FormData($('#upload-file')[0]);
      let image = document.getElementById("uploadedImage");

      // Show loading animation
      $(this).hide();
      $('.loader').show();
      console.log('Loading mobilenet..');

      // Load the model.
      net = await mobilenet.load();
      console.log('Sucessfully loaded model');

      //Converting tnhe image to the tensorflow format
      let imgE1 = tf.browser.fromPixels(image).resizeNearestNeighbor([224, 224]).toFloat();


      // Make a prediction through the model on our image.

      var result = await net.classify(imgE1);

      console.log(result);

      //Assigning the result to the DOM element
      document.getElementById("resultText").innerHTML = result[0].className;
    }
    app();




  });

});
