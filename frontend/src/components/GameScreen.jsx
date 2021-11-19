import React from 'react'
import Word from './Word'
import { UserInput } from '../styles/TypeGame.styled'

const GameScreen = ({currentTime, score, currentWord, currentInput, setCurrentInput}) => {
    return (
        <>
            <Word currentTime={currentTime} score={score} currentWord={currentWord}/>
            <UserInput autoFocus type="text" value={currentInput} onChange={(e) => setCurrentInput(e.target.value)}/>
        </>
    )
}

export default GameScreen
