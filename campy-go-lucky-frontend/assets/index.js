document.addEventListener("DOMContentLoaded", scriptSrcGoogleMaps())

function scriptSrcGoogleMaps(){
    // let mapScript = document.getElementById("make-map")
    // mapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD2UytQqN0X2Rtm0hGT_xEi6srZyop0CvM&callback=initMap&`
    // ${ENV["GOOGLE_MAPS_API_KEY"]}
    loginPage()
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


