
import {playAlbumSong} from "./player.js"
import "./menu.js"
import "./order.js"

let artists = [
    {
        name: 'Saluki',
        albums: [
            {
                name: 'WILD EAST',
                artist: 'Saluki',
                img: 'WILD EAST',
                songs: [
                    {
                        name: '1000 RAD',
                        artist: 'Saluki',
                        audio: '1000 RAD',
                        img: 'WILD EAST'
                    },
                    {
                        name: 'BOLOTO',
                        artist: 'Saluki',
                        audio: 'BOLOTO',
                        img: 'WILD EAST'
                    },
                    {
                        name: 'GLUGICIR',
                        artist: 'Saluki',
                        audio: 'GLUGICIR',
                        img: 'WILD EAST'
                    },
                    {
                        name: 'HAHAHA',
                        artist: 'Saluki',
                        audio: 'HAHAHA',
                        img: 'WILD EAST'
                    },
                    {
                        name: 'SOLOIST',
                        artist: 'Saluki',
                        audio: 'SOLOIST',
                        img: 'WILD EAST'
                    },
                    {
                        name: 'НЕМНОГО КРУЧЕ',
                        artist: 'Saluki',
                        audio: 'НЕМНОГО КРУЧЕ',
                        img: 'WILD EAST'
                    },
                    {
                        name: 'ВЫЛЕЧИМ',
                        artist: 'Saluki',
                        audio: 'ВЫЛЕЧИМ',
                        img: 'WILD EAST'
                    }
                ]
            }
        ]
    },
    {
        name: 'Папин Олимпос',
        albums: [
            {
                name: 'телу тоже больно',
                artist: 'Папин Олимпос',
                img: 'Телу тоже больно',
                songs: [
                    {
                        name: 'телу тоже больно',
                        artist: 'Папин Олимпос',
                        audio: 'Телу тоже больно',
                        img: 'Телу тоже больно'
                    }
                ]
            }
        ]
    },
    {
        name: 'Vundabar',
        albums: [
            {
                name: 'Gawk',
                artist: 'Vundabar',
                img: 'Alien',
                songs: [
                    {
                        name: 'Alien Blues',
                        artist: 'Vundabar',
                        audio: 'Alien',
                        img: 'Alien'
                    }
                ]
            }
        ]
    },
    {
        name: 'Vacations',
        albums: [
            {
                name: 'Vibes',
                artist: 'Vacations',
                img: 'Young',
                songs: [
                    {
                        name: 'Young',
                        artist: 'Vacations',
                        audio: 'Young',
                        img: 'Young'
                    }
                ]
            }
        ]
    }
]

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
                    let list_item = document.createElement('li')
                    list_item.innerHTML = `<div class="track__card">
                    <img src="img/${song.img}.png" class="track__img">
                    <div class="track__description">
                        <p class="track__title">${song.name}</p>
                        <p class="track__subtitle">${artist.name}</p>
                    </div>
                    <p class="card-subtitle">0:42</p>
                    <button class="button-icon">
                        <img src="img/heart.svg" class="icon">
                    </button>
                    <button class="button-icon icon-red" id="playAlbum-${count}">
                        <img src="img/play.svg" class="icon">
                    </button>
                </div>`
                    tracksNode.appendChild(list_item)
                    document.getElementById(`playAlbum-${count}`).addEventListener("click", playAlbumSong.bind(this, count, albumTracks))
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

getTracks()
