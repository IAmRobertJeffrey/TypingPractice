import React from 'react'
import { BeginButton } from '../styles/App.styled'
import GameContext from '../context/GameContext'        
import { useContext } from 'react'
import { Score } from '../styles/EndScreen.styled'

const EndScreen = () => { 
    const {setGameStart, wpm, setResultsShown, resetGame} = useContext(GameContext)
   
    function handleRestart()
    {
        setResultsShown(false)
        setGameStart(false);
        resetGame();
    }

    return (
        <>
            <BeginButton onClick={handleRestart}>
                Restart
            </BeginButton>
            <Score><b>{wpm}</b> words per minute.</Score>
        </>
    )
}

export default EndScreen
