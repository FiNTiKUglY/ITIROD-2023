import { removeTrackFromFavorite, addTrackToFavorite, removeAlbumFromFavorite, addAlbumToFavorite, currentUser} from "./firebase.js"

function likeSong(id, name) {
    let ico = document.getElementById(`heart-${id}`).firstElementChild
    if (!currentUser) {
        return
    }
    if (ico.src.includes("-fill")) {
        ico.src = "img/heart.svg"
        removeTrackFromFavorite(name)
    }
    else {
        ico.src = "img/heart-fill.svg"
        addTrackToFavorite(name)
    }
}

function likeAlbum(name) {
    let ico = document.getElementById(`heart-album`).firstElementChild
    if (!currentUser) {
        return
    }
    if (ico.src.includes("-fill")) {
        ico.src = "img/heart.svg"
        removeAlbumFromFavorite(name)
    }
    else {
        ico.src = "img/heart-fill.svg"
        addAlbumToFavorite(name)
    }
}

export {likeSong, likeAlbum}