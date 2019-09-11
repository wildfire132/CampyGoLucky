function displayTrip(trip) {
    console.log("In display trip!!!!!!")
    let renderDelete = document.querySelector(".render-delete")
    deleteAllUnder(renderDelete)
    let tripName = document.createElement("h2")
    tripName.innerText = `${trip.name}`
    let campSitesList = document.createElement("ul")

    let editBtn = document.createElement("button")
        editBtn.innerText = "Add Campsites To Trip"
        editBtn.onclick = e => {
            generateTripMap(trip)
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


}

async function deleteCampSite(campsite) {
    let campsiteId = campsite.id
    await fetch(`http://localhost:3000/campsites/${campsiteId}`, {
        method: "DELETE"
    })
}

function displayCampSiteInfo(campsite) {
    // debugger
    let campModal = document.createElement("div")
    campModal.classList.add("modal", "fade")
    campModal.id = "campModal"
}
