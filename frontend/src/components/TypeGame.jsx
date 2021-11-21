import React from 'react'
import { Wrapper } from '../styles/TypeGame.styled';
import StartScreen from './StartScreen';
import GameScreen from './GameScreen';
import EndScreen from './EndScreen';
import { useContext } from 'react';
import GameContext from '../context/GameContext';

const TypeGame = () => 
{
    const {gameStart, currentTime, currentTimeLimit, resultsShown} = useContext(GameContext)

    return ( 
        <Wrapper>
            {
                !gameStart && currentTime === 0 && !resultsShown
                ?  
                    <StartScreen/>  
                :
                currentTime < currentTimeLimit && gameStart && !resultsShown &&
                    <GameScreen/>    
            }   
            {
                currentTime <= currentTimeLimit && resultsShown && 
               
                    <EndScreen/>
            }
        </Wrapper>
    )
}

export default TypeGame
