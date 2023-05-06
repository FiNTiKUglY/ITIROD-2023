import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js"

const firebaseConfig = {
  apiKey: "AIzaSyDKqOdfbVgw-jYxr92D1JiL8URgpPlp9MI",
  authDomain: "musicplayer-f71a2.firebaseapp.com",
  projectId: "musicplayer-f71a2",
  storageBucket: "musicplayer-f71a2.appspot.com",
  messagingSenderId: "613878986587",
  appId: "1:613878986587:web:5c07e11ef4a1ff12c0cc7e",
  measurementId: "G-ZV5WGWRC4T"
};

export const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export let user = auth.userCredential
console.log()

function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

        user = userCredential.user
        document.cookie = `user=${user.uid}`
        setTimeout(function () {
            window.location.href = "index.html"
        }, 1 * 1000)
    })
}

function register(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

        user = userCredential.user
        document.cookie = `user=${user.uid}`
        setTimeout(function () {
            window.location.href = "index.html"
        }, 1 * 1000)
    })
}

function logout() {
    document.cookie = 'user=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'role=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    window.location.href = 'index.html';
}

async function getUser() {
    const params = document.cookie.split(';')
    const user_id = params[0].split('=')[1]
    const object = await (await fetch(`https://musicplayer-f71a2-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy="id"&equalTo="${user_id}"`)).json()
    for (const key of Object.keys(object)) {
        return object[key]
    }
    return null
}

async function getArtists() {
    const object = await (await fetch(`https://musicplayer-f71a2-default-rtdb.europe-west1.firebasedatabase.app/artists.json`)).json()
    return object
}

export const currentUser = await getUser()
export const artists = await getArtists()

export {login, register, logout}