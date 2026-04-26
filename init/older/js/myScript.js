// scroll back to top
var $ = jQuery.noConflict(); 

// cufon
Cufon.replace('h1, h2, h3, h4, h5, h6, label');
Cufon.replace('.pageTitle', {
				textShadow: '#fff 1px 1px'
			});
$(document).ready(function() {
						   
//bg switch
$('.bgSw').click(function(e){
            e.preventDefault();
		   $("body").css("background", "#f4f4f4 url('" + $(this).attr("href") + "')");
		   $(".websiteWrap").css({"box-shadow":"0px 0px 8px #aeaeae",
"-moz-box-shadow":"0px 0px 8px #aeaeae",
"-webkit-box-shadow": "0px 0px 8px #aeaeae"});
    });

$('.isDark').click(function(e){
            e.preventDefault();
			$("body").css("background", "#f4f4f4 url('" + $(this).attr("href") + "')");
		   $(".websiteWrap").css({"box-shadow":"0px 0px 8px #333",
"-moz-box-shadow":"0px 0px 8px #333",
"-webkit-box-shadow": "0px 0px 8px #333"});
    });

//various initial settings
$(".projectHover").css({"opacity":"0"});
$(".projectHover").css({"display":"block"});
$(".footerSocial").css({"opacity":"0.6"});
// search form
$(".searchField").focus(function() {   
    $(this).stop().animate({ 
                                 width: "162px"
                                 },500,"easeInOutQuint");

});

$(".searchField").blur(function(){
    $(this).stop().delay(800).animate({
                                 width: "122px"
                                 },500,"easeInOutQuint");
	
    });

// back to top btn
$('.backToTop').click(function(e){
            e.preventDefault();
            $('html, body').animate({scrollTop: 0}, 800, 'easeOutCubic');
			return false;
});

// categories menu
$(".mainMenu > li").hover(function() {   
    $(this).find("> a").stop(true, true).animate({ 
                                 lineHeight: "57px",
								 height: "57px",
								 paddingBottom:"8px"
                                 },200,"easeOutCubic");
	
	$(this).find("> ul").stop(true, true).animate({ 
								 height:"show"
                                 },200,"easeOutCubic");
},function(){
									   
    $(this).find("> a").stop(true, true).animate({ 
                                 lineHeight: "65px",
								 height: "65px",
								 paddingBottom:"0px"
                                 },200,"easeOutCubic");
	
	$(this).find("> ul").stop(true, true).animate({ 
								 height:"hide"
                                 },200,"easeOutCubic");

});

$(".mainMenu > li > ul > li ").hover(function() {   
    $(this).stop(true, true).animate({ 
								 paddingLeft:"5px"
                                 },100,"easeOutCubic");
},function(){
									   
    $(this).stop(true, true).animate({ 
								 paddingLeft:"0px"
                                 },100,"easeOutCubic");

});

// recent project hover
$(".projectHover").hover(function() {  
    $(this).stop().animate({ 
								 opacity: 0.5
                                 },150,"easeOutCubic");
},function(){								   
    $(this).stop().animate({ 
								 opacity:0
                                 },150,"easeOutCubic");

});
// posts widget avatar
$(".postsWidgetAvatar").hover(function() {   
    $(this).stop().animate({ 
								 opacity: 0.7
                                 },250,"easeOutCubic");
},function(){
									   
    $(this).stop().animate({ 
								 opacity:1
                                 },250,"easeOutCubic");

});
// post social icons
$(".socialIcon").hover(function() {   
    $(this).stop().animate({ 
								 opacity: 0.5
                                 },250,"easeOutCubic");
},function(){
									   
    $(this).stop().animate({ 
								 opacity:1
                                 },250,"easeOutCubic");

});
// footer social icons

$(".footerSocial").hover(function() {   
    $(this).stop().animate({ 
								 opacity: 1
                                 },150,"easeOutCubic");
},function(){
									   
    $(this).stop().animate({ 
								 opacity:0.6
                                 },150,"easeOutCubic");

});
//jquery tabs	
$(".pageNumbers > ul").tabs("ul.portfolioPagesWrap > li",{
			effect: 'fade',
			fadeSpeed: 300,
			initialIndex: 0,
			history:"false"
							});
$("ul.widgetTabs").tabs(".widgetTabsLists > li",{
		    effect: 'fade',
		    fadeSpeed: 300,
			history: false
							});

//slider 
 $('#nivoSlider').nivoSlider({
							  directionNavHide:false
	});
// colorbox - lightbox
$("a.recentProjectHover").colorbox();
$(".oneColumnItemImage").colorbox();
$(".twoColumnsItemImage").colorbox();
$(".threeColumnsItemImage").colorbox();
  }); //ducument ready ends