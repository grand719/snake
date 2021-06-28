import { HandleElement } from './HandleElement.js';

export const CANVAS_ELEMENT_ID = 'snake-field';
const CANVAS_HEIGHT = 400;
const CANVAS_WIDTH = 400;


class DrawField extends HandleElement {
    constructor() {
        super(CANVAS_ELEMENT_ID);
    }

    drawBoard(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }
}

export const drawField = new DrawField();