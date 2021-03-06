function displayTrip(user,trip) {
    
    let renderDelete = document.querySelector(".render-delete")
    deleteAllUnder(renderDelete)
    let tripName = document.createElement("h2")
    tripName.innerText = `${trip.name}`
    let campSitesList = document.createElement("ul")

    let editBtn = document.createElement("button")
        editBtn.innerText = "Add Campsites To Trip"
        editBtn.classList.add("btn", "btn-outline-info")
        editBtn.onclick = e => {
            generateTripMap(trip)
        }

    let backToTripsBtn = document.createElement("button")
        backToTripsBtn.innerText = "Back to My Trips"
        backToTripsBtn.classList.add("btn", "btn-outline-info")
        backToTripsBtn.onclick = e =>{ 
            console.log(trip)
            myTrips(user)
        }

    if (trip.campsites.length > 0){
    trip.campsites.forEach(campsite => {
        let campspot = document.createElement("li")
        let campspotInfoLink = document.createElement("a")
        campspotInfoLink.innerText = campsite.name
        campspotInfoLink.setAttribute("data-toggle", "modal")
        campspotInfoLink.setAttribute("data-target","#campModal")
        campspotInfoLink.onclick = e =>{
             displayCampSiteInfo(campsite)
        }

        let dltBtn = document.createElement("button")
        dltBtn.innerText = "Delete"
        dltBtn.classList.add("btn", "btn-outline-info")
        dltBtn.onclick = e =>{ 
            deleteCampSite(campsite)
        }

        campspot.appendChild(campspotInfoLink)
        campspot.appendChild(dltBtn)

        campSitesList.appendChild(campspot)
      
    })} else {
        let noCamps = document.createElement("p")
        noCamps.innerText = "There are no campsites currently associated with this trip."
        tripName.appendChild(noCamps)
    }

    tripName.appendChild(editBtn)
    renderDelete.appendChild(tripName)
    renderDelete.appendChild(campSitesList)
    renderDelete.appendChild(backToTripsBtn)

}

// function deleteCampSite(campsite) {
//     let campsiteId = campsite.id
//     fetch(`http://localhost:3000/campsites/${campsiteId}`, {
//         method: "DELETE"
//     })
// }

function displayCampSiteInfo(campsite) {
    // debugger
    let campModal = document.createElement("div")
    campModal.classList.add("modal", "fade")
    campModal.id = "campModal"
}
