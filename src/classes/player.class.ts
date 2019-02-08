import Entity from './entity.class';
import Position from './position.class';
import Collider from './collider.class';
import { EFaction } from '../enums/faction.enum';
import { CONSTANTS } from '../data/constants.data';

export default class Player extends Entity {

    constructor(worldPosition?: Position, collider?: Collider) {
        super();
        this.worldPosition = worldPosition || new Position();
        this.faction = EFaction.PLAYER;
        this.colour = CONSTANTS.PLAYER_DEFAULT_COLOUR;
        this.collider = collider || new Collider();
    }

}