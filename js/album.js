
import {playAlbumSong} from "./player.js"
import "./menu.js"
import "./order.js"
import {artists, currentUser} from "./firebase.js"
import {likeSong} from "./like.js"

let albumTracks = []

function getTracks() {
    let albumName = decodeURI(window.location.hash.split("#")[1].replace("%20", " "))
    console.log(albumName)
    let tracksNode = document.getElementById("tracks")
    let headNode = document.getElementById("album-head")

    artists.forEach(artist => {
        artist.albums.forEach(album => {
            if (album.name == albumName) {
                let count = 0
                albumTracks = album.songs
                album.songs.forEach(song => {
                    let heart = "heart"
                    if (currentUser && currentUser.tracks && currentUser.tracks.includes(song.name)) {
                        heart = "heart-fill"
                    }
                    let list_item = document.createElement('li')
                    list_item.innerHTML = `<div class="track__card">
                    <img src="img/${song.img}.png" class="track__img">
                    <div class="track__description">
                        <p class="track__title">${song.name}</p>
                        <p class="track__subtitle">${artist.name}</p>
                    </div>
                    <p class="card-subtitle">0:42</p>
                    <button class="button-icon" id="heart-${count}">
                        <img src="img/${heart}.svg" class="icon">
                    </button>
                    <button class="button-icon icon-red" id="playAlbum-${count}">
                        <img src="img/play.svg" class="icon">
                    </button>
                </div>`
                    tracksNode.appendChild(list_item)
                    document.getElementById(`playAlbum-${count}`).addEventListener("click", playAlbumSong.bind(this, count, albumTracks))
                    document.getElementById(`heart-${count}`).addEventListener("click", likeSong.bind(this, count, song.name))
                    count += 1
                })
                headNode.innerHTML = `<div class="head-img-container">
                <img src="img/${album.img}.png" class="head-img">
                <button class="button-icon button-icon-head">
                    <img src="img/heart.svg" class="icon icon-white">
                </button>
            </div>
            <div class="head-description">
                <p class="head-title">${album.name}</p>
                <p class="head-subtitle">${album.artist}</p>
                <p class="head-subsubtitle">${count} треков</p>
            </div>`
            }   
        })
    })
}

window.onhashchange = function() {
    window.location.reload()
}

getTracks()
