import React from 'react'
import { BeginButton } from '../styles/App.styled'
import GameContext from '../context/GameContext'        
import { useContext } from 'react'

const EndScreen = () => { 
    const {setGameStart} = useContext(GameContext)
    const {wpm} = useContext(GameContext)

    return (
        <>
            <p>You lose! {wpm}</p>
            <BeginButton onClick={() => setGameStart(true)}>
                Restart
            </BeginButton>
        </>
    )
}

export default EndScreen
