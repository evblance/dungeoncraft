import Entity from './entity.class';
import Position from './position.class';
import Scale from './scale.class';
import Collider from './collider.class';
import { EFaction } from '../enums/faction.enum';
import { CONSTANTS } from '../data/constants.data';

export default class Player extends Entity {

    constructor(
        name: string = `New Player`,
        worldPosition: Position = new Position(),
        faction: EFaction = EFaction.PLAYER,
        colour: string = CONSTANTS.PLAYER_COLOUR,
        scale: Scale = new Scale({X: CONSTANTS.PLAYER_SIZE, Y: CONSTANTS.PLAYER_SIZE}),
        collider: Collider = new Collider(),
    ) {
        super();
        this.name = name;
        this.worldPosition = worldPosition;
        this.faction = faction;
        this.colour = colour;
        this.scale = scale;
        this.collider = collider;
    }

}