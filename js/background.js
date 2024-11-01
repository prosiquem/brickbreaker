class Background {

    constructor(gameSize) {

        this.gameSize = gameSize

        this.backgroundSize = {
            width: gameSize.width,
            height: gameSize.height
        }
        this.backgroundPos = {
            left: 0,
            top: 0
        }

        this.init()
    }

    init() {
        this.backgroundElement = document.createElement("img")
        this.backgroundElement.src = "./img/background3.gif"

        this.backgroundElement.style.zIndex = "-1"
        this.backgroundElement.style.position = "absolute"
        this.backgroundElement.style.width = `${this.backgroundSize.width}px`
        this.backgroundElement.style.height = `${this.backgroundSize.height}px`
        this.backgroundElement.style.left = `${this.backgroundPos.left}px`
        this.backgroundElement.style.top = `${this.backgroundPos.top}px`

        document.querySelector("#game-screen").appendChild(this.backgroundElement)
    }
}