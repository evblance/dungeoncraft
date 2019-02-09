import Position from './position.class';
import Scale from './scale.class';
import { CONSTANTS } from '../data/constants.data';

export default class GameObject {

    protected worldPosition: Position;
    protected name: string;
    protected scale: Scale;

    public getWorldPosition(): Position {
        return this.worldPosition;
    }

    public getName(): string {
        return this.name;
    }

    public getScale(): Scale {
        return this.scale;
    }

    constructor(
        worldPosition: Position = new Position({X: 0, Y: 0}),
        scale: Scale = new Scale({X: CONSTANTS.GRID_UNIT, Y: CONSTANTS.GRID_UNIT}),
        name?: string,
    ) {
        this.worldPosition = worldPosition;
        this.scale = scale;
        this.name = name || `New ${this.constructor.name}`;
    }

}