class Player {

    constructor(gameSize) {
        this.gameSize = gameSize

        this.playerSize = {
            width: 300,
            height: 35
        }

        this.minWidth = 200
        this.shrinkFactor = 0.9

        this.playerPos = {
            left: this.gameSize.width / 2 - this.playerSize.width / 2,
            top: this.gameSize.height - this.playerSize.height - 110
        }

        this.playerPhysics = {
            speed: {
                left: 10
            }
        }

        this.init()
    }

    init() {
        this.playerElement = document.createElement("img")
        this.playerElement.src = "./img/player.png"

        this.playerElement.style.position = "absolute"
        this.playerElement.style.width = `${this.playerSize.width}px`
        this.playerElement.style.height = `${this.playerSize.height}px`
        this.playerElement.style.left = `${this.playerPos.left}px`
        this.playerElement.style.top = `${this.playerPos.top}px`

        document.querySelector("#game-screen").appendChild(this.playerElement)
    }

    shrink() {

        if (this.playerSize.width > this.minWidth) {
            this.playerSize.width *= this.shrinkFactor

            this.playerPos.left = Math.min(this.playerPos.left, this.gameSize.width - this.playerSize.width)

            this.playerElement.style.width = `${this.playerSize.width}px`
            this.playerElement.style.left = `${this.playerPos.left}px`
        }
    }

    move() {
        this.playerElement.style.top = `${this.playerPos.top}px`
        this.playerElement.style.left = `${this.playerPos.left}px`
    }

    moveLeft() {
        if (this.playerPos.left > 0) {
            this.playerPos.left -= this.playerPhysics.speed.left
        }
    }

    moveRight() {
        if (this.playerPos.left < this.gameSize.width - this.playerSize.width) {
            this.playerPos.left += this.playerPhysics.speed.left
        }
    }

    resetPlayerPosition() {
        this.playerPos.left = this.gameSize.width / 2 - this.playerSize.width / 2

        this.playerElement.style.top = `${this.playerPos.top}px`
        this.playerElement.style.left = `${this.playerPos.left}px`
    }
}