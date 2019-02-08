import GameObject from './game-object.class';
import Position from './position.class';
import { IQuadBounds } from '../interfaces/quad-bounds.interface';
import { CONSTANTS } from '../data/constants.data';

export default class Collider extends GameObject {

    dx: number;
    dy: number;

    public getColliderBounds(position: Position): IQuadBounds {
        const topLeft = new Position(position.x - this.dx, position.y - this.dy);
        const topRight = new Position(position.x + this.dx, position.y - this.dy);
        const bottomLeft = new Position(position.x - this.dx, position.y + this.dy);
        const bottomRight = new Position(position.x + this.dx, position.y + this.dy);
        return {
            TOP_LEFT: topLeft,
            TOP_RIGHT: topRight,
            BOTTOM_LEFT: bottomLeft,
            BOTTOM_RIGHT: bottomRight,
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