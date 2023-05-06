import {login} from "./firebase.js"
import "./menu.js"
import "./order.js"

let login_button = document.getElementById("login-button")

login_button.addEventListener("click", (e) => {
    e.preventDefault()
    let email = document.getElementById("user_email").value
    let password = document.getElementById("user_password").value
    login(email, password)
})
