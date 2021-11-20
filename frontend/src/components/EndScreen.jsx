import React from 'react'
import { BeginButton } from '../styles/App.styled'
import GameContext from '../context/GameContext'        
import { useContext } from 'react'

const EndScreen = () => { 
    const {setGameStart, wpm, setResultsShown} = useContext(GameContext)
   
    function handleRestart()
    {
        setResultsShown(false)
        setGameStart(false);
    }

    return (
        <>
            <p>{wpm} words per minute.</p>
            <BeginButton onClick={handleRestart}>
                Restart
            </BeginButton>
        </>
    )
}

export default EndScreen
