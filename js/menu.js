import {logout, currentUser} from "./firebase.js"

function openMenu() {
    let menu = document.getElementById("menu")
    if (menu.style.width == "100px") {
        menu.removeAttribute("style")   
    }
    else {
        menu.style.width = "100px"
    }
}

function loadMenu() {
    let menu = document.getElementById("menu")
    if (document.cookie.includes('user=')) {
        menu.innerHTML = `<nav>
            <div class="menu__item menu__item-size menu__logo">
                <img src="img/sound-mute.svg" class="menu__icon">
                <h1 class="white-title white-title-size">Лого</h1>
            </div>
            <hr>
            <div class="menu__item menu__item-size menu__profile">
                <a>
                    <img src="img/profile.svg" class="menu__icon">
                </a>
                <div class="link-container">
                    <a class="menu__link">${currentUser.name}</a>
                    <a class="menu__sublink" id="logout">Выйти</a>
                </div>
            </div>
            <hr>
            <a class="menu__link" href="index.html">
                <div class="menu__item menu__item-size menu__main">
                    <button class="button-icon">
                        <img src="img/home.svg" class="menu__icon">
                    </button>
                    <p class="link-container">Главная</p>
                </div>
            </a>
            <hr>
            <a class="menu__link" href="favourite.html">
                <div class="menu__item menu__item-size menu__main">
                    <button class="button-icon">
                        <img src="img/heart.svg" class="menu__icon">
                    </button>
                    <p class="link-container">Любимые</p>
                </div>
            </a>
            <hr>
            <div class="menu__albums">
                <h1 class="white-title white-title-size">Альбомы</h1>
                <hr>
                <ul class="link-container" id="fav-albums">
                </ul>
            </div>
        </nav>`
        document.getElementById("logout").addEventListener("click", logout)

        let fav_albums = document.getElementById("fav-albums")
        if (currentUser && currentUser.albums) {
            currentUser.albums.forEach(album => {
                if (album != null) {
                    let list_item = document.createElement("li")
                    list_item.innerHTML = `<a class="menu__sublink" href="album.html#${album}">${album}</a>`
                    fav_albums.appendChild(list_item)
                }
            })
        }     
    } 
    else {
        menu.innerHTML = `<nav>
            <div class="menu__item menu__item-size menu__logo">
                <img src="img/sound-mute.svg" class="menu__icon">
                <h1 class="white-title white-title-size">Лого</h1>
            </div>
            <hr>
            <div class="menu__item menu__item-size menu__profile">
                <a href="login.html">
                    <img src="img/profile.svg" class="menu__icon">
                </a>
                <div class="link-container">
                    <a href="login.html" class="menu__link">Войти</a>
                    <a href="signup.html" class="menu__sublink">Регистрация</a>
                </div>
            </div>
            <hr>
            <a class="menu__link" href="index.html">
                <div class="menu__item menu__item-size menu__main">
                    <button class="button-icon">
                        <img src="img/home.svg" class="menu__icon">
                    </button>
                    <p class="link-container">Главная</p>
                </div>
            </a>
            <hr>
        </nav>`
    }
}

loadMenu()
document.getElementById("menu-button").addEventListener("click", openMenu)
