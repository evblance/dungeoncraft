import Entity from './entity.class';
import Position from './position.class';
import { EFaction } from '../enums/faction.enum';
import { CONSTANTS } from '../data/constants.data';

export default class Enemy extends Entity {

    constructor(worldPosition?: Position) {
        super();
        this.worldPosition = worldPosition || new Position(0, 0);
        this.faction = EFaction.ENEMY;
        this.colour = CONSTANTS.ENEMY_DEFAULT_COLOUR;
    }

}