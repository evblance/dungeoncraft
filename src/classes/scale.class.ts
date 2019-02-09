import IVector2D from "../interfaces/vector-2d.interface";
import { CONSTANTS } from '../data/constants.data';

export default class Scale {

    public x: number;
    public y: number;

    constructor(
        vector2D: IVector2D = {X: CONSTANTS.GRID_UNIT, Y: CONSTANTS.GRID_UNIT},
    ) {
        this.x = vector2D.X;
        this.y = vector2D.Y;
    }

}