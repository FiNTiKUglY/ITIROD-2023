import {register} from "./firebase.js"
import "./menu.js"
import "./order.js"
import { validate_email, validate_password } from "./validators.js"

let register_button = document.getElementById("register-button")

register_button.addEventListener("click", (e) => {
    e.preventDefault()
    let email = document.getElementById("user_email").value
    if (email.length == 0 || !validate_email(email)) {
        document.getElementById('error').innerHTML = "Неверный формат email";
        return
    }
    let password = document.getElementById("user_password").value
    if (password.length == 0 || !validate_password(password)) {
        document.getElementById('error').innerHTML = "Неверный формат пароля (6+ символов)";
        return
    }
    let confirm_password = document.getElementById("confirm_password").value
    if (confirm_password != password) {
        document.getElementById('error').innerHTML = "Пароли не совпадают";
        return
    }
    let nickname = document.getElementById("user_name").value
    if (nickname.length == 0) {
        document.getElementById('error').innerHTML = "Поле никнейма пусто";
        return
    }
    register(email, password, nickname)
})