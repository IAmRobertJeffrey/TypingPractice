import React from 'react'
import { BeginButton } from '../styles/App.styled'

const StartScreen = ({setGameStart}) => {
    return (
        <BeginButton onClick={() => setGameStart(true)}>
            Begin
        </BeginButton>
    )
}

export default StartScreen
