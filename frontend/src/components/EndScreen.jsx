import React from 'react'
import { BeginButton } from '../styles/App.styled'
import GameContext from '../context/GameContext'        
import { useContext } from 'react'

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
            <p>{wpm} words per minute.</p>
        </>
    )
}

export default EndScreen
