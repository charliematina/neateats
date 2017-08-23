// Global Variables
var map;

// Calling Functions
initialiseMap();

$.ajax({
       url: "http://localhost:3000/students",
       contentType: "application/json",
       dataType: "json",
       success: function(data){
       	for (var i = 0; i < data.length; i++) {
       		var studentName = data[i].name;

       		$("#nameList").append("<li class='listName'><div class='navHoverBlock'></div>"+studentName+"</li>")
       	}
       },
       error: function(){
            console.log("Error");
       }
});




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
	$("#studentNames").fadeOut();
	$("#studentChoices").fadeIn();
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

function initialiseMap(){
	// Setting the position of the map as well as the default interactivity
	var defaultOptions = {
		// Map center position is a view of New Zealand
		center: {
			lat:-41.2161503,
			lng:174.8168895
		},
		zoom:11,
		disableDefaultUI:true,
		scrollwheel:true,
		draggable:true,
		fullScreenControl:true,
		keybosrdShortcuts:false,
		mapTypeControlOptions: {
			position:google.maps.ControlPosition.TOP_CENTER
		},
		styles:[
				    {
				        "featureType": "all",
				        "elementType": "labels.text.fill",
				        "stylers": [
				            {
				                "color": "#ffffff"
				            }
				        ]
				    },
				    {
				        "featureType": "all",
				        "elementType": "labels.text.stroke",
				        "stylers": [
				            {
				                "visibility": "off"
				            }
				        ]
				    },
				    {
				        "featureType": "all",
				        "elementType": "labels.icon",
				        "stylers": [
				            {
				                "visibility": "off"
				            }
				        ]
				    },
				    {
				        "featureType": "administrative",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "color": "#c9323b"
				            }
				        ]
				    },
				    {
				        "featureType": "administrative",
				        "elementType": "geometry.stroke",
				        "stylers": [
				            {
				                "color": "#c9323b"
				            },
				            {
				                "weight": 1.2
				            }
				        ]
				    },
				    {
				        "featureType": "administrative.locality",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "lightness": "-1"
				            }
				        ]
				    },
				    {
				        "featureType": "administrative.neighborhood",
				        "elementType": "labels.text.fill",
				        "stylers": [
				            {
				                "lightness": "0"
				            },
				            {
				                "saturation": "0"
				            }
				        ]
				    },
				    {
				        "featureType": "administrative.neighborhood",
				        "elementType": "labels.text.stroke",
				        "stylers": [
				            {
				                "weight": "0.01"
				            }
				        ]
				    },
				    {
				        "featureType": "administrative.land_parcel",
				        "elementType": "labels.text.stroke",
				        "stylers": [
				            {
				                "weight": "0.01"
				            }
				        ]
				    },
				    {
				        "featureType": "landscape",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "color": "#c9323b"
				            }
				        ]
				    },
				    {
				        "featureType": "poi",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "color": "#99282f"
				            }
				        ]
				    },
				    {
				        "featureType": "road",
				        "elementType": "geometry.stroke",
				        "stylers": [
				            {
				                "visibility": "off"
				            }
				        ]
				    },
				    {
				        "featureType": "road.highway",
				        "elementType": "geometry.fill",
				        "stylers": [
				            {
				                "color": "#99282f"
				            }
				        ]
				    },
				    {
				        "featureType": "road.highway.controlled_access",
				        "elementType": "geometry.stroke",
				        "stylers": [
				            {
				                "color": "#99282f"
				            }
				        ]
				    },
				    {
				        "featureType": "road.arterial",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "color": "#99282f"
				            }
				        ]
				    },
				    {
				        "featureType": "road.local",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "color": "#99282f"
				            }
				        ]
				    },
				    {
				        "featureType": "transit",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "color": "#99282f"
				            }
				        ]
				    },
				    {
				        "featureType": "water",
				        "elementType": "geometry",
				        "stylers": [
				            {
				                "color": "#090228"
				            }
				        ]
				    }
				]
	};

	// Creating a new instance of map, locating the users position, run the map anf then show all the attractions.
	map = new google.maps.Map(document.getElementById("map"), defaultOptions);
	
	// This event listener calls addMarker() once the map is clicked.
    // google.maps.event.addListener(map, 'click', function(event) {
    //   addMarker(event.latLng, map);
    // });
}