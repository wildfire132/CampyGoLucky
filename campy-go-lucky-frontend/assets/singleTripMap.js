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
    myTripName.classList.add("trip-name")
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
    searchBtn.classList.add("btn", "btn-outline-info")
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
    map.panTo(latLong)
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
        `<h4 id="firstHeading" class="firstHeading"><a target="_blank" href="${marker.url}">${marker.camp_name}</a></h4>` +
        '<div id="bodyContent">' +
            `<p>Location: ${marker.address}</p>` +
            `<img style="max-height: 150px" src="${marker.imgUrl}">` +
            // `<a href="${marker.url}">Campground Information</a>` +
        '</div>' +
    '</div>';

        // markertest = new google.maps.Marker({ position: marker.latlong, map: map, title: marker.name, animation: google.maps.Animation.DROP })
        let image = "https://drive.google.com/thumbnail?id=17mX0jcOmJa1gyxOnWkIAeB5zG7vIz2Eo"
        markertest = new google.maps.Marker({ position: marker.latlong, map: map, title: marker.name, animation: google.maps.Animation.DROP, icon: image })
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
        .then(weatherJSON => {
            renderWeatherInfo(weatherJSON,marker)
        })
    }

    function showCampInfo(marker){
        fetch("http://localhost:3000/campgrounds", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            info_url: marker.url
        })
        }).then(response => response.json())
        .then(campJson => {
            renderCampInfo(campJson,marker)
        })
    }

    function getTrailsMarkers(marker, trip) {
        map.panTo(marker.latlong)
        // state = centerPointHash.address.split(", ")[1]
        fetch('http://localhost:3000/gettrails', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                latLong: marker.latlong
            })
        })
        .then(res => res.json())
        .then(markersArray => {
            console.log("is the trail fetch working?", markersArray)
            displayTrailMarkers(marker, markersArray)
            // displayTrailMarkers(trip, markersArray)
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

            let showWeatherBtn = document.createElement("button")
            showWeatherBtn.innerText = "Forecast"
            showWeatherBtn.classList.add("btn", "btn-outline-info")
            showWeatherBtn.setAttribute("data-toggle","modal")
            showWeatherBtn.setAttribute("data-target","#exampleModal")
            showWeatherBtn.onclick = e =>{
                getWeatherInfo(marker)
            }

            let showCampBtn = document.createElement("button")
            showCampBtn.innerText = "Camp Info"
            showCampBtn.classList.add("btn", "btn-outline-warning")
            showCampBtn.setAttribute("data-toggle","modal")
            showCampBtn.setAttribute("data-target","#exampleModal")
            showCampBtn.onclick = e =>{
                showCampInfo(marker)
            }

            let showTrailsBtn = document.createElement("button")
            showTrailsBtn.innerText = "Nearby Trails"
            showTrailsBtn.classList.add("btn", "btn-outline-warning")
            showTrailsBtn.onclick = e =>{
                getTrailsMarkers(marker,trip)
            }

            // let grabDiv = document.getElementById("firstHeading")
            // let docBreak = document.createElement('br')
            // grabDiv = document.querySelector(".gm-style-iw")
            // debugger
            // grabDiv.append(docBreak)
            grabDiv = document.querySelector(".gm-style-iw")
            grabDiv.append(showCampBtn)
            // grabDiv.append(showInfoBtn)
            grabDiv.append(showWeatherBtn)
            // debugger
            grabDiv.append(addCampgroundBtn)
            grabDiv.prepend(showTrailsBtn)
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
        campLink.style = "color:burlywood"
        campLink.href = campsite.url
        campLink.target = "_blank"
        campLink.innerText = campsite.name
        // let getTrailBtn = document.createElement("button")
        // getTrailBtn.innerText = "Find Nearby Trails"
        // getTrailBtn.onclick = e => {
        //     getTrails(campsite, trip)
        // }

        let dltBtn = document.createElement("button")
        dltBtn.classList.add("btn", "btn-outline-warning")
        dltBtn.innerText = "Delete Campsite"
        dltBtn.onclick = e => {
            deleteCampSite(trip, centerPointHash, user, campsite)
        }
        campList.appendChild(campBullet)
        campBullet.appendChild(campLink)
        // campBullet.appendChild(getTrailBtn)
        campBullet.appendChild(dltBtn)
    })

    renderDelete.appendChild(tripStops)
    tripStops.appendChild(tripStopsHeader)
    tripStops.appendChild(campList)
}

