import Entity from './entity.class';
import { EFaction } from '../enums/faction.enum';
import { CONSTANTS } from '../data/constants.data';
import Position from './position.class';

export default class Player extends Entity {

    constructor(worldPosition?: Position) {
        super();
        this.worldPosition = worldPosition || new Position(0, 0);
        this.faction = EFaction.PLAYER;
        this.colour = CONSTANTS.PLAYER_DEFAULT_COLOUR;
    }

}