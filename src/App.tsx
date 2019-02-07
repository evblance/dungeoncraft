import React, { Component } from 'react';
import GameCanvas from './components/GameCanvas';
import { IGameData } from './interfaces/game-data.interface';
import { EControlKeys } from './enums/control-keys.enum';
import { INITIAL_GAMEDATA } from './data/initialisation.data';
import { CONSTANTS } from './data/constants.data';
import styled from 'styled-components';
import './App.css';

interface AppProps { }

interface AppState {
    gameData: IGameData
}

class App extends Component<AppProps, AppState> {

    inputListener: any;

    constructor(props: AppProps) {
        super(props);
        this.state = {
            gameData: INITIAL_GAMEDATA,
        }
    }

    componentDidMount() {
        this.listenForInput();
    }

    componentWillUnmount() {
        this.inputListener = null;
    }

    render() {
        return (
            <React.Fragment>
                <AppTitle>Dungeon Crawler</AppTitle>
                <GameCanvas gameData={this.state.gameData} />
            </React.Fragment>
        );
    }

    listenForInput(): void {
        this.inputListener = window.addEventListener('keypress', (event: KeyboardEvent) => {
            event.preventDefault();
            const { gameData } = this.state;
            switch (event.key) {
                case EControlKeys.UP:
                    gameData.playerPosition.y -= CONSTANTS.MOVEMENT_UNIT;
                    this.setState({ gameData });
                    break;
                case EControlKeys.LEFT:
                    gameData.playerPosition.x -= CONSTANTS.MOVEMENT_UNIT;
                    this.setState({ gameData });
                    break;
                case EControlKeys.RIGHT:
                    gameData.playerPosition.x += CONSTANTS.MOVEMENT_UNIT;
                    this.setState({ gameData });
                    break;
                case EControlKeys.DOWN:
                    gameData.playerPosition.y += CONSTANTS.MOVEMENT_UNIT;
                    this.setState({ gameData });
                    break;
                default:
                    console.log('no control key was pressed');
            }
        });
    }
}

export default App;

const AppTitle = styled.h1`
    color: var(--tertiaryColour);
    font: 3rem/50px var(--headingFont);
    height: 50px;
    margin: 1rem auto;
    padding: 0;
    text-align: center;
`