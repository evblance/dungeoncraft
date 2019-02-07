import Position from './position.class';
import GameObject from './game-object.class';
import { CONSTANTS } from '../data/constants.data';

export default class StaticObject extends GameObject {

    constructor(
        worldPosition: Position,
        colour: string,
    ) {
        super();
        this.worldPosition = worldPosition;
        this.colour = colour;
    }
}