document.addEventListener("DOMContentLoaded", scriptSrcGoogleMaps())

async function scriptSrcGoogleMaps(){
    fetch("http://localhost:3000/coms")
    .then(response => response.json())
    .then(json => {
   
    let mapScript = document.getElementById("make-map")
    mapScript.src = `https://maps.googleapis.com/maps/api/js?key=${json.api_key}`
    loginPage()
    })  
}

function deleteAllUnder(divToDelete){
    while (divToDelete.firstChild) {
        divToDelete.firstChild.remove()
    }
}

let body = document.getElementById("banana")
let h2 = document.createElement("h2")
h2.innerText = "Hello"
body.appendChild(h2)


