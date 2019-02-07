import React, { Component } from 'react';
import Position from '../classes/position.class';
import Player from '../classes/player.class';
import Enemy from '../classes/enemy.class';
import { IGameData } from '../interfaces/game-data.interface';
import { EControlKeys } from '../enums/control-keys.enum';
import { INITIAL_GAMEDATA } from '../data/initialisation.data';
import { CONSTANTS } from '../data/constants.data';
import styled from 'styled-components';

interface GameCanvasProps {
    input: EControlKeys | undefined,
}

interface GameCanvasState {
    gameData: IGameData,
}

class GameCanvas extends Component<GameCanvasProps, GameCanvasState> {

    canvasRef: any;
    canvasContext: any;

    constructor(props: GameCanvasProps) {
        super(props);
        this.state = {
            gameData: INITIAL_GAMEDATA,
        }
        this.canvasRef = React.createRef<HTMLCanvasElement>();
    }

    componentDidMount() {
        this.initCanvas();
    }

    componentWillUpdate(nextProps: GameCanvasProps, nextState: GameCanvasState) {
        console.log(nextState);
        this.handleInput(nextProps.input);
        this.updateCanvas();
    }

    render() {
        return (
            <GameCanvasWrapper>
                <canvas
                    ref={this.canvasRef}
                    width={window.innerWidth}
                    height={window.innerHeight}
                />
            </GameCanvasWrapper>
        )
    }

    initCanvas(): void {
        this.canvasContext = this.canvasRef.current.getContext('2d');
        this.renderWelcomeText();
        this.generateEntities();
        this.generateLayout();
        this.renderEntities();
        this.renderStaticObjects();
    }

    clearCanvas(): void {
        this.canvasContext.clearRect(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
    }

    updateCanvas(): void {
        this.clearCanvas();
        this.renderEntities();
        this.renderStaticObjects();
    }

    handleInput(input: EControlKeys | undefined): void {
        const { gameData } = this.state;
        switch (input) {
            case EControlKeys.UP:
                gameData.player.getWorldPosition().y -= CONSTANTS.MOVEMENT_UNIT;
                break;
            case EControlKeys.LEFT:
                gameData.player.getWorldPosition().x -= CONSTANTS.MOVEMENT_UNIT;
                break;
            case EControlKeys.RIGHT:
                gameData.player.getWorldPosition().x += CONSTANTS.MOVEMENT_UNIT;
                break;
            case EControlKeys.DOWN:
                gameData.player.getWorldPosition().y += CONSTANTS.MOVEMENT_UNIT;
                break;
            default:
                break;
        }
    }

    getRandomPosition(): Position {
        const randomX = Math.floor(Math.random() * this.canvasRef.current.width);
        const randomY = Math.floor(Math.random() * this.canvasRef.current.height);
        return new Position(randomX, randomY);
    }
    
    generateEntities(): void {
        const player: Player = new Player(this.getRandomPosition());
        let enemies: Enemy[] = new Array<Enemy>();
        for (let i = 0; i < 10; i++) {
            enemies.push(new Enemy(this.getRandomPosition()));
        }
        const { gameData } = this.state;
        gameData.player = player;
        gameData.enemies = enemies;
        this.setState({ gameData });
    }

    generateLayout(): void {
        // TODO: Generate walls, obstructions, weapons
    }

    getTextLines(canvasContext: any, text: string, maxWidth: number): string[] {
        const words: string[] = text.split(' ');
        const lines: string[] = [];
        let currentLine = words[0];
        for (let w = 1; w < words.length; w++) {
            const word = words[w];
            const currentLineWidth = canvasContext.measureText(`${currentLine} ${word}`).width;
            if (currentLineWidth < maxWidth) {
                currentLine += ` ${word}`;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    }

    renderTextLines(lines: string[]): void {
        for (let l = 0; l < lines.length; l++) {
            this.canvasContext.fillText(lines[l], window.innerWidth/2, window.innerHeight/2 - 16*5*lines.length + 16*5*l);
        }
    }

    renderWelcomeText(): void {
        this.clearCanvas();
        this.canvasContext.font = `5rem 'Nanum Gothic Coding'`;
        this.canvasContext.textAlign = 'center';
        const welcomeTextLines = this.getTextLines(this.canvasContext, 'Welcome to Dungeon Crawler!', 500);
        this.renderTextLines(welcomeTextLines);
    }

    renderEntities(): void {
        this.renderPlayer();
        this.renderEnemies();
    }

    renderStaticObjects(): void {
        // TODO: Render walls, obstructions, weapons
    }

    renderPlayer(): void {
        const { player }: { player: Player } = this.state.gameData;
        const playerPosition = player.getWorldPosition();
        this.canvasContext.fillStyle = player.getColour();
        this.canvasContext.fillRect(playerPosition.x, playerPosition.y, CONSTANTS.PLAYER_SCALE, CONSTANTS.PLAYER_SCALE);
    }

    renderEnemies(): void {
        const { enemies }: { enemies: Enemy[] } = this.state.gameData;
        enemies.forEach((enemy) => {
            const position = enemy.getWorldPosition();
            this.canvasContext.fillStyle = enemy.getColour();
            this.canvasContext.fillRect(position.x, position.y, CONSTANTS.ENEMY_SCALE, CONSTANTS.ENEMY_SCALE);
        });
    }
}

export default GameCanvas;

const GameCanvasWrapper = styled.div`
    border: 1px solid var(--primaryColour);
    height: calc(100vh - 50px - 2rem);
`