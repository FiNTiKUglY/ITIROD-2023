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
        addUser(user.uid)
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
    let user_id = ""
    params.forEach(param => {
        if (param.includes("user=")) {
            user_id = param.split('=')[1]
        }
    })
    const object = await (await fetch(`https://musicplayer-f71a2-default-rtdb.europe-west1.firebasedatabase.app/users/${user_id}.json`)).json()
    return object
}

async function addUser(id) {
    let newUser = {
        id: id,
        name: "default"
    }
    return await fetch(`https://musicplayer-f71a2-default-rtdb.europe-west1.firebasedatabase.app/users/${newUser.id}.json`, {
        method: 'put',
        body: JSON.stringify(newUser)
    });
}

async function getArtists() {
    const object = await (await fetch(`https://musicplayer-f71a2-default-rtdb.europe-west1.firebasedatabase.app/artists.json`)).json()
    return object
}

export const currentUser = await getUser()
export const artists = await getArtists()

async function addTrackToFavorite(track) {
    let updateUser = await getUser()
    if (updateUser.tracks) {
        updateUser.tracks.push(track)
    }
    else {
        updateUser.tracks = [track]
    }
    return await fetch(`https://musicplayer-f71a2-default-rtdb.europe-west1.firebasedatabase.app/users/${currentUser.id}/tracks.json`, {
        method: 'put',
        body: JSON.stringify(updateUser.tracks)
    });
}

async function removeTrackFromFavorite(track) {
    let id = currentUser.tracks.indexOf(track)
    let updateUser = await getUser()
    if (updateUser.tracks) {
        updateUser.tracks.splice(id, 1)
    }
    return await fetch(`https://musicplayer-f71a2-default-rtdb.europe-west1.firebasedatabase.app/users/${currentUser.id}/tracks.json`, {
        method: 'put',
        body: JSON.stringify(updateUser.tracks)
    });
}

async function addAlbumToFavorite(album) {
    let updateUser = await getUser()
    if (updateUser.albums) {
        updateUser.albums.push(album)
    }
    else {
        updateUser.albums = [album]
    }
    return await fetch(`https://musicplayer-f71a2-default-rtdb.europe-west1.firebasedatabase.app/users/${currentUser.id}/albums.json`, {
        method: 'put',
        body: JSON.stringify(updateUser.albums)
    });
}

async function removeAlbumFromFavorite(album) {
    let id = currentUser.albums.indexOf(album)
    let updateUser = await getUser()
    if (updateUser.albums) {
        updateUser.albums.splice(id, 1)
    }
    return await fetch(`https://musicplayer-f71a2-default-rtdb.europe-west1.firebasedatabase.app/users/${currentUser.id}/albums.json`, {
        method: 'put',
        body: JSON.stringify(updateUser.albums)
    });
}

export {login, register, logout, addTrackToFavorite, removeTrackFromFavorite, addAlbumToFavorite, removeAlbumFromFavorite}