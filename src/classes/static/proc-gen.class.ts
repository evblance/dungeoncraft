import _Collision from './collision.class';
import GameWorld from '../game-world.class';
import GameObject from '../game-object.class';
import StaticObject from '../static-object.class';
import Entity from '../entity.class';
import Position from '../position.class';
import Scale from '../scale.class';
import Collider from '../collider.class';
import Player from '../player.class';
import Enemy from '../enemy.class';
import { IBoundingRect } from '../../interfaces/bounding-rect.interface';
import { EStaticObjectType } from '../../enums/static-object-type.enum';
import { EFaction } from '../../enums/faction.enum';
import { ECompassDirection } from '../../enums/compass-direction.enum';
import { CONSTANTS } from '../../data/constants.data';

export default class _ProcGen {

    public static generateLayout(world: GameWorld, canvasRef: any): GameWorld {

        const renderableWidth = canvasRef.current.width;
        const renderableHeight = canvasRef.current.height;
    
        const hWallScale = new Scale({X: canvasRef.current.width, Y: CONSTANTS.GRID_UNIT});
        const vWallScale = new Scale({X: CONSTANTS.GRID_UNIT, Y: canvasRef.current.height - 2 * CONSTANTS.GRID_UNIT});
        const dungeonWallColour = CONSTANTS.DUNGEON_COLOUR;

        // Make dungeon walls
        world.getContext().push(
            new StaticObject(
                new Position({X: 0, Y: 0}),
                EStaticObjectType.WALL,
                dungeonWallColour,
                hWallScale,
                new Collider(new Scale({X: hWallScale.x, Y: hWallScale.y})),
                `North Wall`,
            ),
        );
        world.getContext().push(
            new StaticObject(
                new Position({X: 0, Y: renderableHeight - CONSTANTS.GRID_UNIT}),
                EStaticObjectType.WALL,
                dungeonWallColour,
                hWallScale,
                new Collider(new Scale({X: hWallScale.x, Y: hWallScale.y})),
                `South Wall`,
            ),
        );
        world.getContext().push(
            new StaticObject(
                new Position({X: 0, Y: CONSTANTS.GRID_UNIT}),
                EStaticObjectType.WALL,
                dungeonWallColour,
                vWallScale,
                new Collider(new Scale({X: vWallScale.x, Y: vWallScale.y})),
                `West Wall`,
            ),
        );
        world.getContext().push(
            new StaticObject(
                new Position({X: renderableWidth - CONSTANTS.GRID_UNIT, Y: CONSTANTS.GRID_UNIT}),
                EStaticObjectType.WALL,
                dungeonWallColour,
                vWallScale,
                new Collider(new Scale({X: vWallScale.x, Y:vWallScale.y})),
                `East Wall`,
            ),
        );

        // Make rooms
        const wallScale = new Scale({X: CONSTANTS.GRID_UNIT, Y: CONSTANTS.GRID_UNIT});
        const wallColour = CONSTANTS.WALL_COLOUR;
        const minWallSectionULength = 10;
        const maxWallSectionULength = CONSTANTS.GRID_UNIT*Math.floor(50/CONSTANTS.GRID_UNIT);
        const numRooms = 30;

        const getNextWallDirection = (direction: ECompassDirection): ECompassDirection => {
            const directionRoll = Math.random();
            // Our new direction can either be the same EDirection, or (EDirection + 1) % 4 or (EDirection - 1) % 4,
            // since we must exclude the direction we came from.
            let nextDirection: ECompassDirection;
            if (directionRoll > 0.66) {
                nextDirection = direction;
            } else if (directionRoll > 0.33) {
                nextDirection = (direction + 1) % 4;
            } else {
                nextDirection = ((direction - 1) % 4) < 0 ? 4 + (direction - 1) % 4 : (direction - 1) % 4;
            }
            return nextDirection;
        };

        const drawWallSection = (length: number, startingPosition: Position, direction: ECompassDirection): Position => {
            let nextSpace = startingPosition;
            for (let i = 0; i < length; i++) {
                switch(direction) {
                    case ECompassDirection.NORTH:
                        nextSpace = new Position({X: nextSpace.x, Y: nextSpace.y - CONSTANTS.GRID_UNIT});
                        break;
                    case ECompassDirection.EAST:
                        nextSpace = new Position({X: nextSpace.x + CONSTANTS.GRID_UNIT, Y: nextSpace.y});
                        break;
                    case ECompassDirection.SOUTH:
                        nextSpace = new Position({X: nextSpace.x, Y: nextSpace.y + CONSTANTS.GRID_UNIT});
                        break;
                    case ECompassDirection.WEST:
                        nextSpace = new Position({X: nextSpace.x - CONSTANTS.GRID_UNIT, Y: nextSpace.y});
                        break;
                    default:
                        break;
                }

                if (this.isGridSpaceAvailable(world, nextSpace, wallScale)) {

                    const newWall = new StaticObject(
                        new Position({X: nextSpace.x, Y: nextSpace.y}),
                        EStaticObjectType.WALL,
                        wallColour,
                        wallScale,
                        new Collider(),
                        `Wall`,
                    );
                    world.getContext().push(newWall);
                    continue;
                } else {
                    // If the next space is not available, we stop drawing this section and move to the next
                    break;
                }
            }
            return nextSpace;
        };

        const drawDoorWallSection = (length: number, startingPosition: Position, direction: ECompassDirection): Position => {
            let bDoorMade: boolean = false;
            let nextSpace: Position = startingPosition;
            for (let i = 0; i < length; i++) {
                switch(direction) {
                    case ECompassDirection.NORTH:
                        nextSpace = new Position({X: nextSpace.x, Y: nextSpace.y - CONSTANTS.GRID_UNIT});
                        break;
                    case ECompassDirection.EAST:
                        nextSpace = new Position({X: nextSpace.x + CONSTANTS.GRID_UNIT, Y: nextSpace.y});
                        break;
                    case ECompassDirection.SOUTH:
                        nextSpace = new Position({X: nextSpace.x, Y: nextSpace.y + CONSTANTS.GRID_UNIT});
                        break;
                    case ECompassDirection.WEST:
                        nextSpace = new Position({X: nextSpace.x - CONSTANTS.GRID_UNIT, Y: nextSpace.y});
                        break;
                    default:
                        break;
                }

                if (!bDoorMade) {
                    const doorRoll = Math.random();
                    if (doorRoll > 0.7 || i === length - 1) {
                        bDoorMade = true;
                        continue;
                    }
                } else {
                    if (this.isGridSpaceAvailable(world, nextSpace, wallScale)) {

                        const newWall = new StaticObject(
                            new Position({X: nextSpace.x, Y: nextSpace.y}),
                            EStaticObjectType.WALL,
                            wallColour,
                            wallScale,
                            new Collider(),
                            `Wall`,
                        );
                        world.getContext().push(newWall);
                        continue;
                    } else {
                        // If the next space is not available, we stop drawing this section and move to the next
                        break;
                    }
                }
            }
            return nextSpace;
        };

        const drawRoom = () => {
            // Create up to three wall sections, with the first being in the chosen direction and then either left, forward or right.
            let bHasExit: boolean = false;
            for (let s = 0; s < 3; s++) {
                const wallSectionLength = CONSTANTS.GRID_UNIT * Math.floor(
                    (Math.random()*(maxWallSectionULength - minWallSectionULength) + minWallSectionULength
                ) / CONSTANTS.GRID_UNIT);

                const exitRoll = Math.random();
                let endPosition: Position = new Position();
                if (!bHasExit && (exitRoll > 0.7 || s === 2)) {
                    endPosition = drawDoorWallSection(wallSectionLength, startingPosition, direction);
                    bHasExit = true;
                } else {
                    endPosition = drawWallSection(wallSectionLength, startingPosition, direction);
                }
                startingPosition = endPosition;
                direction = getNextWallDirection(direction);
            }
        };

        // Get our initial starting position from the bounds excluding the dungeon walls
        const startingPositionX = CONSTANTS.GRID_UNIT * Math.floor(
            Math.random() * (renderableWidth - CONSTANTS.GRID_UNIT) / CONSTANTS.GRID_UNIT
        ) + CONSTANTS.GRID_UNIT;
        const startingPositionY = CONSTANTS.GRID_UNIT;
        let startingPosition = new Position({X: startingPositionX, Y: startingPositionY});
        // Let our first draw direction be to the south (+Y)
        let direction: ECompassDirection = ECompassDirection.SOUTH;

        // Draw the room boundaries
        for (let r = 0; r < numRooms; r++) {
            drawRoom();
            startingPosition = new Position(
                {
                    X: CONSTANTS.GRID_UNIT * Math.floor(
                        Math.random() * (renderableWidth - CONSTANTS.GRID_UNIT) / CONSTANTS.GRID_UNIT
                    ) + CONSTANTS.GRID_UNIT,
                    Y: CONSTANTS.GRID_UNIT * Math.floor(
                        Math.random() * (renderableHeight - CONSTANTS.GRID_UNIT) / CONSTANTS.GRID_UNIT
                    ) + CONSTANTS.GRID_UNIT,
                }
            );
        }

        const escapeDoorScale = new Scale({X: 2*CONSTANTS.GRID_UNIT, Y: 2*CONSTANTS.GRID_UNIT});
        const escapeDoorColour = CONSTANTS.DOOR_COLOUR;

        // Place dungeon escape door
        this.placeStaticObject(world, canvasRef, `Escape Door`, escapeDoorScale, EStaticObjectType.DOOR, escapeDoorColour);

        // TODO: Place weapons

        return world;
    }

