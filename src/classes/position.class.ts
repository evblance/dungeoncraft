import IVector2D from "../interfaces/vector-2d.interface";

export default class Position {

    public x: number;
    public y: number;

    constructor(
        vector2D: IVector2D = {X: 0, Y: 0},
    ) {
        this.x = vector2D.X;
        this.y = vector2D.Y;
    }

}