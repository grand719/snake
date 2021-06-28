import { drawField, CANVAS_ELEMENT_ID } from './DrawField.js';
import { drawSnake } from './DrawSnake.js';
import { HandleElement } from './HandleElement.js';



class Game extends HandleElement {
    //rozmiar gracza i pola do gry
    PlayerWidth = 20;
    PlayerHeight = 20;
    CanvasWidth = 400;
    CanasHeight = 400;

    //tablica z kordynatami gracza i celu
    Tab = [];
    Px = 0;
    Py = 0;
    Ax = 100;
    Ay = 100;

    //dlugosc weza punkty oraz sprawdze nie przegranej
    SnakeLength = 5;
    Points = 0;
    lose = false;

    //ustawienie kierunku poruszania sie obiektu
    TopArrow = false;
    BottomArrow = false;
    LeftArrow = false;
    RightArrow = false;

    constructor() {
        super(CANVAS_ELEMENT_ID);

        this.RightArrow = true;

        this.endGameDiv = this.handleDiv(".endGame");
        this.endScore = this.handleDiv(".endScores");
        this.scores = this.handleDiv('h3');
        this.startButton = this.handleDiv('.buttonStart');
        this.startGame = this.handleDiv('.startGame');
        this.resetButton = this.handleDiv('.resetGame');

        this.startButton.addEventListener('click', () => this.game());

        this.resetButton.addEventListener('click', () => this.resetGame());

    }

    game() {
        this.startGame.classList.toggle('hidden');
        this.RightArrow = true;
        drawField.drawBoard(0, 0, 400, 400, 'black');
        document.addEventListener('keydown', (evt) => this.arrowEvent(evt));
        this.gameInteral = setInterval(() => this.moveSnake(), 1000 / 15);
        // setTimeout(() => setInterval(() => this.checkPlayerColision(), 1000 / 15), 2000);

        // if (this.lose === true) {
        //     clearInterval(() => this.checkPlayerColision());
        // }
    }

    resetGame() {


        this.Tab = [];

        this.SnakeLength = 5;
        this.Points = 0;
        this.lose = false;
        this.RightArrow = true;
        this.Px = 0;
        this.Py = 0;
        this.Ax = 100;
        this.Ay = 100;

        this.endGameDiv.classList.toggle('hidden');

        drawField.drawBoard(0, 0, 400, 400, 'black');

        document.addEventListener('keydown', (evt) => this.arrowEvent(evt));

        this.gameInteral = setInterval(() => this.moveSnake(), 1000 / 15);
        // setTimeout(() => setInterval(() => this.checkPlayerColision(), 1000 / 10), 2000);
    }

    moveSnake() {
        drawField.drawBoard(0, 0, 400, 400, 'black');
        drawSnake.drawSnakeApple(this.Ax, this.Ay, 20, 20);
        this.Tab.forEach(element => {
            drawSnake.drawSnakeElement(element.x, element.y, 20, 20);
        });


        if (this.RightArrow) {
            this.Px += 20;
        } else if (this.LeftArrow) {
            this.Px -= 20;
        } else if (this.TopArrow) {
            this.Py -= 20;
        } else if (this.BottomArrow) {
            this.Py += 20;
        }

        this.Tab.push({ x: this.Px, y: this.Py });
        while (this.Tab.length > this.SnakeLength) {
            this.Tab.shift();
        }

        this.checkPlayerColision();
        this.resetPosition();

        if (this.Px === this.Ax && this.Py === this.Ay) {
            this.SnakeLength++;
            this.Ax = Math.floor(Math.random() * 20) * 20;
            this.Ay = Math.floor(Math.random() * 20) * 20;
            this.countPoints();
            this.drawScores();
        }


        this.endGame()
    }

    checkPlayerColision() {
        for (let i = 1; i <= this.SnakeLength - 1; i++) {
            if (this.Tab.length <= 5) {
                return;
            }

            if (this.Px === 0 && this.Py === 0) {
                return;
            }
            if (this.Tab[0].x == this.Tab[i].x && this.Tab[0].y === this.Tab[i].y) {
                this.lose = true;
            }
        }
    }

    endGame() {
        if (this.lose === true) {
            clearInterval(this.gameInteral);
            this.drawEndScore();
        }

    }

    drawScores() {
        this.scores.innerText = `Scores: ${this.Points}`;
    }

    drawEndScore() {
        this.endGameDiv.classList.toggle('hidden');
        this.endScore.innerText = `Twój wyniki: ${this.Points + 5}`
    }

    countPoints() {
        this.Points = this.SnakeLength - 5;

        return this.Points;
    }

    resetPosition() {
        if (this.Px >= 401) {
            this.Px = 0;
        }
        if (this.Py >= 401) {
            this.Py = 0;
        }

        if (this.Py <= -1) {
            this.Py = 400;
        }
        if (this.Px <= -1) {
            this.Px = 400;
        }
    }

    arrowEvent(evt) {
        switch (evt.keyCode) {
            case 37:
                this.LeftArrow = true;
                this.TopArrow = false;
                this.BottomArrow = false;
                this.RightArrow = false;
                break;
            case 38:
                this.TopArrow = true;
                this.LeftArrow = false;
                this.BottomArrow = false;
                this.RightArrow = false;
                break;
            case 39:
                this.RightArrow = true;
                this.LeftArrow = false;
                this.TopArrow = false;
                this.BottomArrow = false;
                break;
            case 40:
                this.BottomArrow = true;
                this.LeftArrow = false;
                this.TopArrow = false;
                this.RightArrow = false;
                break;
        }



    }

}

const game = new Game();
console.log(game);