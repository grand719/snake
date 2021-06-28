export class HandleElement {
    constructor(element) {
        this.element = this.handleCanvas(element);
        this.ctx = this.element.getContext("2d");
    }

    handleCanvas(element) {
        const field = document.getElementById(element);
        return field;
    }
    handleDiv(element) {
        const div = document.querySelector(element);
        return div;
    }
}