    public static generateEntities(world: GameWorld, canvasRef: any): GameWorld {

        // TODO: Make these more precise values be used in the player and enemy placement,
        // which elimnate the dungeon walls from the available entity placement area.
        // const renderableWidth = canvasRef.current.width - 2 * CONSTANTS.GRID_UNIT;
        // const renderableHeight = canvasRef.current.height - 2 * CONSTANTS.GRID_UNIT;

        // Place player
        this.placePlayer(
            world,
            canvasRef,
            `New Player`,
            new Scale({X: CONSTANTS.PLAYER_SIZE, Y: CONSTANTS.PLAYER_SIZE}),
            CONSTANTS.PLAYER_COLOUR,
        );

        // Place enemies
        for (let i = 0; i < 10; i++) {
            this.placeEnemy(
                world,
                canvasRef,
                `New Enemy`,
                new Scale({X: CONSTANTS.ENEMY_SIZE, Y: CONSTANTS.ENEMY_SIZE}),
                CONSTANTS.ENEMY_COLOUR,
            );
        }

        return world;
    }

    public static placeStaticObject(world: GameWorld, canvasRef: any, name: string, objectScale: Scale, objectType: EStaticObjectType, objectColour: string): boolean {
        let randomGridPos: Position;
        let generationTries: number = 0;
        do {
            randomGridPos = this.getRandomGridPosition(canvasRef);
            if (this.isGridSpaceAvailable(world, randomGridPos, objectScale)) {
                world.getContext().push(
                    new StaticObject(
                        randomGridPos,
                        objectType,
                        objectColour,
                        objectScale,
                        new Collider(new Scale({X: objectScale.x, Y: objectScale.y})),
                        name,
                    ),
                );
                return true;
            }
            generationTries++;
        } while (generationTries < 10);
        console.log(`ERROR: Could not place ${objectType} within a reasonable number of retries!`);
        return false;
    }

