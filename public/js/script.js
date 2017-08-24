// Global Variables
var map;
var pageId;
var placeName;
var placeAbout;
var placeStreet;
var placeCity;
var placeImage;
var lat;
var long;
var price;
var placePhone;
var placeWebsite;
var placePrice;
var studentName;
var studentData;
var choiceId1;
var choiceId2;
var choiceId3;
var choice1;
var choice2;
var choice3;
var gender;
var fbToken;
// Calling Functions
initialiseMap();
getStudentData();
var map, popupbox;
function getStudentData(){
    $.ajax({
       url: "http://localhost:3000/students",
       contentType: "application/json",
       dataType: "json",
       success: function(data){
        for (var i = 0; i < data.length; i++) {
            studentData = data;
            studentName = data[i].name;
            studentName = data[i].name;
            choiceId1 = data[i].choice1.id;
            choiceId2 = data[i].choice2.id;
            choiceId3 = data[i].choice3.id;
            choice1 = data[i].choice1.name;
            choice2 = data[i].choice2.name;
            choice3 = data[i].choice3.name;
            $("#nameList").append("<li class='listName navName'><div class='navHoverBlock'></div><span class='navNameContainer'>"+studentName+"<span></li>");
        }
       },
       error: function(){
            console.log("Error");
       }
    });
}
$(document).on('mouseover', '.navName', function(){
    if($(this).hasClass("clicked")){
        } else{
            $(this).find(".navHoverBlock").css("width","15px");
        }
}).on('mouseout', '.navName', function(){
    if($(this).hasClass("clicked")){
        } else{
            $(this).find(".navHoverBlock").css("width","0px");
        }
}).on('click', '.navName', function(){
    studentName = $(this).text();
    for (var i = 0; i < studentData.length; i++) {
        if(studentData[i].name == $(this).text()){
            choiceId1 = studentData[i].choice1.id;
            choiceId2 = studentData[i].choice2.id;
            choiceId3 = studentData[i].choice3.id;
            choice1 = studentData[i].choice1.name;
            choice2 = studentData[i].choice2.name;
            choice3 = studentData[i].choice3.name;
            if(studentData[i].gender == "female"){
                gender = "img/female.png";
            } else{
                gender = "img/male.png";  
            }
        }
    };
    $(".navName").removeClass('clicked').css("color","white").find(".navHoverBlock").css("width","0%");
    // $(this).addClass('clicked').css("color","#db2940").find(".navHoverBlock").css("width","100%");
    $("#goBackButton").fadeIn(400);
    $("#studentChoices").fadeIn(400);
    $("#studentNames").hide();
    $("#backToTop").hide();
    $("#studentImage").attr('src', gender);
    $("#placesList").empty().append(
        "<li class='listName studentChoice' data-type='"+choiceId1+"'><div class='navHoverBlock'></div><span class='navNameContainer'>"+choice1+"<span></li>"
        +"<li class='listName studentChoice' data-type='"+choiceId2+"'><div class='navHoverBlock'></div><span class='navNameContainer'>"+choice2+"<span></li>"
        +"<li class='listName studentChoice' data-type='"+choiceId3+"'><div class='navHoverBlock'></div><span class='navNameContainer'>"+choice3+"<span></li>"
        );
    $("#studentName").empty().append("<h2>"+studentName+"'s TOP 3</h2>");
});
$(document).on('mouseover', '.studentChoice', function(){
    if($(this).hasClass("clicked")){
    } else{
        $(this).find(".navHoverBlock").css("width","15px");
    }
}).on('mouseout', '.studentChoice', function(){
    if($(this).hasClass("clicked")){
        } else{
            $(this).find(".navHoverBlock").css("width","0px");
        }
}).on('click', '.studentChoice', function(){
    placeId = $(this).attr('data-type');
    if(placeId == false){
        console.log("NO");
    }
    getFbData(placeId);
    $(".studentChoice").removeClass('clicked').css("color","white").find(".navHoverBlock").css("width","0%");
    $(this).addClass('clicked').css("color","#db2940").find(".navHoverBlock").css("width","100%");
    openOverlay();
});
$("#closeButton").click(function(){
    closeOverlay();
})
function openOverlay(){
    $("#detailsOverlay").css({"height":"100%","padding-top":"80px"});
}
function closeOverlay(){
    $("#detailsOverlay").css({"height":"0%","padding-top":"0px"});
    $(".studentChoice").removeClass('clicked').css("color","white").find(".navHoverBlock").css("width","0%");
}
function buttonHover(buttonId){
    $(buttonId).hover(function(){
        $(this).css("color","#db2940").find(".buttonHoverBlock").css("width","100%");
    }, function(){
        $(this).css("color","white").find(".buttonHoverBlock").css("width","0%");
    })
}
buttonHover("#backToTop");
buttonHover("#goBackButton");
$("#backToTop").click(function() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});
$("#goBackButton").hide().click(function() {
    closeOverlay();
    $(this).hide();
    $("#studentChoices").hide();
    $("#studentNames").fadeIn(500);
    $("#backToTop").fadeIn(500);
    $("#details").delay(500).queue(function(next){
        $(this).empty();
    });
    $(this).removeClass('clicked').css("color","white").find(".navHoverBlock").css("width","0%"); 
});
function getFbData(locationId){
    $.ajax({
       url: "https://graph.facebook.com/v2.10/"+locationId+"?fields=name%2Cabout%2Cprice_range%2Clocation%2Cid%2Coverall_star_rating%2Chours%2Cpicture%7Burl%7D%2Cphone%2Cwebsite&access_token="+fbToken,
       contentType: "application/json",
       dataType: "jsonp",
       success: function(fbData){
        console.log(fbData);
            placeName = fbData.name;
            placeCity = fbData.location.city;
            placeStreet = fbData.location.street;
            placeLat = fbData.location.latitude;
            placeLong = fbData.location.longitude;
            placeRating = fbData.overall_star_rating;
            placeHours = fbData.hours;
            placeImage = fbData.picture.data.url;
            placeAbout = fbData.about;
            placePhone = fbData.phone;
            placeWebsite = fbData.website;
            placePrice = fbData.price_range;
            $("#details").empty().append(
                // "<div id='closeButtonContainer'><img id='closeButton' src='img/cross.png'></div>"+
                "<div id='placeImage'><img src='"+placeImage+"'></div>"+
                "<div id='placeName'>"+placeName+"</div>"+
                "<div id='placeAbout'>"+placeAbout+"</div>"+
                "<div id='placeAddress'>"+placeStreet+"<br>"+placeCity+"</div>"+
                "<div id='placePhone'>PHONE<br>"+placePhone+"</div>"+
                "<div id='placeRating'><div class='detailLabel'>RATING</div>"+placeRating+"</div>"+
                "<div id='placeWebsite'><a target='_blank' href='"+placeWebsite+"'>"+placeWebsite+"</a></div>"
            );
            if(placeName.length > 15 ){
                // $("#placeName").css('font-size','2em');
                $("#placeName").addClass('largeName');
            };
       },
       error: function(){
            console.log("Error");
       }
    });
}
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
    
    injectMarkers();
    
    // This event listener calls addMarker() once the map is clicked.
    // google.maps.event.addListener(map, 'click', function(event) {
    //   addMarker(event.latLng, map);
    // });
}
// Showing all markers using ajax and external json files
// function addMarkers(choiceLat, choiceLong){
//  injectMarkers(choiceLat, choiceLong);
var everyonesMarkers = [];
function injectMarkers(){
    $.ajax({
        url: "http://localhost:3000/students",
        beforeSend: function(xhr){
            if(xhr.overrideMimeType){
                xhr.overrideMimeType("application/json");
            }
        },
        contentType: "application/json",
        dataType: "json",
        success: function(Data){
            for (var i = 0; i < Data.length; i++) {
                var person = Data[i];   
                everyonesMarkers.push({
                    lat: person.choice1.lat,
                    lng: person.choice1.long,
                    id: person.choice1.id,
                });

                everyonesMarkers.push({
                    lat: person.choice2.lat,
                    lng: person.choice2.long,
                    id: person.choice2.id,
                });

                everyonesMarkers.push({
                    lat: person.choice3.lat,
                    lng: person.choice3.long,
                    id: person.choice3.id,
                });
                
                var marker = new google.maps.Marker({
                    position: {
                        lat: everyonesMarkers[i].lat,
                        lng: everyonesMarkers[i].lng
                    },
                    map: map,
                    animation:google.maps.Animation.DROP,
                    i: i
                });

                // Adding event listener to function, allowing the user to toggle the infobox in the Google Map
                setMarkerInfo(marker);
            }
            console.log(everyonesMarkers);
        },  
        error: function(){
            console.log("Error, server not responding");
        }
    });
}
// }
// addMarkers(choice1, choice1);
// addMarkers(choice1, choice1);
// Setting information about marker
function setMarkerInfo(marker){
    if(popupbox){
        popupbox.close();
    }

    console.log(marker);
    google.maps.event.addListener(marker, "click", function(){
	    placeId = everyonesMarkers[marker.i].id;
    	getFbData(placeId);
        openOverlay();
    });
    return;
}