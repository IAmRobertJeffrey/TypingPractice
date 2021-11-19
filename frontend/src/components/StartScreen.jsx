import React from 'react'
import { BeginButton } from '../styles/App.styled'
import GameContext from '../context/GameContext'
import { useContext } from 'react'

const StartScreen = () => {
    const {setGameStart} = useContext(GameContext)
    return (
        <BeginButton onClick={() => setGameStart(true)}>
            Begin
        </BeginButton>
    )
}

export default StartScreen
