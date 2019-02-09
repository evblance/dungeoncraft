import GameObject from './game-object.class';
import Position from './position.class';
import Scale from './scale.class';
import IVector2D from '../interfaces/vector-2d.interface';
import { IBoundingRect } from '../interfaces/bounding-rect.interface';
import { CONSTANTS } from '../data/constants.data';

export default class Collider extends GameObject {

    scale: Scale;
    offset: IVector2D;

    public getBounds(position: Position): IBoundingRect {
        const top = position.y + this.offset.Y;
        const right =  position.x + this.scale.x + this.offset.X;
        const bottom = position.y + this.scale.y + this.offset.Y;
        const left = position.x + this.offset.X;
        return {
            TOP: top,
            RIGHT: right,
            BOTTOM: bottom,
            LEFT: left,
        };
    }

    constructor(
        scale: Scale = new Scale({X: CONSTANTS.ENTITY_DEFAULT_SCALE, Y: CONSTANTS.ENTITY_DEFAULT_SCALE}),
        offset: IVector2D = {X: 0, Y: 0},
    ) {
        super();
        this.scale = scale;
        this.offset = offset;
    }

}