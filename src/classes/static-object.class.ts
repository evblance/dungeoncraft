import Position from './position.class';
import Scale from './scale.class';
import GameObject from './game-object.class';
import Collider from './collider.class';
import { EStaticObjectType } from '../enums/static-object-type.enum';

export default class StaticObject extends GameObject {

    private type: EStaticObjectType;
    private colour: string;
    private collider: Collider;

    public getType(): EStaticObjectType {
        return this.type;
    }

    public getColour(): string {
        return this.colour;
    }

    public getCollider(): Collider {
        return this.collider;
    }

    constructor(
        worldPosition: Position,
        type: EStaticObjectType,
        colour: string,
        scale: Scale,
        collider?: Collider,
    ) {
        super();
        this.worldPosition = worldPosition;
        this.type = type;
        this.colour = colour;
        this.scale = scale || new Scale();
        this.collider = collider || new Collider();
    }
    
}