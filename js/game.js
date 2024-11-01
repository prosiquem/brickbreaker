const Game = {

    name: "Brick breaker",
    author: "Aaron y Pedro",
    version: "1.0",
    license: undefined,

    ball: undefined,
    player: undefined,
    bricks: [],
    bricksDestroyed: 0,
    lifes: 3,
    lostLifes: 0,

    backgroundMusic: new Audio('Audio/Legacy.mp3'),
    destroySound: new Audio('Audio/explosion.mp3'),
    lifeLostSound: new Audio('Audio/lifeLost.mp3'),
    winSound: new Audio('Audio/win.mp3'),
    gameOverSound: new Audio('Audio/pacman-dies.mp3'),
    shotSound: new Audio('Audio/pinball.wav'),

    keys: {
        LEFT: "ArrowLeft",
        RIGHT: "ArrowRight",
        SPACE: "Space"
    },

    pressedKeys: {
        LEFT: false,
        RIGHT: false,
        SPACE: false
    },

    gameSize: {
        width: window.innerWidth,
        height: window.innerHeight
    },

    init() {
        this.resetGame()
        this.setDimensions()
        this.start()

        document.querySelector("#popup-screen").style.display = "none"
        document.querySelector("#game-over-screen").style.display = "none"
        document.querySelector("#win-screen").style.display = "none"

        this.backgroundMusic.loop = true
        this.backgroundMusic.volume = 0.4

        document.addEventListener('click', () => {
            this.backgroundMusic.play().then(() => {
            })
        }, { once: true })
    },

    setDimensions() {
        document.querySelector("#game-screen").style.width = `${this.gameSize.width}px`
        document.querySelector("#game-screen").style.height = `${this.gameSize.height}px`
    },

    start() {
        this.createElements()
        this.setEventListeners()

    },

    createElements() {
        this.background = new Background(this.gameSize)
        this.player = new Player(this.gameSize)
        this.ball = new Ball(this.gameSize, this.player.playerPos)
        this.lifes = new Lifes(this.gameSize, this.lifes)
        this.createBricks()
    },

    createBricks() {

        bricksData.forEach(eachBrick => {
            this.bricks.push(new Bricks(this.gameSize, eachBrick))
        })
    },

    startGameLoop() {
        if (!this.gameLoop) {
            this.gameLoop = setInterval(() => {
                this.moveAll()
            }, 10)
        }
    },

    moveAll() {
        if (this.pressedKeys.LEFT) this.player.moveLeft()
        if (this.pressedKeys.RIGHT) this.player.moveRight()

        this.ball.move()
        this.player.move()

        this.checkCollisionWithPlayer()

        this.checkCollisionWithBricks()
    },

    resetGame() {
        this.bricks = []
        this.bricksDestroyed = 0
        this.lifes = 3
        this.lostLifes = 0

        document.querySelector("#game-screen").innerHTML = ''

        if (this.gameLoop) {
            clearInterval(this.gameLoop)
            this.gameLoop = null
        }

    },

    checkCollisionWithPlayer() {
        const ballBottom = this.ball.ballPos.top + this.ball.ballSize.height
        const playerTop = this.player.playerPos.top
        const ballCenter = this.ball.ballPos.left + this.ball.ballSize.width / 2

        if (
            ballBottom >= playerTop &&
            ballCenter > this.player.playerPos.left &&
            ballCenter < this.player.playerPos.left + this.player.playerSize.width
        ) {
            this.shotSound.currentTime = 0
            this.shotSound.volume = 0.6
            this.shotSound.play()
            this.ball.turnVertical()

        } else if (ballBottom >= this.gameSize.height) {
            this.lifes.removeLife()

            this.lifeLostSound.currentTime = 0
            this.lifeLostSound.play()

            if (this.lifes.lifeElements.length === 0) {
                clearInterval(this.gameLoop)
                this.showGameOverScreen()


            } else {
                this.showPopUpScreen()
            }
        }
    },

    showGameOverScreen() {
        document.querySelector("#game-over-screen").style.display = "flex"

        this.gameOverSound.currentTime = 0
        this.gameOverSound.play()

        document.querySelector("#retry-button").onclick = () => {
            document.querySelector("#game-over-screen").style.display = "none"
            this.resetGame()
            this.start()
            this.setEventListeners()
        }
    },

    showPopUpScreen() {
        document.querySelector("#popup-screen").style.display = "flex"
        clearInterval(this.gameLoop)

        document.querySelector("#ok-button").onclick = () => {
            document.querySelector("#popup-screen").style.display = "none"
            this.ball.resetBallPosition()
            this.player.resetPlayerPosition()
            this.gameLoop = null
        }
    },

    setEventListeners() {
        document.onkeydown = event => {
            if (event.code === this.keys.LEFT) this.pressedKeys.LEFT = true
            if (event.code === this.keys.RIGHT) this.pressedKeys.RIGHT = true
            if (event.code === this.keys.SPACE) {
                if (document.querySelector("#popup-screen").style.display === "none") {
                    this.startGameLoop()
                }
            }
        }

        document.onkeyup = event => {
            if (event.code === this.keys.LEFT) this.pressedKeys.LEFT = false
            if (event.code === this.keys.RIGHT) this.pressedKeys.RIGHT = false
        }
    },

    checkCollisionWithBricks() {
        const ballTop = this.ball.ballPos.top
        const ballBottom = ballTop + this.ball.ballSize.height
        const ballLeft = this.ball.ballPos.left
        const ballRight = ballLeft + this.ball.ballSize.width

        this.bricks.forEach((brick, index) => {
            const brickTop = brick.brickSpecs.top
            const brickBottom = brickTop + brick.bricksSize.height
            const brickLeft = brick.brickSpecs.left
            const brickRight = brickLeft + brick.bricksSize.width

            if (
                ballBottom >= brickTop && ballTop <= brickBottom &&
                ballRight >= brickLeft && ballLeft <= brickRight
            ) {
                this.ball.turnVertical()
                this.player.shrink()
                brick.changeBrick()

                this.destroySound.currentTime = 0
                this.destroySound.volume = 0.6
                this.destroySound.play()

                if (brick.isDestroyed()) {

                    brick.brickElement.remove()
                    this.bricks.splice(index, 1)
                }
            }
        })


        if (this.bricks.length === 0) {
            this.showWinScreen()
            clearInterval(this.gameLoop)
        }
    },


    showWinScreen() {
        document.querySelector("#win-screen").style.display = "flex"

        this.winSound.currentTime = 0
        this.winSound.play()

        document.querySelector("#play-again-button").onclick = () => {
            document.querySelector("#win-screen").style.display = "none"
            this.resetGame()
            this.start()
            this.setEventListeners()
        }
    }


}