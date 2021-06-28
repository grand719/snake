import { HandleElement } from './HandleElement.js';
import { CANVAS_ELEMENT_ID } from './DrawField.js';

class DrawSnake extends HandleElement {
    constructor() {
        super(CANVAS_ELEMENT_ID);
    }

    drawSnakeElement(x, y, width, height) {
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(x, y, width, height);
    }
    drawSnakeApple(x, y, width, height) {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(x, y, width, height);
    }
}
export const drawSnake = new DrawSnake();