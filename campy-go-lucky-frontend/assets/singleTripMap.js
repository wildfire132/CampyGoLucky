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

    let searchForm = document.createElement("form")
    let newSearch = document.createElement("input")
    newSearch.type = "search"
    newSearch.placeholder = "Search by Location"
    let searchBtn = document.createElement("button")
    searchBtn.innerText = "Search"
    searchForm.onsubmit = e => {
        e.preventDefault()
        // debugger
        let startLocation = e.target.children[0].value
        getMap(trip, startLocation, user)
    }
    searchForm.appendChild(newSearch)
    searchForm.appendChild(searchBtn)



    // debugger
    let newTripMap = document.createElement("div")
    newTripMap.id = "map"

    renderDelete.appendChild(myTripName)
    renderDelete.appendChild(backToTripsBtn)
    renderDelete.appendChild(searchForm)
    renderDelete.appendChild(newTripMap)


    let tripStops = document.createElement("div")
    tripStops.classList.add("trip-stops")
    renderDelete.appendChild(tripStops)

    // add dom element to contain trip campsites

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
    displayCampSites(trip, centerPointHash, user)
    
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
    // debugger
    markersArray.forEach(function (marker) {
        // debugger
    contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        `<h4 id="firstHeading" class="firstHeading"><a href="${marker.url}">${marker.camp_name}</a></h4>` +
        '<div id="bodyContent">' +
            `<p>Location: ${marker.address}</p>` +
            `<img style="max-height: 150px" src="${marker.imgUrl}">` +
            // `<a href="${marker.url}">Campground Information</a>` +
        '</div>' +
    '</div>';

    // getWeatherInfo(marker)

    markertest = new google.maps.Marker({ position: marker.latlong, map: map, title: marker.name })
    google.maps.event.addListener(markertest, 'click', getInfoCallback(markertest, map, contentString))

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

    function getInfoCallback(markertest, map, content) {
        let infowindow = new google.maps.InfoWindow({ content: content })

        return async function () {
            // debugger
            let grabDiv = document.querySelectorAll(".gm-style-iw")
            if (grabDiv.length > 0) {
                // debugger
                grabDiv[0].remove()
            }

            infowindow.setContent(content)
            await infowindow.open(map, this)
            let showInfoBtn = document.createElement("button")
            showInfoBtn.classList.add("btn", "btn-outline-info")
            showInfoBtn.innerText = "Show Info"
            showInfoBtn.onclick = e => {
                myCamps(marker, trip)
            }

            let addCampgroundBtn = document.createElement("button")
            addCampgroundBtn.classList.add("btn", "btn-outline-success")
            addCampgroundBtn.innerText = "Add To Trip"
            addCampgroundBtn.onclick = e => {
                associateCampgroundWithTrip(marker, trip)
            }
            // debugger
            grabDiv = document.querySelector(".gm-style-iw")
            grabDiv.prepend(addCampgroundBtn)

            grabDiv.append(showInfoBtn)
        }
    }
})
}

function associateCampgroundWithTrip(marker, trip) {
    // debugger
    latitude = marker["latlong"]["lat"]
    longitude = marker["latlong"]["lng"]
    name = marker["camp_name"]
    url = marker["url"]
    // debugger
    img = marker["imgUrl"]
    fetch('http://localhost:3000/campsites', {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            latitude,
            longitude,
            name,
            url,
            img,
            trip_id: trip.id
        })
    }).then(response => response.json())
    .then(data => {
        // debugger

        getTrip(trip)
        
    })
    // post request with campground info to campsites controller
    // shovel newly created campsite into the trips campsites
    // lastly should render campsite card at the bottom of the tripmap page with other campsites
}

function getTrip(trip) {
    fetch(`http://localhost:3000/trips/${trip.id}`)
    .then(response => response.json())
    .then(trippy => {
        console.log("did it", trippy)
        // debugger
        displayCampSites(trippy)
    }) 
}

function displayCampSites(trip, centerPointHash, user) {
    // debugger

    let renderDelete = document.querySelector(".render-delete")
    let tripStops = document.querySelector(".trip-stops")
    // tripStops.classList.add("trip-stops")

    while (tripStops.firstChild) {
        tripStops.firstChild.remove()
    }

    let tripStopsHeader = document.createElement("h2")
    tripStopsHeader.classList.add("page-header")
    tripStopsHeader.innerText = "Campsites On This Trip"

    let campList = document.createElement("ul")
    campList.classList.add("flexy")
    // debugger
    trip.campsites.forEach(campsite => {
        let campBullet = document.createElement("li")
        campBullet.id = "camp"
        campBullet.classList.add("list-inline-item")
        // debugger
        let campLink = document.createElement("a")
        campLink.classList.add("info")
        campLink.href = campsite.url
        campLink.target = "_blank"
        campLink.innerText = campsite.name

        let dltBtn = document.createElement("button")
        dltBtn.classList.add("btn", "btn-outline-danger")
        dltBtn.innerText = "Delete Campsite"
        dltBtn.onclick = e => {
            deleteCampSite(trip, centerPointHash, user, campsite)
        }
        campList.appendChild(campBullet)
        campBullet.appendChild(campLink)
        campBullet.appendChild(dltBtn)
    })

    renderDelete.appendChild(tripStops)
    tripStops.appendChild(tripStopsHeader)
    tripStops.appendChild(campList)
    

}

async function deleteCampSite(trip, centerPointHash, user, campsite) {
    // debugger
    let campsiteId = campsite.id
    const deleted = await fetch(`http://localhost:3000/campsites/${campsiteId}`, {
        method: "DELETE"
    }).then(response => {
        console.log(response)
        // debugger
        getTrip(trip)
    })
    

}