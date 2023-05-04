import {app} from "./firebase.js"
import { getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js"

console.log(app)
const auth = getAuth(app)
let login_button = document.getElementById("login-button")

login_button.addEventListener("click", (e) => {
  let email = document.getElementById("user_email").value
  let password = document.getElementById("user_password").value

  console.log(email, password)

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      const user = userCredential.user;
      console.log(user)

      alert("User loged in!");

      setTimeout(function () {
        window.location.href = "index.html";
      }, 2 * 1000)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    });
});