    public static placeEnemy(world: GameWorld, canvasRef: any, name: string, enemyScale: Scale, enemyColour: string): boolean {
        let randomGridPos: Position;
        let generationTries: number = 0;
        do {
            randomGridPos = this.getRandomGridPosition(canvasRef);
            if (this.isGridSpaceAvailable(world, randomGridPos, enemyScale)) {
                const newEnemy = new Enemy(
                    name,
                    randomGridPos,
                    EFaction.ENEMY,
                    enemyColour,
                    enemyScale,
                    new Collider(new Scale({X: enemyScale.x, Y: enemyScale.y})),
                );
                world.getContext().push(newEnemy);
                return true;
            }
            generationTries++;
        } while (generationTries < 10);
        console.log(`ERROR: Could not place enemy within a reasonable number of retries!`);
        return false;
    }

    public static placePlayer(world: GameWorld, canvasRef: any, name: string, playerScale: Scale, playerColour: string): boolean {
        let randomGridPos: Position;
        let generationTries: number = 0;
        do {
            randomGridPos = this.getRandomGridPosition(canvasRef);
            if (this.isGridSpaceAvailable(world, randomGridPos, playerScale)) {
                world.getContext().push(
                    new Player(
                        name,
                        randomGridPos,
                        EFaction.PLAYER,
                        playerColour,
                        playerScale,
                        new Collider(new Scale({X: playerScale.x, Y: playerScale.y})),
                    ),
                );
                return true;
            }
            generationTries++;
        } while (generationTries < 10);
        console.log(`ERROR: Could not place enemy within a reasonable number of retries!`);
        return false;
    }

    public static getRandomGridPosition(canvasRef: any): Position {
        const randomX = Math.floor(Math.random() * canvasRef.current.width);
        const randomY = Math.floor(Math.random() * canvasRef.current.height);
        return new Position({
            X: CONSTANTS.GRID_UNIT*Math.floor(randomX/CONSTANTS.GRID_UNIT),
            Y: CONSTANTS.GRID_UNIT*Math.floor(randomY/CONSTANTS.GRID_UNIT)
        });
    }

    // This function returns true if the position is available, taking into account 
    // all static objects and entities in the world and their scale.
    public static isGridSpaceAvailable(world: GameWorld, position: Position, scale: Scale): boolean {

        const prospectiveBounds: IBoundingRect = {
            LEFT: position.x,
            RIGHT: position.x + scale.x,
            TOP: position.y,
            BOTTOM: position.y + scale.y,
        };

        // We collect all the gameobjects that have colliders to compare their bounds
        // with the prospective.
        const staticObjects = world.getGameObjectsByClass(StaticObject) as GameObject[];
        const entities = world.getGameObjectsByClass(Entity) as GameObject[];
        let gameObjects: GameObject[] = new Array<GameObject>();
        if (staticObjects) {
            gameObjects = gameObjects.concat(staticObjects);
        }
        if (entities) {
            gameObjects = gameObjects.concat(entities);
        }

        // We compare the bounding rect of each gameobject with the the prospective
        // and fail the check if there is overlap.
        for (let gO of gameObjects) {
            const gOScale = gO.getScale();
            const gOPosition = gO.getWorldPosition();
            const gOBounds: IBoundingRect = {
                LEFT: gOPosition.x,
                RIGHT: gOPosition.x + gOScale.x,
                TOP: gOPosition.y,
                BOTTOM: gOPosition.y + gOScale.y,
            };
            if (_Collision.getCollidingArea(prospectiveBounds, gOBounds) > 0) {
                return false;
            };
        }

        return true;
    }

}