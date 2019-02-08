import GameObject from './game-object.class';
import Position from './position.class';
import Collider from './collider.class';
import { EFaction } from '../enums/faction.enum';
import { EEntityState } from '../enums/entity-state.enum';
import { EControlKeys } from '../enums/control-keys.enum';
import { CONSTANTS } from '../data/constants.data';

export default class Entity extends GameObject {

    protected faction: EFaction;
    protected colour: string;
    protected collider: Collider;

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

    public getColour(): string {
        return this.colour;
    }

    public getCollider(): Collider {
        return this.collider;
    }

    public move(direction: EControlKeys): void {
        switch (direction) {
            case EControlKeys.UP:
                this.worldPosition.y -= CONSTANTS.MOVEMENT_UNIT;
                break;
            case EControlKeys.LEFT:
                this.worldPosition.x -= CONSTANTS.MOVEMENT_UNIT;
                break;
            case EControlKeys.RIGHT:
                this.worldPosition.x += CONSTANTS.MOVEMENT_UNIT;
                break;
            case EControlKeys.DOWN:
                this.worldPosition.y += CONSTANTS.MOVEMENT_UNIT;
                break;
            default:
                break;
        }
    }

    constructor(
        faction: EFaction = EFaction.NEUTRAL,
        worldPosition: Position = new Position(),
        health: number = 100,
        colour: string = CONSTANTS.ENTITY_DEFAULT_COLOUR,
        state: EEntityState = EEntityState.ALIVE,
        collider?: Collider,
    ) {
        super();
        this.faction = faction;
        this.worldPosition = worldPosition;
        this.health = health;
        this.colour = colour;
        this.state = state;
        this.collider = collider || new Collider();
    }

}