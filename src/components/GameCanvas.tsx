import React, { Component } from 'react';
import StaticObject from '../classes/static-object.class';
import Player from '../classes/player.class';
import Enemy from '../classes/enemy.class';
import Entity from '../classes/entity.class';
import GameWorld from '../classes/game-world.class';
import _Collision from '../classes/static/collision.class';
import _ProcGen from '../classes/static/proc-gen.class';
import { ICollision } from '../interfaces/collision.interface';
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

    componentDidMount(): void {
        this.initCanvas();
    }

    componentDidUpdate() {
        this.handleInput(this.props.input);
        this.updateCanvas();
    }

    render() {
        return (
            <GameCanvasWrapper>
                <canvas
                    ref={this.canvasRef}
                    width={CONSTANTS.CANVAS_WIDTH}
                    height={CONSTANTS.CANVAS_HEIGHT}
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
        this.generateLayout();
        this.generateEntities();
        // TODO: Optimise to render only entities visible to player camera; ie. those not under fog-of-war
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
        const player = this.getGameWorld().getGameObjectByClass(Player) as Player;
        player.move(input!);
        this.resolvePlayerCollisions(player, input!);
        // TODO
        //this.doNextEntityAction(player, input!);
    }

    resolvePlayerCollisions(player: Player, input: EControlKeys): void {
        const playerCollisions = this.getCollisions(player);
        if (!playerCollisions.length) { return };
        console.log(playerCollisions);
        player.recoil(input!);
    }

    doNextEntityAction(entity: Entity, input: EControlKeys): void {
        // TODO
    }

    getCollisions(actor: StaticObject | Entity): ICollision[] {
        const gameWorld = this.getGameWorld();
        const objectCollBnds: any = actor.getCollider()!.getBounds(actor.getWorldPosition());
        const entities = gameWorld.getGameObjectsByClass(Entity) as Entity[];
        const staticObjects = gameWorld.getGameObjectsByClass(StaticObject) as StaticObject[];

        const collisions: ICollision[] = new Array<ICollision>();
        if (entities) {
            for (let entity of entities) {
                // Friendly entity collisions are ignored
                if (actor instanceof Entity && entity.getFaction() === actor.getFaction()) { continue; }
    
                const collisionArea = _Collision.getCollidingArea(
                    objectCollBnds,
                    entity.getCollider()!.getBounds(entity.getWorldPosition())
                );
                if (collisionArea > 0) {
                    collisions.push({collisionArea, collidingObject: entity});
                }
            }
        }

        if (staticObjects) {
            for (let s of staticObjects) {
                const collisionArea = _Collision.getCollidingArea(
                    objectCollBnds,
                    s.getCollider()!.getBounds(s.getWorldPosition())
                );
                if (collisionArea > 0) {
                    collisions.push({collisionArea, collidingObject: s});
                }
            }
        }

        return collisions;       
    }
    
    generateEntities(): void {
        const updatedWorld = _ProcGen.generateEntities(this.getGameWorld(), this.canvasRef);
        this.setState({ gameWorld: updatedWorld });
    }

    generateLayout(): void {
        const generatedWorld = _ProcGen.generateLayout(this.getGameWorld(), this.canvasRef);
        this.setState({ gameWorld: generatedWorld });
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
            this.canvasContext.fillText(
                lines[l],
                window.innerWidth/2,
                window.innerHeight/2 - 16*5*lines.length + 16*5*l
            );
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
        // TODO: Render rooms, weapons
        const statics = this.getGameWorld().getGameObjectsByClass(StaticObject) as StaticObject[];
        statics.forEach((s: StaticObject) => {
            const position = s.getWorldPosition();
            const scale = s.getScale();
            this.canvasContext.fillStyle = s.getColour();
            this.canvasContext.fillRect(
                position.x,
                position.y,
                scale.x,
                scale.y,
            );
        });
    }

    renderPlayer(): void {
        const player = this.getGameWorld().getGameObjectByClass(Player) as Player;
        const playerPosition = player.getWorldPosition();
        const playerScale = player.getScale();
        this.canvasContext.fillStyle = player.getColour();
        this.canvasContext.fillRect(
            playerPosition.x,
            playerPosition.y,
            playerScale.x,
            playerScale.y,
        );
    }

    renderEnemies(): void {
        const enemies = this.getGameWorld().getGameObjectsByClass(Enemy) as Enemy[];
        enemies.forEach((enemy: Enemy) => {
            const position = enemy.getWorldPosition();
            const scale = enemy.getScale();
            this.canvasContext.fillStyle = enemy.getColour();
            this.canvasContext.fillRect(
                position.x,
                position.y,
                scale.x,
                scale.y,
            );
        });
    }
}

export default GameCanvas;

const GameCanvasWrapper = styled.div`
    border: 2px solid var(--primaryColour);
    margin: 2rem auto;
    height: ${CONSTANTS.CANVAS_HEIGHT}px;
    width:  ${CONSTANTS.CANVAS_WIDTH}px;
`