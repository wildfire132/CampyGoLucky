document.addEventListener("DOMContentLoaded", scriptSrcGoogleMaps())

async function scriptSrcGoogleMaps(){
    // let html = document.querySelector("html")
    // html.style = `background: url(../styles/pic#{Math.floor(Math.random() * 8)}.jpg) no-repeat center center fixed;
    //     - webkit - background - size: cover;
    // -moz - background - size: cover;
    // -o - background - size: cover;
    // background - size: cover;`
    // let body = document.querySelector("body")
    // body.style = `background: url(./pic#{Math.floor(Math.random() * 8)}.jpg) no-repeat center center fixed;
    //     - webkit - background - size: cover;
    // -moz - background - size: cover;
    // -o - background - size: cover;
    // background - size: cover;`
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
// let h2 = document.createElement("h2")
// h2.innerText = "Hello"
// body.appendChild(h2)


