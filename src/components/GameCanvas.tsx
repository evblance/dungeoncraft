import React, { Component } from 'react';
import Position from '../classes/position.class';
import Player from '../classes/player.class';
import Enemy from '../classes/enemy.class';
import Entity from '../classes/entity.class';
import GameWorld from '../classes/game-world.class';
import { EControlKeys } from '../enums/control-keys.enum';
import { CONSTANTS } from '../data/constants.data';
import styled from 'styled-components';

interface GameCanvasProps {
    input: EControlKeys | undefined,
}

interface GameCanvasState {
    gameWorld: GameWorld,
}

class GameCanvas extends Component<GameCanvasProps, GameCanvasState> {

    canvasRef: any;
    canvasContext: any;

    constructor(props: GameCanvasProps) {
        super(props);
        this.state = {
            gameWorld: new GameWorld(),
        }
        this.canvasRef = React.createRef<HTMLCanvasElement>();
    }

    componentDidMount() {
        this.initCanvas();
    }

    componentWillUpdate(nextProps: GameCanvasProps, nextState: GameCanvasState) {
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

    getGameWorld(): GameWorld {
        return this.state.gameWorld;
    }

    initCanvas(): void {
        this.canvasContext = this.canvasRef.current.getContext('2d');
        this.renderWelcomeText();
        this.generateEntities();
        this.generateLayout();
        // TODO: Optimise to render only entities visible to player camera; ie. those not under fog-of-war
        this.renderEntities();
        this.renderStaticObjects();
    }

    clearCanvas(): void {
        this.canvasContext.clearRect(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
    }

    updateCanvas(): void {
        this.detectCollisions();
        this.clearCanvas();
        this.renderEntities();
        this.renderStaticObjects();
    }

    handleInput(input: EControlKeys | undefined): void {
        const player = this.getGameWorld().getGameObjectByClass(Player) as Player;
        player.move(input!);
    }

    detectCollisions(): void {
        // TODO:
    }

    getRandomGridPosition(): Position {
        const randomX = Math.floor(Math.random() * this.canvasRef.current.width);
        const randomY = Math.floor(Math.random() * this.canvasRef.current.height);
        return new Position(
            CONSTANTS.GRID_UNIT*Math.floor(randomX/CONSTANTS.GRID_UNIT),
            CONSTANTS.GRID_UNIT*Math.floor(randomY/CONSTANTS.GRID_UNIT)
        );
    }
    
    generateEntities(): void {
        const gameWorld = this.getGameWorld();
        const player: Player = new Player(this.getRandomGridPosition());
        for (let i = 0; i < 10; i++) {
            gameWorld.getContext().push(new Enemy(this.getRandomGridPosition()));
        }
        gameWorld.getContext().push(player);
        this.setState({ gameWorld });
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
        const player = this.getGameWorld().getGameObjectByClass(Player) as Player;
        const playerPosition = player.getWorldPosition();
        this.canvasContext.fillStyle = player.getColour();
        this.canvasContext.fillRect(playerPosition.x, playerPosition.y, CONSTANTS.PLAYER_SCALE, CONSTANTS.PLAYER_SCALE);
    }

    renderEnemies(): void {
        const enemies = this.getGameWorld().getGameObjectsByClass(Enemy) as Enemy[];
        enemies.forEach((enemy: Enemy) => {
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