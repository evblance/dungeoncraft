import Position from './position.class';

export default class GameObject {
 
    protected worldPosition: Position;
    protected colour: string;

    public getWorldPosition(): Position {
        return this.worldPosition;
    }

    public getColour(): string {
        return this.colour;
    }

    constructor(
        worldPosition: Position = new Position(0, 0),
        colour: string = `rgba(0,0,0,0)`,
    ) {
        this.worldPosition = worldPosition;
        this.colour = colour;
    }

}