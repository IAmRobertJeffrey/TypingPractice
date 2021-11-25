import React from 'react'
import { Wrapper } from '../styles/TypeGame.styled';
import StartScreen from './StartScreen';
import GameScreen from './GameScreen';
import EndScreen from './EndScreen';
import { useContext } from 'react';
import GameContext from '../context/GameContext';

const TypeGame = ({ mode }) => {
    const { gameStart, currentTime, currentTimeLimit, resultsShown } = useContext(GameContext)

    return (
        <Wrapper>
            {
                !gameStart && currentTime === 20 && !resultsShown
                    ?
                    <StartScreen />
                    :
                    currentTime > 0 && gameStart && !resultsShown &&
                    <GameScreen />
            }
            {
                currentTime >= 0 && resultsShown &&
                <EndScreen />
            }
        </Wrapper>
    )
}

export default TypeGame
