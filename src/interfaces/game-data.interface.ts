import Player from '../classes/player.class';
import Enemy from '../classes/enemy.class';

export interface IGameData {
    player: Player
    enemies: Enemy[],
}