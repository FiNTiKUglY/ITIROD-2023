import { removeTrackFromFavorite, addTrackToFavorite} from "./firebase.js"

function likeSong(id, name) {
    let ico = document.getElementById(`heart-${id}`).firstElementChild
    if (ico.src.includes("-fill")) {
        ico.src = "img/heart.svg"
        removeTrackFromFavorite(name)
    }
    else {
        ico.src = "img/heart-fill.svg"
        addTrackToFavorite(name)
    }
}

export {likeSong}