function renderTrailInfo(marker){
    console.log("Render trail Marker", marker)
    let modalDiv = document.getElementsByClassName("modal-body")[0]
    deleteAllUnder(modalDiv)

    let modalTitle = document.getElementsByClassName("modal-title")[0]
    modalTitle.innerText = marker.trail_name

    let trailInfoPic = document.createElement("img")
    if (marker.imgUrl){
        trailInfoPic.src = marker.imgUrl
    } else {
        trailInfoPic.src = "https://i.imgur.com/JuRnsax.png"
    }

    let trailSummary = document.createElement("p")
        trailSummary.innerText = marker.summary
    if (trailSummary.innerText.split(" ")[0] == "Needs") {
        trailSummary.innerText = "Trail description is not available."
    }
    let trailRating = document.createElement("p")
        trailRating.innerText = `Trail Rating: ${marker.rating}`
    let trailUrl = document.createElement("a")
        trailUrl.innerText = "More Info"
        trailUrl.href = marker.url
    let trailInfoText = document.createElement("p")
        trailInfoText.innerText = "Trail Info:"
    let trailInfoBreak = document.createElement("br")
    let trailLocation = document.createElement("p")
        trailLocation.innerText =  `Location: ${marker.address}`
    
    let trailName = document.createElement("p")
        trailName.innerText = "Statistics:" 
    let trailList = document.createElement("ul")
    
    let trailDifficulty = document.createElement("li")
    trailDifficulty.innerText = `Trail Difficulty: ${marker.difficulty}`

    let trailLength = document.createElement("li")
    trailLength.innerText = `Trail Length: ${marker.lengthInMilesToPoint}`

    let trailAscent = document.createElement("li")
    trailAscent.innerText = `Trail Ascent ${marker.ascentHeight}`
    let trailDescent = document.createElement("li")
    trailDescent.innerText = `Trail Descent ${marker.descentHeight}`

    debugger 

    modalDiv.appendChild(trailInfoPic)
    modalDiv.appendChild(trailSummary)
    modalDiv.appendChild(trailLocation)
    modalDiv.appendChild(trailRating)
    modalDiv.appendChild(trailUrl)
    modalDiv.appendChild(trailName)
    

    trailName.appendChild(trailList)

    
    trailList.appendChild(trailDifficulty)
    trailList.appendChild(trailLength)
    trailList.appendChild(trailAscent)
    trailList.appendChild(trailDescent)
    
}

function renderCampInfo(campJson,marker){
    console.log("RenderCampInfo", campJson)
    console.log("Render camp Marker", marker)
    let modalDiv = document.getElementsByClassName("modal-body")[0]
    deleteAllUnder(modalDiv)

    let modalTitle = document.getElementsByClassName("modal-title")[0]
    modalTitle.innerText = marker.camp_name

    let campInfoPic = document.createElement("img")
        campInfoPic.src = marker.imgUrl
    let campInfoText = document.createElement("p")
        campInfoText.innerText = "Campsite Info:"
    let campInfoBreak = document.createElement("br")
    let campInfo = document.createElement("p")
        campInfo.innerText =  campJson.camp_info
    
    let campActivitiesText = document.createElement("p")
        campActivitiesText.innerText = "Nearby Activities:"
    let campActivitiesList = document.createElement("ul")
    
    campJson.arrayOfActivities.forEach(function(activity){
        let campActivity = document.createElement("li")
        campActivity.innerText = activity
        campActivitiesList.appendChild(campActivity)
    })

    modalDiv.appendChild(campInfoPic)
    modalDiv.appendChild(campInfoText)
    campInfoText.appendChild(campInfoBreak)
    campInfoText.appendChild(campInfo)
    modalDiv.appendChild(campActivitiesText)
    modalDiv.appendChild(campActivitiesList)

}

