function displayTrip(trip) {
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
        campspotInfoLink.setAttribute("data-target"="#campModal")
        campspotInfoLink.addEventListener("click", displayCampSiteInfo(campsite))

        let dltBtn = document.createElement("button")
        dltBtn.innerText = "Delete"
        dltBtn.addEventListener("click", deleteCampSite(campsite))

        campspot.appendChild(campspotInfoLink)
        campspot.appendChild(dltBtn)

        campSitesList.appendChild(campspot)
    })




}

async function deleteCampSite(campsite) {
    return function(e) {
        let campsiteId = campsite.id
        await fetch(`http://localhost:3000/campsites/${campsiteId}`, {
            method: "DELETE"
        })
    }
}

function displayCampSiteInfo(campsite) {
    return function(e) {
        // debugger
        let campModal = document.createElement("div")
        campModal.classList.add("modal", "fade")
        campModal.id = "campModal"
    }
}
