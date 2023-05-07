import {playAlbumSong} from "./player.js"
import "./menu.js"
import "./order.js"
import {artists, currentUser} from "./firebase.js"
import {likeSong} from "./like.js"

let favTracks = []

function getTracks() {
    let tracksNode = document.getElementById("tracks")
    let headNode = document.getElementById("album-head")
    let count = 0

    artists.forEach(artist => {
        artist.albums.forEach(album => {
            album.songs.forEach(song => {
                if (currentUser.tracks && currentUser.tracks.includes(song.name)) {
                    let list_item = document.createElement('li')
                    list_item.innerHTML = `<div class="track__card">
                    <img src="img/${song.img}.png" class="track__img">
                    <div class="track__description">
                        <p class="track__title">${song.name}</p>
                        <p class="track__subtitle">${artist.name}</p>
                    </div>
                    <p class="card-subtitle">0:42</p>
                    <button class="button-icon" id="heart-${count}">
                        <img src="img/heart-fill.svg" class="icon">
                    </button>
                    <button class="button-icon icon-red" id="playAlbum-${count}">
                        <img src="img/play.svg" class="icon">
                    </button>
                </div>`
                    favTracks.push(song)
                    tracksNode.appendChild(list_item)
                    document.getElementById(`playAlbum-${count}`).addEventListener("click", playAlbumSong.bind(this, count, favTracks))
                    document.getElementById(`heart-${count}`).addEventListener("click", likeSong.bind(this, count, song.name))  
                    count += 1
                }        
            })   
        })
    })
    headNode.innerHTML = `<div class="head-img-container">
                <img src="img/favourite.png" class="head-img">
            </div>
            <div class="head-description">
                <p class="head-title">Любимые</p>
                <p class="head-subtitle">${currentUser.name}</p>
                <p class="head-subsubtitle">${count} треков</p>
            </div>`
}

getTracks()
