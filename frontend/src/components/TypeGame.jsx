import React from 'react'
import { Wrapper } from '../styles/TypeGame.styled';
import StartScreen from './StartScreen';
import GameScreen from './GameScreen';
import EndScreen from './EndScreen';
import { useContext } from 'react';
import GameContext from '../context/GameContext';

const TypeGame = () => 
{
    const {gameStart} = useContext(GameContext)
    const {currentTime} = useContext(GameContext)
    const {currentTimeLimit} = useContext(GameContext)
    
    
    return ( 
        <Wrapper>
            {
                gameStart === false 
                ? 
                    <StartScreen/>
                :
                currentTime < currentTimeLimit && gameStart &&  
                    <GameScreen/>            
            }   
            {
                currentTime >= currentTimeLimit && gameStart &&   
                    <EndScreen/>
            }
        </Wrapper>
    )
}

export default TypeGame
