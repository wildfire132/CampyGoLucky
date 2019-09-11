function displayTrip(trip) {
    console.log("In display trip!!!!!!")
    debugger
    let renderDelete = document.querySelector(".render-delete")
    deleteAllUnder(renderDelete)
    let tripName = document.createElement("h2")
    tripName.innerText = `${trip.name}`

    let campSitesList = document.createElement("ul")
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
    })

    let editBtn = document.createElement("button")
    editBtn.innerText = "Edit Trip"
    editBtn.onclick = e => {
        generateTripMap(trip)
    }



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
