jQuery(function() {
  jQuery('.error').hide();
  jQuery('.contactSuccessMessage').hide();
  jQuery(".contactButton").click(function() {
		// validate and process form
		// first hide any error messages
    jQuery('.error').hide();
		
	  var name = jQuery("input#contactName").val();
		if (name == "") {
      jQuery("span#nameError").fadeIn(500);
      jQuery("input#contactName").focus();
      return false;
    }
	  var email = jQuery("input#contactEmail").val();
	  if (email == "") {
      jQuery("span#emailError").fadeIn(500);
      jQuery("input#contactEmail").focus();
      return false;
    }
	
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	if(!emailReg.test(email)) {
	jQuery("span#emailError2").fadeIn(500);
    jQuery("input#contactEmail").focus();
      return false;
	}
	
	  var msg = jQuery("textarea#contactMessage").val();
	  if (msg == "") {
	  jQuery("span#messageError").fadeIn(500);
	  jQuery("textarea#contactMessage").focus();
	  return false;
    }
		
		var dataString = 'name='+ name + '&email=' + email + '&msg=' + msg;
		//alert (dataString);return false;
		
	  jQuery.ajax({
      type: "POST",
      url: "php/mail.php",
      data: dataString,
      success: function() {
       jQuery("#contactForm").hide();
	   jQuery(".contactSuccessMessage")
        .fadeIn(1500);
      }
     });
    return false;
	});
});

