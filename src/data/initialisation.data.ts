import { IGameData } from '../interfaces/game-data.interface';
import Position from '../classes/position.class';
import Player from '../classes/player.class';
import Enemy from '../classes/enemy.class';

export const INITIAL_GAMEDATA: IGameData = {
    player: new Player(),
    enemies: new Array<Enemy>(),
}