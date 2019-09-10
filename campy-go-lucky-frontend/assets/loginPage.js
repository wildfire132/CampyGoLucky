function loginPage(){
    let renderDelete = document.querySelector(".render-delete")
    while (renderDelete.firstChild) {
        renderDelete.firstChild.remove()
    }
    let jumbo = document.createElement("div")
    jumbo.classList.add("jumbotron")

    let appTitle = document.createElement("h1")
    appTitle.classList.add("display-4")
    appTitle.innerText = "Campy Go Lucky™"

    let appDesc = document.createElement("p")
    appDesc.classList.add("lead")
    appDesc.innerText = "Let us help you plan your next camping trip! Plan your road trip to get to your favorite camping destinations and add campsites and hiking trails for when you get there. Campy Go Lucky is here for all your camping needs!"

    let horizRule = document.createElement("hr")
    horizRule.classList.add("my-4")

    let loginForm = document.createElement("form")
    loginForm.id = "login"

    let userLabel = document.createElement("label")
    // userEmailLabel.for = "username"

    let userNameInput = document.createElement("input")
    userNameInput.type = "text"
    userNameInput.classList.add("form-control")
    userNameInput.id = "exampleInputEmail1"
    userNameInput.placeholder = "Enter username"

    let submitBtn = document.createElement("button")
    submitBtn.classList.add("btn, btn-outline-success")
    submitBtn.type = "submit"
    submitBtn.innerText = "Let's Go!"

    loginForm.appendChild(userEmailLabel)
    loginForm.appendChild(userNameInput)
    loginForm.appendChild(submitBtn)

    jumbo.appendChild(appTitle)
    jumbo.appendChild(appDesc)
    jumbo.appendChild(horizRule)
    jumbo.appendChild(loginForm)



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

}