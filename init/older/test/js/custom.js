// Superfish Menu


jQuery(document).ready(function(){	
	jQuery('#slider .images')
	jQuery(window).load(function () {
	
			jQuery('#slider-wrapper .loading').removeClass('loading');
			jQuery('#slider').css('display','block');
			jQuery('#slider .images').animate({'opacity':1},300);

		})
});

/*browserfix*/

jQuery(document).ready(function(){
if(jQuery.browser.opera)
	jQuery('.homeRacent .category a, .blogpostcategory .meta .category a, .item4 h4 a,.blogpost .author a,#portitems2 .category a,.blogpost .posted-date a,.blogpost .tags a,.portcategories a').css('line-height','1px');

});
	

jQuery(document).ready(function(){
	jQuery('ul.menu > li').hover(function(){
		jQuery(this).find('ul').stop(true,true).fadeIn(300);

	},
	  function () {
		jQuery(this).find('ul').stop(true,true).fadeOut(300);
	  });
	
});

jQuery(document).ready(function(){
jQuery(".gallery a").attr("rel", "lightbox[gallery]");

});

/*to top*/

jQuery(document).ready(function($){
	$(".totop ").hide();

});

jQuery(window).bind('scroll', function(){
if(jQuery(this).scrollTop() > 200) 
 jQuery(".totop ").fadeIn(200);
else
 jQuery(".totop ").fadeOut(200);
 
if(jQuery(this).scrollTop() > 5) 
 jQuery("#headerwrap").addClass('headerwrapdown');
else
 jQuery("#headerwrap").removeClass('headerwrapdown');

});


jQuery(document).ready(function(){
	jQuery(function() {
		jQuery( ".accordion" ).accordion({
			autoHeight: false,
			navigation: true
		});
	});
	jQuery(function() {
		jQuery( ".progressbar" ).progressbar();
	});

});
function loadprety(){

jQuery(".gallery a").attr("rel", "lightbox[gallery]").prettyPhoto({theme:'light_rounded',overlay_gallery: false,show_title: false});
}
				


jQuery(document).ready(function(){	
	jQuery('.image').find('.loading').attr('class', '');
});



jQuery(document).ready(function(){	
	jQuery('.blogpostcategory').each(function(index,el){
			  
		   //find this link's child image element
		  var iframe = jQuery(this).find('iframe');
		  var loading = jQuery(this).children('div');
		  //hide the image and attach the load event handler
		  jQuery(iframe).hide();
		  jQuery(window).load(function () {
			   
				//remove the link's "loading" classname
				loading.removeClass('loading');
				
				//show the loaded image
			   jQuery(iframe).fadeIn();
		  })
	});
});



			
jQuery(document).ready(function() {	

	jQuery(".toggle_container").hide(); 

	jQuery("h2.trigger").click(function(){
		jQuery(this).toggleClass("active").next().slideToggle("slow");
	});
});	

jQuery(document).ready(function(){	
	jQuery(function() {
	jQuery(".tabs").tabs(".panes > div");
	});
	
	
});


jQuery(document).ready(function(){	
	jQuery('.gototop').click(function() {
		jQuery('html, body').animate({scrollTop:0}, 'medium');
	});
});



jQuery(document).ready(function(){	
	jQuery('#remove h2 a:first-child').attr('class','catlink catlinkhover');
	jQuery('.catlink').click(function() {
		jQuery('#remove h2 a').attr('class','catlink');
		jQuery(this).attr('class','catlink catlinkhover');
	});	
});



jQuery(function(){
    jQuery("ul#ticker01").liScroll();
});




	
