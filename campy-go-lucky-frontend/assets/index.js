document.addEventListener("DOMContentLoaded", loginPage())

function deleteAllUnder(divToDelete){
    while (divToDelete.firstChild) {
        divToDelete.firstChild.remove()
    }
}

let body = document.getElementById("banana")
let h2 = document.createElement("h2")
h2.innerText = "Hello"
body.appendChild(h2)


