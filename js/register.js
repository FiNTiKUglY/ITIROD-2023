import {register} from "./firebase.js"
import "./menu.js"
import "./order.js"

let register_button = document.getElementById("register-button")

register_button.addEventListener("click", (e) => {
    e.preventDefault()
    let email = document.getElementById("user_email").value
    let password = document.getElementById("user_password").value
    register(email, password)
})