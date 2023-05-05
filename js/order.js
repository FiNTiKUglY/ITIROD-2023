function openOrder() {
    let menu = document.getElementById("order")
    if (menu.style.width == "200px") {
        menu.removeAttribute("style")
    }
    else {
        menu.style.width = "200px"
    }
}

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

document.getElementById("order-button").addEventListener("click", openOrder)

export {fillOrder}