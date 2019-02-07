import React, { Component } from 'react';
import GameCanvas from './components/GameCanvas';
import { IGameData } from './interfaces/game-data.interface';
import { EControlKeys } from './enums/control-keys.enum';
import { CONSTANTS } from './data/constants.data';
import styled from 'styled-components';
import './App.css';

interface AppProps {}

interface AppState {
    lastInput: EControlKeys | undefined,
}

class App extends Component<AppProps, AppState> {

    inputListener: any;

    constructor(props: AppProps) {
        super(props);
        this.state = {
            lastInput: undefined,
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
                <GameCanvas input={this.state.lastInput} />
            </React.Fragment>
        );
    }

    listenForInput(): void {
        this.inputListener = window.addEventListener('keypress', (event: KeyboardEvent) => {
            event.preventDefault();
            this.setState({
                lastInput: event.key as EControlKeys,
            });
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