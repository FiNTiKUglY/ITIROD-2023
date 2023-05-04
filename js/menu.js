function openMenu() {
    let menu = document.getElementById("menu")
    if (menu.style.width == "100px") {
        menu.removeAttribute("style")   
    }
    else {
        menu.style.width = "100px"
    }
}

document.getElementById("menu-button").addEventListener("click", openMenu)
