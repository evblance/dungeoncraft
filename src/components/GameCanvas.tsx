import React, { Component } from 'react';
import { CONSTANTS } from '../data/constants.data';
import { IGameData } from '../interfaces/game-data.interface';
import styled from 'styled-components';

interface GameCanvasProps {
    gameData: IGameData,
}

interface GameCanvasState {

}

class GameCanvas extends Component<GameCanvasProps, GameCanvasState> {

    canvasRef: any;
    canvasContext: any;

    constructor(props: GameCanvasProps) {
        super(props);
        this.canvasRef = React.createRef<HTMLCanvasElement>();
    }

    componentDidMount() {
        this.initCanvas();
    }

    componentWillUpdate(nextProps: GameCanvasProps, nextState: GameCanvasState) {
        console.log(nextProps.gameData.playerPosition);
        console.log(nextProps.gameData.playerHealth);
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
    }

    renderStaticObjects(): void {
        // TODO: Render walls, obstructions, weapons
    }

    renderPlayer(): void {
        const { playerPosition } = this.props.gameData;
        this.canvasContext.fillStyle = CONSTANTS.PLAYER_COLOUR;
        this.canvasContext.fillRect(playerPosition.x, playerPosition.y, CONSTANTS.PLAYER_SCALE, CONSTANTS.PLAYER_SCALE);
    }

    renderEnemies(): void {
        // TODO: Render enemies
    }
}

export default GameCanvas;

const GameCanvasWrapper = styled.div`
    border: 1px solid var(--primaryColour);
    height: calc(100vh - 50px - 2rem);
`