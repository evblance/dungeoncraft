import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';

class App extends Component {
  render() {
    return (
        <React.Fragment>
            <AppTitle>Dungeon Crawler</AppTitle>
        </React.Fragment>
    );
  }
}

export default App;

const AppTitle = styled.h1`
    color: var(--tertiaryColour);
    font: 3rem var(--headingFont);
    text-align: center;
`