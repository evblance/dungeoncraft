import { IGameData } from '../interfaces/game-data.interface';
import Position from '../classes/position.class';

export const INITIAL_GAMEDATA: IGameData = {
    playerPosition: new Position({x: 0, y: 0}),
    playerHealth: 100,
}