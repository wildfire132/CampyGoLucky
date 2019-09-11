function singleTrip(trip, resultsHash){
    // endpoint = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD2UytQqN0X2Rtm0hGT_xEi6srZyop0CvM&callback=initMap&'
    // scriptSrcGoogleMaps()
    initMap(trip, resultsHash)

   

}

initMap = (trip, resultsHash) =>{
    let renderDelete = document.querySelector(".render-delete")
    deleteAllUnder(renderDelete)
    let newTripMap = document.createElement("div")
    newTripMap.id = "map"
    renderDelete.appendChild(newTripMap)

    console.log("trip", trip)
    console.log("resultsHash", resultsHash)

    map = new google.maps.Map(document.getElementById('map'), {
        center: resultsHash.latlong,
        zoom: 9
        
    })  
    
    marker = new google.maps.Marker({position: resultsHash.latlong, map: map})
    // newTripMap.appendChild(map)
    // debugger 
}
