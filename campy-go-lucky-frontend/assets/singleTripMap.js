function singleTrip(trip, centerPointHash, markersArray,user){
    // scriptSrcGoogleMaps() 
    fetch(`http://localhost:3000/users/${user.id}`)
    .then(response => response.json())
    .then(userObject => {
        console.log("User Object", userObject)
        initMap(trip, centerPointHash, markersArray,userObject)
    })
}

initMap = (trip, centerPointHash, markersArray,user) =>{
    let renderDelete = document.querySelector(".render-delete")
    deleteAllUnder(renderDelete)

    let myTripName = document.createElement("h1")
    myTripName.innerText = trip.name

    let backToTripsBtn = document.createElement("button")
        backToTripsBtn.innerText = "Back to My Trips"
        backToTripsBtn.classList.add("btn", "btn-outline-info")
        backToTripsBtn.onclick = e =>{ 
            console.log("initMAP ", user)
            myTrips(user)
        }

    // debugger
    let newTripMap = document.createElement("div")
    newTripMap.id = "map"

    renderDelete.appendChild(myTripName)
    renderDelete.appendChild(backToTripsBtn)
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

        // getWeatherInfo(marker)

        markertest = new google.maps.Marker({position: marker.latlong, map: map, title: marker.name})

        google.maps.event.addListener(markertest, 'click', getInfoCallback(map, contentString))

        function getWeatherInfo(marker){
            fetch("http://localhost:3000/weathers",{
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    latlong: marker.latlong
                })
            }).then(response => response.json())
              .then(json => {
                console.log(json)
            })
        }

        function getInfoCallback(map, content){
            let infowindow = new google.maps.InfoWindow({content: content})
            return async function() {
                infowindow.setContent(content)
                await infowindow.open(map, this)
                let showInfoBtn = document.createElement("button")
                showInfoBtn.innerText = "Show Info"
                showInfoBtn.onclick = e => {
                    myCamps(marker, trip)
                }
                let grabDiv = document.querySelector(".gm-style-iw")
                // debugger
                grabDiv.append(showInfoBtn)
            }
        } 
    })
}
