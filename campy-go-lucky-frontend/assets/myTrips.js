function myTrips(user){
    debugger
    console.log(user)
    console.log("Made it to my Trips!!!!!!!!!!!")
    
    let renderDelete = document.querySelector(".render-delete")
    deleteAllUnder(renderDelete)

    let myTrips = document.createElement("h1")
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

        let card = document.createElement("div")
        card.classList.add("card")

        let cardImg = document.createElement("img")
        cardImg.src = "https://wikiclipart.com/wp-content/uploads/2017/07/Images-about-possums-on-cartoon-and-clipart.jpg"
        cardImg.classList.add("card-img-top")

        let cardBody = document.createElement("div")
        cardBody.classList.add("card-body")

        let tripName = document.createElement("h2")
        //delete line below 
        tripName.classList.add("card-title")
        tripName.innerText = trip.name

        let tripDesc = document.createElement("p")
        tripDesc.classList.add("card-text")
        tripDesc.innerText = "Placeholder -> probably should add trip.description attribute"

        let tripInfoList = document.createElement("ul")
        tripInfoList.classList.add("list-group", "list-group-flush")

        let numCampSites = document.createElement("li")
        numCampSites.classList.add("list-group-item")
        numCampSites.innerText = "Number of Campsites: include span?"

        let totalMileage = document.createElement("li")
        totalMileage.classList.add("list-group-item")
        totalMileage.innerText = "Total Mileage: stretch goal?"

        let infoBtn = document.createElement("button")
        infoBtn.innerText = "More Info"
        infoBtn.classList.add("btn", "btn-outline-info")
        infoBtn.type = "button"
        infoBtn.onclick = e => {
            displayTrip(trip)
        }

        tripInfoList.appendChild(numCampSites)
        tripInfoList.appendChild(totalMileage)
        cardBody.appendChild(tripName)
        cardBody.appendChild(tripDesc)
        card.appendChild(cardImg)
        card.appendChild(cardBody)
        card.appendChild(infoBtn)
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