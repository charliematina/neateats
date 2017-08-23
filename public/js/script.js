$(".listName").hover(function(){
		if($(this).hasClass("clicked")){
		} else{
			$(this).find(".navHoverBlock").css("width","15px");
		}
	}, function(){
			if($(this).hasClass("clicked")){
		} else{
			$(this).find(".navHoverBlock").css("width","0px");
		}
}).click(function(){
	$(".listName").removeClass('clicked').css("color","white").find(".navHoverBlock").css("width","0%");
	$(this).addClass('clicked').css("color","#db2940").find(".navHoverBlock").css("width","100%");
	openOverlay();
})

$("#closeButton").click(function(){
	closeOverlay();
})

function openOverlay(){
	$("#detailsOverlay").css({"height":"100%","padding-top":"80px"});
}

function closeOverlay(){
	$("#detailsOverlay").css({"height":"0%","padding-top":"0px"});
}

$("#backToTop").hover(function(){
		$(this).css("color","#db2940").find(".buttonHoverBlock").css("width","100%");
	}, function(){
		$(this).css("color","white").find(".buttonHoverBlock").css("width","0%");
})

$("#backToTop").click(function() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});