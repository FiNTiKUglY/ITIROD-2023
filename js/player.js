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
    }
]

let index = 0
let audio = new Audio("music")

function fillOrder(songs) {
    let order = document.getElementById("order-tracks")
    while (order.firstChild) {
        order.firstChild.remove()
    }
    songs.forEach(song => {
        let list_item = document.createElement('li')
        list_item.innerHTML = `<div class="track__card-mini">
        <img src="img/${song.img}.png" class="track__img-mini">
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
    audio.src = `music/${song.audio}.mp3`
}

document.getElementById("play").addEventListener("click", playSong)

function playSong() {
    audio.play()
}

fillOrder(songs)
loadSong(songs[index])

