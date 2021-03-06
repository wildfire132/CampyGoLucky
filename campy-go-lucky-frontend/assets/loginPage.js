function loginPage(){
// <div class="jumbotron">
// <h1 class="display-4">Campy Go Lucky</h1>
// <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
// <hr class="my-4">
// <form>
//     <div class="form-group">
//         <label for="exampleInputEmail1">Username</label>
//         <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name">
//         <small id="emailHelp" class="form-text text-muted">We'll never share your username with anyone else.</small>
//     </div>
//     <button type="submit" class="btn btn-outline-success">Let's Go!</button>
// </form>
// </div>

    let renderDelete = document.querySelector(".render-delete")
    deleteAllUnder(renderDelete)
    let dropShawdow = document.createElement("div")
    dropShawdow.classList.add("drop-shadow")
    renderDelete.appendChild(dropShawdow)
    let glass = document.createElement("glass")
    glass.classList.add("glass")
    dropShawdow.appendChild(glass)
    let glassSpan = document.createElement("span")
    glass.appendChild(glassSpan)
    let jumbo = document.createElement("div")
    jumbo.classList.add("jumbotron", "glass")
    glassSpan.appendChild(jumbo)

    let appTitle = document.createElement("h1")
    appTitle.classList.add("display-4")
    appTitle.innerText = "Sign Up :: Campy Go Lucky"

    let appDesc = document.createElement("p")
    appDesc.classList.add("lead")
    appDesc.innerText = "Let us help you plan your next camping trip! Plan your road trip to get to your favorite camping destinations and add campsites and hiking trails for when you get there. Campy Go Lucky is here for all your camping needs!"

    let horizRule = document.createElement("hr")
    horizRule.classList.add("my-4")

    let loginForm = document.createElement("form")
    
    loginForm.onsubmit = e =>{
        e.preventDefault()
        loginFormSubmissionRouting(e)
    }

    let formStyle = document.createElement("div")
    formStyle.class = "form-group"

    let userLabel = document.createElement("label")
    userLabel.for = "exampleInputEmail1"
    userLabel.innerText = "Username"

    let userNameInput = document.createElement("input")
    userNameInput.type = "text"
    userNameInput.classList.add("form-control")
    userNameInput.id = "exampleInputEmail1"
    userNameInput.placeholder = "Enter username"
    userNameInput.setAttribute("aria-describedby","emailHelp")

    let helpText = document.createElement("small")
    helpText.id = "emailHelp"
    helpText.classList.add("form-text", "text-muted")
    helpText.innerText = "We'll never share your username with anyone else."

    let submitBtn = document.createElement("button")
    submitBtn.classList.add("btn", "btn-outline-success")
    submitBtn.type = "submit"
    submitBtn.innerText = "Let's Go!"

    userNameInput.appendChild(helpText)

    formStyle.appendChild(userLabel)
    formStyle.appendChild(userNameInput)
    formStyle.appendChild(submitBtn)

    loginForm.appendChild(formStyle)

    jumbo.appendChild(appTitle)
    jumbo.appendChild(appDesc)
    jumbo.appendChild(horizRule)
    jumbo.appendChild(loginForm)
    
    renderDelete.appendChild(jumbo)
}

function loginFormSubmissionRouting(e){
    let newUsername = e.target[0].value
    fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(arrayOfUsers => {
        let filtered = arrayOfUsers.filter(user => (user.username.charAt(0).toUpperCase() + user.username.toLowerCase().slice(1)) == (newUsername.charAt(0).toUpperCase() + newUsername.toLowerCase().slice(1)))
        if (filtered.length > 0){
            myTrips(filtered[0])         
        } else {
            postNewUser(newUsername)
        }
    })
}

function postNewUser(username){
    fetch('http://localhost:3000/users',{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            username: username
        })
    }).then(response => response.json())
    .then(user => {
    createTrip(user)
    console.log("NEW USER", user)
    })
}