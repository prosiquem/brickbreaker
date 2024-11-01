document.querySelector("#start-button").onclick = function () {
    document.querySelector("#start-screen").style.display = "none"
    document.querySelector("#game-screen").style.display = "block"
    Game.init()
}
