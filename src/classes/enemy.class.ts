import Entity from './entity.class';
import Position from './position.class';
import Scale from './scale.class';
import Collider from './collider.class';
import { EFaction } from '../enums/faction.enum';
import { CONSTANTS } from '../data/constants.data';

export default class Enemy extends Entity {

    constructor(
        name: string = `New Enemy`,
        worldPosition: Position = new Position(),
        faction: EFaction = EFaction.ENEMY,
        colour: string = CONSTANTS.ENEMY_COLOUR,
        scale: Scale = new Scale({X: CONSTANTS.ENEMY_SIZE, Y: CONSTANTS.ENEMY_SIZE}),
        collider: Collider =  new Collider(),
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