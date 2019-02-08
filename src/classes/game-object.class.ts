import Position from './position.class';

export default class GameObject {
 
    protected worldPosition: Position;
    protected name: string;

    public getWorldPosition(): Position {
        return this.worldPosition;
    }

    public getName(): string {
        return this.name;
    }

    constructor(
        worldPosition: Position = new Position(0, 0),
        name?: string,
    ) {
        this.worldPosition = worldPosition;
        this.name = name || `New ${this.constructor.name}`;
    }

}