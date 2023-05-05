import {playAlbumSong} from "./player.js"
import  "./menu.js"
import  "./order.js"

let artists = [
    {
        name: 'Saluki',
        img: "Saluki",
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
            },
            {
                name: 'Улицы Дома',
                artist: 'Saluki',
                img: 'Улицы Дома',
                songs: [
                    {
                        name: 'Улицы Дома',
                        artist: 'Saluki',
                        audio: 'Улицы дома',
                        img: 'Улицы Дома'
                    },
                    {
                        name: 'Реприза',
                        artist: 'Saluki',
                        audio: 'Реприза',
                        img: 'Улицы Дома'
                    },
                    {
                        name: 'Голова Болит',
                        artist: 'Saluki',
                        audio: 'Голова болит',
                        img: 'Улицы Дома'
                    }
                ]
            }
        ]
    },
    {
        name: 'Папин Олимпос',
        img: 'Папин Олимпос',
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
        img: 'Vundabar',
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
        img: 'Vacations',
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
                if (song.name.toLowerCase().includes(searchValue)) {
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
                document.getElementById(`playAlbum-${count}`).addEventListener("click", playAlbumSong.bind(this, count, possibleOrder))
                count += 1
                possibleOrder.push(song)
                }
            })
        })
    })
}

document.getElementById("search").addEventListener("keyup", updateSearch)

updateSearch()