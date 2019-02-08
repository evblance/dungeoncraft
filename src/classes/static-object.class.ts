import Position from './position.class';
import GameObject from './game-object.class';
import Collider from './collider.class';
import { EStaticObjectType } from '../enums/static-object-type.enum';

export default class StaticObject extends GameObject {

    private type: EStaticObjectType;
    private colour: string;
    private collider: Collider;

    constructor(
        worldPosition: Position,
        type: EStaticObjectType,
        colour: string,
        collider?: Collider,
    ) {
        super();
        this.worldPosition = worldPosition;
        this.type = type;
        this.colour = colour;
        this.collider = collider || new Collider();
    }
    
}