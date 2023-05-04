let artists = [
    {
        name: 'Saluki',
        albums: [
            {
                name: 'Wild East',
                artist: 'Saluki',
                img: '1000 Rad',
                songs: [
                    {
                        name: '1000 Rad',
                        artist: 'Saluki',
                        audio: '1000 Rad',
                        img: '1000 Rad'
                    }
                ]
            }
        ]
    }
]

let songs = [
    {
        name: 'Alien Blues',
        artist: 'Vundabar',
        audio: 'Alien',
        img: 'Alien'
    },
    {
        name: 'Young',
        artist: 'Vacations',
        audio: 'Young',
        img: 'Young'
    },
    {
        name: 'Телу тоже больно',
        artist: 'Папин Олимпос',
        audio: 'Телу тоже больно',
        img: 'Телу тоже больно'
    },
    {
        name: '1000 Rad',
        artist: 'Saluki',
        audio: '1000 Rad',
        img: '1000 Rad'
    }
]

let index = 0
let audio = new Audio()
audio.volume = 0.05
let shuffle = false
let repeat = false

function fillOrder(songs) {
    let order = document.getElementById("order-tracks")
    while (order.firstChild) {
        order.firstChild.remove()
    }
    songs.forEach(song => {
        let list_item = document.createElement('li')
        list_item.draggable = true
        list_item.innerHTML = `<div class="track__card-mini">
        <img draggable="false" src="img/${song.img}.png" class="track__img-mini">
        <div class="track__description">
            <p class="track__title">${song.name}</p>
            <p class="track__subtitle">${song.artist}</p>
        </div> 
    </div>`
        order.appendChild(list_item)
    });
}

function loadSong(song) {
    let player = document.getElementById("curr-track")
    player.innerHTML = `<img src="img/${song.img}.png" class="player__track__img">
    <div class="player__track__description">
        <p class="player__track__description__title">${song.name}</p>
        <p class="player__track__description__subtitle">${song.artist}</p>
    </div>`
    audio.src = `audio/${song.audio}.mp3`
}

document.getElementById("play").addEventListener("click", playSong)
document.getElementById("next").addEventListener("click", nextSong)
document.getElementById("prev").addEventListener("click", prevSong)
document.getElementById("shuffle").addEventListener("click", shuffleSong)
document.getElementById("repeat").addEventListener("click", repeatSong)
audio.addEventListener("timeupdate", updateProgress)
audio.addEventListener("ended", nextSong)
document.getElementById("full-bar").addEventListener("click", setProgress)
document.getElementById("full-volume").addEventListener("click", setVolume)
document.getElementById("search").addEventListener('keyup', updateSearch)

function playSong() {
    if (audio.paused) {
        audio.play()
        document.getElementById("play").firstElementChild.src = "img/pause.svg"
    }
    else {
        audio.pause()
        document.getElementById("play").firstElementChild.src = "img/play.svg"
    }
}

function nextSong() {
    index += 1
    if (index == songs.length) {
        index = 0
    }
    audio.pause()
    loadSong(songs[index])
    audio.play()
}

function prevSong() {
    index -= 1
    if (index == -1) {
        index = 0
    }
    audio.pause()
    loadSong(songs[index])
    audio.play()
}

function shuffleSong() {
    if (!shuffle) {
        shuffle = true
        document.getElementById("shuffle").firstElementChild.classList.add("icon-white")
    }
    else {
        shuffle = false
        document.getElementById("shuffle").firstElementChild.classList.remove("icon-white")
    }
}

function repeatSong() {
    if (!repeat) {
        repeat = true
        document.getElementById("repeat").firstElementChild.classList.add("icon-white")
    }
    else {
        repeat = false
        document.getElementById("repeat").firstElementChild.classList.remove("icon-white")
    }
}

function updateProgress(song) {
    let {duration, currentTime} = song.srcElement
    if (duration.toString() == "NaN") {
        duration = 0
    }
    let progressPercent = (currentTime / duration) * 100
    let currMin = Math.floor(currentTime / 60)
    let currSec = Math.floor(currentTime % 60)
    document.getElementById("curr-time").innerHTML = currSec > 10 ? `${currMin}:${currSec}` : `${currMin}:0${currSec}`
    let fullMin = Math.floor(duration / 60)
    let fullSec = Math.floor(duration % 60)
    document.getElementById("full-time").innerHTML = fullSec > 10 ? `${fullMin}:${fullSec}` : `${fullMin}:0${fullSec}`
    document.getElementById("progress").style.width = `${progressPercent}%`
}

function setProgress(progress) {
    audio.currentTime = (progress.offsetX / this.clientWidth) * audio.duration
}

function setVolume(volume) {
    audio.volume = volume.offsetX / this.clientWidth
    document.getElementById("volume").style.width = `${audio.volume * 100}%`
    document.getElementById("curr-volume").innerHTML = `${Math.trunc(audio.volume * 100)}%`
}

document.getElementById("order-tracks").addEventListener(`dragstart`, (evt) => {
    evt.target.classList.add(`selected`);
  })
  
  document.getElementById("order-tracks").addEventListener(`dragend`, (evt) => {
    evt.target.classList.remove(`selected`);
  });

document.getElementById("order-tracks").addEventListener(`dragover`, (evt) => {
    evt.preventDefault();
  
    const activeElement = document.getElementById("order-tracks").querySelector(`.selected`);
    let currentElement = evt.target;
    while (currentElement.tagName !== "LI") {
        if (currentElement.tagName == "UL") {
            return
        }
        currentElement = currentElement.parentNode;
    }
    const isMoveable = activeElement !== currentElement
  
    if (!isMoveable) {
      return;
    }
  
    const nextElement = (currentElement === activeElement.nextElementSibling) ?
        currentElement.nextElementSibling : currentElement;
  
        document.getElementById("order-tracks").insertBefore(activeElement, nextElement);
        let index1 = Array.prototype.indexOf.call(currentElement.parentNode.children, currentElement);
        let index2 = Array.prototype.indexOf.call(activeElement.parentNode.children, activeElement);
        if (index == index1) {
            index = index2
        }
        else if (index == index2) {
            index = index1
        }
        [songs[index1], songs[index2]] = [songs[index2], songs[index1]] 
  });

function updateSearch() {
    let searchValue = ""
    if (typeof this !== "undefined") {
        searchValue = this.value.toLowerCase()
    }
    let tracksNode = document.getElementById("search-tracks")
    let albumsNode = document.getElementById("search-albums")
    let artistsNode = document.getElementById("search-artists")
    while (artistsNode.firstChild) {
        artistsNode.firstChild.remove()
    }
    while (albumsNode.firstChild) {
        albumsNode.firstChild.remove()
    }
    while (tracksNode.firstChild) {
        tracksNode.firstChild.remove()
    }
    artists.forEach(artist => {
        if (artist.name.toLowerCase().includes(searchValue)) {
            let list_item = document.createElement('li')
            list_item.innerHTML = `<a href="album.html">
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
                list_item.innerHTML = `<a href="album.html">
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
                    <button class="button-icon icon-red">
                        <img src="img/play.svg" class="icon">
                    </button>
                </div>`
                tracksNode.appendChild(list_item)
                }
            })
        })
    })
}


fillOrder(songs)
loadSong(songs[index])
updateSearch()

