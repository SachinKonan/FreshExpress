var map;

var marker;
var markerBus;

var lineCoordinatesArray = [];
var destinations = [[33.25,-111.847944], [33.28,-111.88],[33.279791,-111.860386],[33.40,-111.84]];

var address = ['Fox Crossing, Chandler, AZ, USA','1742 S Los Altos Dr, Chandler, AZ 85286, USA','Comanche Ranch, Chandler, AZ 85286, USA','Country Club Dr & 8th Ave, Mesa, AZ 85210, USA'];

var destinations1 = [];

var timetoDestination = [];

var geocoder;

function initMap() 
{
  map = new google.maps.Map(document.getElementById('map'), 
  {
    center: {lat: 33.25, lng: -111.83},
    zoom: 8
  });
  
  
  
   marker = new google.maps.Marker({
    position: {lat: 33.25, lng: -111.83},
    map: map,
    title: 'Start'
  });
  
  
  for(var i = 0; i < destinations.length;i++)
  {
destinations1[i]= new google.maps.LatLng(destinations[i][0], destinations[i][1]);
marker = new google.maps.Marker({
    position: destinations1[i],
    map: map,
    label: (i+1).toString(),
    title: (i+1).toString() + ' Destination'
  });
}

geocoder = new google.maps.Geocoder;

convertAddresses();
console.log(address);

 drawFoodTruck();
 
 
   
}
 
 function drawFoodTruck()
 {
 
 	var location = getLocation();
  
  updateTimeData(location[0], location[1]);
  
  map.setCenter({lat: location[0], lng : location[1]});
  
  markerBus = new google.maps.Marker({
    position: {lat: location[0], lng: location[1]},
    map: map,
    title: location[2],
    label:'B'
  });
  
  pushCoordToArray(location[0], location[1]);

  
  var lineCoordinatesPath = new google.maps.Polyline({
  path: lineCoordinatesArray,
  geodesic: true,
  strokeColor: '#2E10FF',
  strokeOpacity: 1.0,
  strokeWeight: 2
  });

  lineCoordinatesPath.setMap(map);
  
  setTimeout(drawFoodTruck, 30000);
    
 }
 
 function getLocation()
 {
 /**
  var location;
 	var data= $.ajax({ 
      url: 'http://gpsinsight.herokuapp.com/freshexpress', 
      async: false,
      dataType: "json"
   }).responseText;
   
   var data1 = $.parseJSON(data);
   return [data1.data[0].latitude,data1.data[0].longitude,data1.data[0].address];**/
   return[33.250350,-111.84,'BUS'];
 }
 
 function pushCoordToArray(latIn, lngIn) {
      lineCoordinatesArray.push(new google.maps.LatLng(latIn, lngIn));
  }
  
  function updateTimeData(lat, long)
  {
  	var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
          origins: [new google.maps.LatLng(lat,long)],
          destinations: destinations1,
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, function(response, status) {
          if (status !== google.maps.DistanceMatrixStatus.OK) {
            alert('Error was: ' + status);
          } else {
          
            var originList = response.originAddresses;
            var destinationList = response.destinationAddresses;

            for (var i = 0; i < originList.length; i++)
            {
              var results = response.rows[i].elements;
              for (var j = 0; j < results.length; j++) 
              {
              var element = results[j];
              timetoDestination[j]= element.duration.text;
              }
            }
            
            
            $('#results').empty();
            
            
            $(timetoDestination).each(function(index)
            {
            $('#results').append('<div> ' + 'Destination ' + (index+1).toString() + ': ' + this+  '</div>');
            });
          }
        });
      }
      
function convertAddresses( )
{


 
for(var i = 0; i < destinations.length; i++)
{
 geocoder.geocode({'location': new google.maps.LatLng(destinations[i][0],destinations[i][1])}, function(results, status){
  if (status !== google.maps.DistanceMatrixStatus.OK) {
            alert('Error was: ' + status);
          } else {
          address.push(results[1].formatted_address)
          }
 });
 
 
}

}


function convertLAT(address)
{
geocoder.geocode( { 'address': address}, function(results, status) {

  if (status == google.maps.GeocoderStatus.OK) {
    var latitude = results[0].geometry.location.lat();
    var longitude = results[0].geometry.location.lng();
    console.log(latitude);
  } 
}); 
}
