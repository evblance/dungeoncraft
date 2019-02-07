export default class Position {

    x: number;
    y: number;

    constructor(obj?: any) {
        this.x = obj && obj.x || null
        this.y = obj && obj.y || null
    }
}