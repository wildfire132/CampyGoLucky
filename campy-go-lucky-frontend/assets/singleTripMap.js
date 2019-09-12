function singleTrip(trip, centerPointHash, markersArray){
    // scriptSrcGoogleMaps()
    
    initMap(trip, centerPointHash, markersArray)

   

}

initMap = (trip, centerPointHash, markersArray) =>{
    let renderDelete = document.querySelector(".render-delete")
    deleteAllUnder(renderDelete)
    let newTripMap = document.createElement("div")
    newTripMap.id = "map"
    renderDelete.appendChild(newTripMap)

    map = new google.maps.Map(document.getElementById('map'), {
        center: centerPointHash.latlong,
        zoom: 9 
    })  

    markersArray.forEach(function(marker){
        contentString = '<div id="content">'+
           '<div id="siteNotice">'+
           '</div>'+
           `<h1 id="firstHeading" class="firstHeading">${marker.camp_name}</h1>`+
           '<div id="bodyContent">'+
           '<p>Content</p>'+
           '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
           'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
           '(last visited June 22, 2009).</p>'+
           '</div>'+
           '</div>';

        marker = new google.maps.Marker({position: marker.latlong, map: map, title: marker.name})

        google.maps.event.addListener(marker, 'click', getInfoCallback(map, contentString))

        function getInfoCallback(map, content){
            let infowindow = new google.maps.InfoWindow({content: content})
            return function() {
                infowindow.setContent(content)
                infowindow.open(map, this)
            }
        } 
    })
}
