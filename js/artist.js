
import {playAlbumSong} from "./player.js"
import "./menu.js"
import "./order.js"
import {artists, currentUser} from "./firebase.js"
import {likeSong} from "./like.js"

let artistTracks = []

function getTracks() {
    let artistName = decodeURI(window.location.hash.split("#")[1].replace("%20", " "))
    let tracksNode = document.getElementById("tracks")
    let headNode = document.getElementById("album-head")

    artists.forEach(artist => {
        if (artist.name == artistName) {
            let count = 0
            artist.albums.forEach(album => {
                album.songs.forEach(song => {
                    let heart = "heart"
                    if (currentUser.tracks && currentUser.tracks.includes(song.name)) {
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
                            <img src="img/heart.svg" class="icon">
                        </button>
                        <button class="button-icon icon-red" id="playAlbum-${count}">
                            <img src="img/play.svg" class="icon">
                        </button>
                    </div>`
                    tracksNode.appendChild(list_item)
                    document.getElementById(`playAlbum-${count}`).addEventListener("click", playAlbumSong.bind(this, count, artistTracks))
                    document.getElementById(`heart-${count}`).addEventListener("click", likeSong.bind(this, count, song.name))
                    count += 1
                    artistTracks.push(song)
                })
            })
            headNode.innerHTML = `<div class="head-img-container">
                    <img src="img/${artist.img}.png" class="head-img">
                    <button class="button-icon button-icon-head">
                        <img src="img/heart.svg" class="icon icon-white">
                    </button>
                </div>
                <div class="head-description">
                    <p class="head-title">${artist.name}</p>
                    <p class="head-subtitle">${count} треков</p>
                </div>`
        }
    })
}

getTracks()
