function myTrips(user) {
    fetch(`http://localhost:3000/users/${user.id}`)
    .then(response => response.json())
    .then(userObject => {
        console.log("user object", userObject)
        displayMyTrips(userObject)
    })
}

function displayMyTrips(user){
    console.log("MY TRIPS", user)

    let renderDelete = document.querySelector(".render-delete")
    deleteAllUnder(renderDelete)

    let myTrips = document.createElement("h1")
    myTrips.classList.add("trip-name")
    myTrips.innerText = "My Trips"

    let cardsHolder = document.createElement("div")
    cardsHolder.classList.add("cards")

    renderDelete.appendChild(myTrips)
    let addNewTrip = document.createElement("button")
    addNewTrip.innerText = "Add New Trip"
    addNewTrip.classList.add("btn", "btn-outline-success")
    addNewTrip.onclick = (e) => {
        createTrip(user)
    }
    renderDelete.appendChild(addNewTrip)
    if (!user.trips.length > 0){
        let noTrips =  document.createElement("p")
        noTrips.innerText = "You currently have no trips, add a new one?"
        renderDelete.appendChild(noTrips)
    } else {
    user.trips.forEach(trip => {
        // debugger
        let card = document.createElement("div")
        card.classList.add("card")

        let cardImg = document.createElement("img")
        // debugger
        let image;
        if (trip.campsites.length > 0) {
            image = trip.campsites[Math.floor(Math.random() * trip.campsites.length)].img
        } else {
            image = "https://wikiclipart.com/wp-content/uploads/2017/07/Images-about-possums-on-cartoon-and-clipart.jpg"
        }
        cardImg.src = image
        cardImg.classList.add("card-img-top")

        let cardBody = document.createElement("div")
        cardBody.classList.add("card-body")

        let tripName = document.createElement("h2")
        //delete line below 
        tripName.classList.add("card-title")
        tripName.innerText = trip.name

        let tripDesc = document.createElement("p")
        tripDesc.classList.add("card-text")
        tripDesc.innerText = trip.description

        let tripInfoList = document.createElement("ul")
        tripInfoList.classList.add("list-group", "list-group-flush")
        
        let tripStart = document.createElement("li")
        tripStart.classList.add("list-group-item")
        tripStart.innerText = `Start Location: ${trip.start_location}`

        let numCampSites = document.createElement("li")
        numCampSites.classList.add("list-group-item")
        numCampSites.innerText = `Number of Campsites: ${trip.campsites.length}`

        let totalMileage = document.createElement("li")
        totalMileage.classList.add("list-group-item")
        totalMileage.innerText = "Total Mileage: stretch goal?"

        let startDate = document.createElement("li")
        startDate.classList.add("list-group-item")
        startDate.innerText = `Trip Start Date: ${trip.start_date}`

        let infoBtn = document.createElement("button")
        infoBtn.innerText = "More Info"
        infoBtn.classList.add("btn", "btn-outline-info")
        infoBtn.type = "button"
        infoBtn.onclick = e => {
            displayTrip(user,trip)
        }

        let editTrip = document.createElement("button")
        editTrip.innerText = "Edit Trip"
        editTrip.classList.add("btn", "btn-outline-info")
        editTrip.type = "button"
        editTrip.onclick = e => {
            getMap(trip,trip.start_location,user)
        }

        tripInfoList.appendChild(tripStart)
        let directionsBtn = document.createElement("button")
        directionsBtn.innerText = "Get Directions"
        directionsBtn.classList.add("btn", "btn-outline-info")
        directionsBtn.type = "button"
        directionsBtn.onclick = e => {
            getDirections(trip)
        }



        tripInfoList.appendChild(numCampSites)
        tripInfoList.appendChild(totalMileage)
        tripInfoList.appendChild(startDate)
        cardBody.appendChild(tripName)
        cardBody.appendChild(tripDesc)
        card.appendChild(cardImg)
        card.appendChild(cardBody)
        // card.appendChild(infoBtn)
        card.appendChild(editTrip)
        card.appendChild(directionsBtn)
        card.appendChild(tripInfoList)
        cardsHolder.appendChild(card)

    })}

    renderDelete.appendChild(cardsHolder)


    //         <div class="card">
    //             <img src="https://wikiclipart.com/wp-content/uploads/2017/07/Images-about-possums-on-cartoon-and-clipart.jpg"
    //                 class="card-img-top" alt="...">
    //                 <div class="card-body">
    //                     <h1 class="card-title">Trip Name</h1>
    //                     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
    //                     content.</p>
    //                 </div>
    //                 <ul class="list-group list-group-flush">
    //                     <li class="list-group-item">Number of Campsites: include span?</li>
    //                     <li class="list-group-item">Stretch goal: total mileage</li>
    //                 </ul>
    //                 <button type="button" class="btn btn-outline-info">More Info</button>
    //         </div>

}

