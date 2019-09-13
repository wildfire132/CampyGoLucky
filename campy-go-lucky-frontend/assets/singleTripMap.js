function singleTrip(trip, centerPointHash, user){
    // scriptSrcGoogleMaps() 
    fetch(`http://localhost:3000/users/${user.id}`)
    .then(response => response.json())
    .then(userObject => {
        console.log("User Object", userObject)
        initMap(trip, centerPointHash,userObject)
    })
}

initMap = (trip, centerPointHash,user) =>{
    let renderDelete = document.querySelector(".render-delete")
    deleteAllUnder(renderDelete)

    let myTripName = document.createElement("h1")
    myTripName.innerText = trip.name

    let backToTripsBtn = document.createElement("button")
        backToTripsBtn.innerText = "Back to My Trips"
        backToTripsBtn.classList.add("btn", "btn-outline-info")
        backToTripsBtn.onclick = e =>{ 
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

    map.addListener('click', function(e) {
        getMarkers(e.latLng, trip)
    });

        // getWeatherInfo(marker)

        // getWeatherInfo(marker)


    // map.panTo(position)
    // debugger
    
}

//need to update with click event logic
function getMarkers(latLong, trip) {
    // debugger
    startLocation = trip.start_location
    
    // state = centerPointHash.address.split(", ")[1]
    fetch('http://localhost:3000/markers', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // startLocation,
            // state,
            latLong
        })
    })
    .then(res => res.json())
    .then(markersArray => {
        console.log("is the fetch working?", markersArray)

        displayMarkers(trip, markersArray)
    })
}


function displayMarkers(trip, markersArray) {
    debugger
    markersArray.forEach(function (marker) {
        // debugger
    contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        `<h3 id="firstHeading" class="firstHeading">${marker.camp_name}</h3>` +
        '<div id="bodyContent">' +
            `<p>Location: ${marker.address}</p>` +
            `<img src="${marker.imgUrl}">` +
            `<a href="${marker.url}">Campground Information</a>` +
        '</div>' +
    '</div>';

    getWeatherInfo(marker)

    markertest = new google.maps.Marker({ position: marker.latlong, map: map, title: marker.name })

    google.maps.event.addListener(markertest, 'click', getInfoCallback(map, contentString))

    function getWeatherInfo(marker) {
    fetch("http://localhost:3000/weathers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            latlong: marker.latlong
        })
        }).then(response => response.json())
        .then(json => {
            console.log(json)
        })
    }

    function getInfoCallback(map, content) {
        let infowindow = new google.maps.InfoWindow({ content: content })
        return async function () {
            infowindow.setContent(content)
            await infowindow.open(map, this)
            let showInfoBtn = document.createElement("button")
            showInfoBtn.innerText = "Show Info"
            showInfoBtn.onclick = e => {
                myCamps(marker, trip)
            }

            let addCampgroundBtn = document.createElement("button")
            addCampgroundBtn.innerText = "Add To Trip"
            addCampgroundBtn.onclick = e => {
                associateCampgroundWithTrip(marker, trip)
            }
            let grabDiv = document.querySelector(".gm-style-iw")
            // debugger
            grabDiv.append(showInfoBtn)
            grabDiv.append(addCampgroundBtn)
        }
    }
})
}

function associateCampgroundWithTrip(marker, trip) {
    
}