function myCamps(marker, trip) {
    {/* <h1> My Trips </h1>
        <div class="card-group" id="flex-wrap-items">
            <div class="card" style="width: 18rem;">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                    <h1 class="card-title">Trip Name</h1>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Number of Campsites: include span?</li>
                    <li class="list-group-item">Stretch goal: total mileage</li>
                </ul>
                <div class="card-body">
                    <button type="button" class="btn btn-outline-info">More Info</button>
                </div>
            </div>
        </div>

     <div class="jumbotron">
        <h1 class="display-4">Creating New Trip</h1>
        <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr class="my-4">
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Trip Name</label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Trip name">
                <br>
                <label for="exampleInputEmail1">Starting Location</label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your location">
                <br>
                <label for="exampleInputEmail1">Start Date</label>
                <input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name">
            </div>
            <button type="submit" class="btn btn-outline-success">Create Trip!</button>
        </form>
    </div> */}
    // debugger

    getCampground(marker, trip)


}


getCampground = (marker, trip) => {
    let latlong = marker.latlong
    let address = marker.address
    let camp_name = marker.camp_name
    // debugger
    fetch('http://localhost:3000/campgrounds', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            latlong,
            address,
            camp_name
        })
    })
        .then(res => res.json())
        .then(json => {
            displayCampgroundInfo(trip, json)
        })
}

function displayCampgroundInfo(trip, json) {
    // debugger
}