function getDirections(trip) {
    let renderDelete = document.querySelector(".render-delete")
    deleteAllUnder(renderDelete)

    let floatingPanel = document.createElement("div")
    floatingPanel.style = "display: none"
    floatingPanel.id = "floating-panel"
    let strong = document.createElement("strong")
    strong.innerText = "Start:"
    let selectStart = document.createElement("select")
    selectStart.innerText = "Start"
    selectStart.id = "start"
    let otherStrong = document.createElement("strong")
    otherStrong.innerText = "End:"
    let otherSelect = document.createElement("select")
    otherSelect.innerText = "End"
    otherSelect.id = "end"
    let rightPanel = document.createElement("div")
    rightPanel.id = "right-panel"
    let map2 = document.createElement("div")
    map2.id = "map2"
    let totalDistanace = document.createElement('p')
    totalDistanace.id = "total"


    floatingPanel.appendChild(strong)
    floatingPanel.appendChild(selectStart)
    floatingPanel.appendChild(otherStrong)
    floatingPanel.appendChild(otherSelect)
    renderDelete.appendChild(floatingPanel)
    renderDelete.appendChild(rightPanel)
    renderDelete.appendChild(map2)
    // rightPanel.appendChild(totalDistanace)

    getDirectionsMap(trip) 

    //     < div style = "display:none"id = "floating-panel" >
    //         <strong>Start:</strong>
    //         <select id="start">
    //             Start
    //   </select>
    //         <br>
    //             <strong>End:</strong>
    //             <select id="end">
    //                 End
    //   </select>
    // </div>
    //         <div id="right-panel"></div>
    //         <div id="map"></div>
}

function getDirectionsMap(trip) {
    let startPointLat = parseFloat(trip.campsites[0].latitude)
    let startPointLong = parseFloat(trip.campsites[0].longitude)
    console.log("start lat", startPointLat)
    console.log("start long", startPointLong)
    debugger
    var directionsRenderer = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    var map2 = new google.maps.Map(document.getElementById('map2'), {
        zoom: 7,
        center: { lat: startPointLat, lng: startPointLong }
    });
    directionsRenderer.setMap(map2);
    directionsRenderer.setPanel(document.getElementById('right-panel'));

    calculateAndDisplayRoute(trip, directionsService, directionsRenderer);

    computeTotalDistance(directionsRenderer.getDirections());

}

function calculateAndDisplayRoute(trip, directionsService, directionsRenderer) {
    let campsites = trip.campsites 
    let waypointsArray = []
    campsites.forEach(campsite => {
        let latitude = campsite.latitude
        let longitude = campsite.longitude
        waypointsArray.push({ location: new google.maps.LatLng(latitude, longitude) })
    })
    let startPointLat = parseFloat(trip.campsites[0].latitude)
    let startPointLong = parseFloat(trip.campsites[0].longitude)
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    directionsService.route({
        origin: trip.start_location,
        destination: trip.start_location,
        waypoints: waypointsArray,
        travelMode: 'DRIVING'
    }, function (response, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

// function computeTotalDistance(result) {
//     var total = 0;
//     var myroute = result.routes[0];
//     for (var i = 0; i < myroute.legs.length; i++) {
//       total += myroute.legs[i].distance.value;
//     }
//     total = total / 1000;
//     document.getElementById('total').innerHTML = total + ' km';
//   }