function renderWeatherInfo(weatherJson,marker){
    console.log(weatherJson)
    console.log(marker)
    let modalDiv = document.getElementsByClassName("modal-body")[0]
    deleteAllUnder(modalDiv)

    let modalTitle = document.getElementsByClassName("modal-title")[0]

    if (marker.camp_name){
    modalTitle.innerText = marker.camp_name
    } else {
    modalTitle.innerText = marker.trail_name
    }

    let weatherHeader = document.createElement("h3")
    weatherHeader.innerText = `Current Weather: ${weatherJson[0].current_time}`
    let currentConditions = document.createElement("ul")

    let currentIcon = document.createElement("img")
        currentIcon.src = weatherJson[0].current_icon
    let currentSummary = document.createElement("li")
        currentSummary.innerText = `Summary: ${weatherJson[0].current_summary}`
    let currentPrecipProb = document.createElement("li")
        currentPrecipProb.innerText = `Precipitation Probability: ${weatherJson[0].current_precipProb}`
    let currentTemperature = document.createElement("li")
        currentTemperature.innerText = `Temperature: ${weatherJson[0].current_temperature}`
    let currentVisibility = document.createElement("li")
        currentVisibility.innerText = `Visibility: ${weatherJson[0].current_visibility}`
    let currentWindSpeed = document.createElement("li")
        currentWindSpeed.innerText = `Wind Speed: ${weatherJson[0].current_windSpeed}`
    let weeklySummary = document.createElement("li")
        weeklySummary.innerText = `Weekly Summary: ${weatherJson[2].weekly_summary}`
    let textTalk = document.createElement("h3")
        textTalk.innerText = "Weekly Forecast: "

    let weatherContainer = document.createElement("div")
        weatherContainer.className = "container"
    let weatherCardGroupDiv = document.createElement("div")
        weatherCardGroupDiv.className = "card-group"

        modalDiv.appendChild(weatherHeader)
        modalDiv.appendChild(currentConditions)
        currentConditions.appendChild(currentIcon)
        currentConditions.appendChild(currentSummary)
        currentConditions.appendChild(currentPrecipProb)
        currentConditions.appendChild(currentTemperature)
        currentConditions.appendChild(currentVisibility)
        currentConditions.appendChild(currentWindSpeed)
        weatherContainer.appendChild(weatherCardGroupDiv)
        modalDiv.appendChild(textTalk)
        modalDiv.appendChild(weatherContainer)

    weatherJson[1].forEach(function(weather){
        let weatherCard = document.createElement("div")
            weatherCard.className = "card"

    let dailyTime = document.createElement("p")
        dailyTime.innerText = `${weather.time}`
    let dailyIcon = document.createElement("img")
        dailyIcon.src = weather.icon
    let dailySummary = document.createElement("p")
        dailySummary.innerText = `${weather.daily_summary}`
    let dailyPrecipProb = document.createElement("p")
        dailyPrecipProb.innerText = `Precipitation probability: ${weather.chance_rain}`
    let dailyHighTemperature = document.createElement("p")
        dailyHighTemperature.innerText = `Highest Temp: ${weather.highest_temp}`
    let dailyLowTemperature = document.createElement("p")
        dailyLowTemperature.innerText = `Lowest Temp: ${weather.lowest_temp}`
    let dailyVisibility = document.createElement("p")
        dailyVisibility.innerText = `Visibility: ${weather.visibility}`
    let dailyWindSpeed = document.createElement("p")
        dailyWindSpeed.innerText = `Wind speed: ${weather.wind_speed}`
    let dailyCloudCover = document.createElement("p")
        dailyCloudCover.innerText = `Cloud coverage: ${weather.cloud_cover}`
        
    weatherCard.appendChild(dailyTime)
    weatherCard.appendChild(dailySummary)
    weatherCard.appendChild(dailyIcon)
    weatherCard.appendChild(dailyHighTemperature)
    weatherCard.appendChild(dailyLowTemperature)
    weatherCard.appendChild(dailyPrecipProb)
    weatherCard.appendChild(dailyVisibility)
    weatherCard.appendChild(dailyWindSpeed)
    weatherCard.appendChild(dailyCloudCover)

    weatherCardGroupDiv.appendChild(weatherCard)

    })
    
}

function displayTrailMarkers(marker,markersArray){
markersArray.forEach(function (marker) {
    // debugger
contentString = '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    `<h4 id="firstHeading" class="firstHeading"><a target="_blank" href="${marker.url}">${marker.trail_name}</a></h4>` +
    '<div id="bodyContent">' +
        `<p>Location: ${marker.address}</p>` +
        `<img style="max-height: 150px" src="${marker.imgUrl}">` +
        // `<a href="${marker.url}">Campground Information</a>` +
    '</div>' +
'</div>';

    // markertest = new google.maps.Marker({ position: marker.latlong, map: map, title: marker.name, animation: google.maps.Animation.DROP })
    let image = "https://drive.google.com/thumbnail?id=1jv84erVM1HcV_jZPiFxUB6XgCX2uPi1E"
    markertest = new google.maps.Marker({ position: marker.latlong, map: map, title: marker.name, animation: google.maps.Animation.DROP, icon: image })
    google.maps.event.addListener(markertest, 'click', getInfoCallbackTrails(markertest, map, contentString))

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
            .then(weatherJSON => {
                renderWeatherInfo(weatherJSON,marker)
            })
        }
    

    function getInfoCallbackTrails(markertest,map,content){
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

            let showWeatherBtn = document.createElement("button")
            showWeatherBtn.innerText = "Forecast"
            showWeatherBtn.classList.add("btn", "btn-outline-info")
            showWeatherBtn.setAttribute("data-toggle","modal")
            showWeatherBtn.setAttribute("data-target","#exampleModal")
            showWeatherBtn.onclick = e =>{
                getWeatherInfo(marker)
            }

            let showTrailBtn = document.createElement("button")
            showTrailBtn.innerText = "Trail Info"
            showTrailBtn.classList.add("btn", "btn-outline-warning")
            showTrailBtn.setAttribute("data-toggle","modal")
            showTrailBtn.setAttribute("data-target","#exampleModal")
            showTrailBtn.onclick = e =>{
                renderTrailInfo(marker)
            }

            grabDiv = document.querySelector(".gm-style-iw")
            // grabDiv.append(showInfoBtn)
            grabDiv.append(showTrailBtn)
            grabDiv.append(showWeatherBtn)
        }
    }
})}

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



