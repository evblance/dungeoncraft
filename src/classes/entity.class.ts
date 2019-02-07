import Position from './position.class';
import GameObject from './game-object.class';
import { EFaction } from '../enums/faction.enum';
import { EEntityState } from '../enums/entity-state.enum';
import { CONSTANTS } from '../data/constants.data';

export default class Entity extends GameObject {

    protected faction: EFaction;

    private health: number;
    private state: EEntityState;

    public getFaction(): EFaction {
        return this.faction;
    }

    public getHealth(): number {
        return this.health;
    }

    public getState(): EEntityState {
        return this.state;
    }

    constructor(
        faction: EFaction = EFaction.NEUTRAL,
        worldPosition: Position = new Position(0, 0),
        health: number = 100,
        colour: string = CONSTANTS.ENTITY_DEFAULT_COLOUR,
        state: EEntityState = EEntityState.ALIVE,
    ) {
        super();
        this.faction = faction;
        this.worldPosition = worldPosition;
        this.health = health;
        this.colour = colour;
        this.state = state;
    }
}