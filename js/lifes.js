class Lifes {
    constructor(gameSize) {
        this.gameSize = gameSize

        this.lifeElements = []

        this.lifesPos = {

            lifes: [
                {
                    top: 83,
                    left: this.gameSize.width - 210
                },

                {
                    top: 133,
                    left: this.gameSize.width - 210
                },

                {
                    top: 183,
                    left: this.gameSize.width - 210
                }

            ]
        }

        this.lifesSize = {
            width: 80,
            height: 80
        }


        this.init()
    }

    init() {
        this.lifesPos.lifes.forEach((pos) => {
            const lifeElement = document.createElement("img")

            lifeElement.src = "./img/lifes3.gif"
            lifeElement.style.position = "absolute"
            lifeElement.style.width = `${this.lifesSize.width}px`
            lifeElement.style.height = `${this.lifesSize.height}px`
            lifeElement.style.top = `${pos.top}px`
            lifeElement.style.left = `${pos.left}px`


            document.querySelector("#game-screen").appendChild(lifeElement)
            this.lifeElements.push(lifeElement)
        })
    }

    removeLife() {
        if (this.lifeElements.length > 0) {
            const lastLifeElement = this.lifeElements.pop()
            lastLifeElement.remove()
        }
    }
}
