import {fillOrder} from "./order.js"

let songs = []
let index = 0
let audio = new Audio()
audio.volume = 0.05
let shuffle = false
let repeat = false

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
    playSong()
}

function prevSong() {
    index -= 1
    if (index == -1) {
        index = 0
    }
    audio.pause()
    loadSong(songs[index])
    playSong()
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

function loadSong(song) {
    let player = document.getElementById("curr-track")
    player.innerHTML = `<img src="img/${song.img}.png" class="player__track__img">
    <div class="player__track__description">
        <p class="player__track__description__title">${song.name}</p>
        <p class="player__track__description__subtitle">${song.artist}</p>
    </div>`
    audio.src = `audio/${song.audio}.mp3`
}

function playAlbumSong(newIndex, possibleOrder) {
    fillOrder(possibleOrder)
    console.log(possibleOrder)
    songs = possibleOrder
    index = newIndex
    loadSong(songs[index])
    playSong()
}

//--------------------drag&drop adaptive---------------------------------------

document.getElementById("order-tracks").addEventListener(`dragstart`, (evt) => {
    evt.target.classList.add(`selected`);
})
  
document.getElementById("order-tracks").addEventListener(`dragend`, (evt) => {
    evt.target.classList.remove(`selected`);
})

document.getElementById("order-tracks").addEventListener(`touchstart`, (evt) => {
    let currentElement = evt.targetTouches[0].target
    while (currentElement.tagName !== "LI") {
        if (currentElement.tagName == "UL") {
            return
        }
        currentElement = currentElement.parentNode;
    }
    currentElement.classList.add(`selected`);
})
  
document.getElementById("order-tracks").addEventListener(`touchend`, (evt) => {
    let currentElement = evt.changedTouches[0].target
    while (currentElement.tagName !== "LI") {
        if (currentElement.tagName == "UL") {
            return
        }
        currentElement = currentElement.parentNode;
    }
    currentElement.classList.remove(`selected`);
})

document.getElementById("order-tracks").addEventListener(`dragover`, (evt) => {
    evt.preventDefault();
  
    let activeElement = document.getElementById("order-tracks").querySelector(`.selected`)
    if (activeElement == null) {
        activeElement = document.getElementById("search-tracks").querySelector(`.selected`)
    }
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

document.getElementById("order-tracks").addEventListener(`touchmove`, (evt) => {
    evt.preventDefault();
  
    let activeElement = document.getElementById("order-tracks").querySelector(`.selected`)
    if (activeElement == null) {
        activeElement = document.getElementById("search-tracks").querySelector(`.selected`)
    }
    let currentElement = document.elementFromPoint(evt.changedTouches[0].clientX, evt.changedTouches[0].clientY)
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

//-------------------------------------------------------------------------------

document.getElementById("play").addEventListener("click", playSong)
document.getElementById("next").addEventListener("click", nextSong)
document.getElementById("prev").addEventListener("click", prevSong)
document.getElementById("shuffle").addEventListener("click", shuffleSong)
document.getElementById("repeat").addEventListener("click", repeatSong)
audio.addEventListener("timeupdate", updateProgress)
audio.addEventListener("ended", nextSong)
document.getElementById("full-bar").addEventListener("click", setProgress)
document.getElementById("full-volume").addEventListener("click", setVolume)

export {playAlbumSong}