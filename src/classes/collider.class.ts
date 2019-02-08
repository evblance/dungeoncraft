import GameObject from './game-object.class';
import Position from './position.class';
import { IBoundingRect } from '../interfaces/bounding-rect.interface';
import { CONSTANTS } from '../data/constants.data';

export default class Collider extends GameObject {

    dx: number;
    dy: number;

    public getBounds(position: Position): IBoundingRect {
        const top = position.y - this.dy;
        const right =  position.x + this.dx;
        const bottom = position.y + this.dy;
        const left = position.x - this.dx;

        return {
            TOP: top,
            RIGHT: right,
            BOTTOM: bottom,
            LEFT: left,
        };
    }

    constructor(
        dx: number = CONSTANTS.ENTITY_DEFAULT_SCALE / 2,
        dy: number = CONSTANTS.ENTITY_DEFAULT_SCALE / 2,
    ) {
        super();
        this.dx = dx;
        this.dy = dy;
    }

}