import {playAlbumSong} from "./player.js"
import  "./menu.js"
import  "./order.js"
import {artists, currentUser} from "./firebase.js"
import {likeSong} from "./like.js"

let possibleOrder = []

function updateSearch() {
    let searchValue = ""
    if (typeof this !== "undefined") {
        searchValue = this.value.toLowerCase()
    }
    let tracksNode = document.getElementById("search-tracks")
    let albumsNode = document.getElementById("search-albums")
    let artistsNode = document.getElementById("search-artists")
    possibleOrder = []
    while (artistsNode.firstChild) {
        artistsNode.firstChild.remove()
    }
    while (albumsNode.firstChild) {
        albumsNode.firstChild.remove()
    }
    while (tracksNode.firstChild) {
        tracksNode.firstChild.remove()
    }
    let count = 0
    artists.forEach(artist => {
        if (artist.name.toLowerCase().includes(searchValue)) {
            let list_item = document.createElement('li')
            list_item.innerHTML = `<a href="artist.html#${artist.name}">
            <div class="card">
                <img src="img/${artist.img}.png" class="card__img">
                <p class="card__title">${artist.name}</p> 
            </div>
        </a>`
        artistsNode.appendChild(list_item)
        }
        artist.albums.forEach(album => {
            if (album.name.toLowerCase().includes(searchValue)) {
                let list_item = document.createElement('li')
                list_item.innerHTML = `<a href="album.html#${album.name}">
                <div class="card">
                    <img src="img/${album.img}.png" class="card__img">
                    <p class="card__title">${album.name}</p> 
                    <p class="card__subtitle">${artist.name}</p>
                </div>
            </a>`
            albumsNode.appendChild(list_item)
            }
            album.songs.forEach(song => {
                let heart = "heart"
                if (song.name.toLowerCase().includes(searchValue.toLowerCase())) {
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
                document.getElementById(`playAlbum-${count}`).addEventListener("click", playAlbumSong.bind(this, count, possibleOrder))
                document.getElementById(`heart-${count}`).addEventListener("click", likeSong.bind(this, count, song.name))
                count += 1
                possibleOrder.push(song)
                }
            })
        })
    })
}

document.getElementById("search").addEventListener("keyup", updateSearch)

updateSearch()