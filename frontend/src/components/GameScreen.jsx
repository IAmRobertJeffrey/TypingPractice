import React from 'react'
import Word from './Word'
import { UserInput } from '../styles/TypeGame.styled'
import { useContext } from 'react'
import GameContext from '../context/GameContext'

const GameScreen = () => {
    const { currentTime } = useContext(GameContext)
    const { score } = useContext(GameContext)
    const { currentWord } = useContext(GameContext)
    const { currentInput } = useContext(GameContext)
    const { setCurrentInput } = useContext(GameContext)
    const { currentTimeLimit } = useContext(GameContext)
    return (
        <>
            <Word currentTime={currentTime} score={score} currentWord={currentWord} />
            <UserInput autoFocus type="text" value={currentInput} onChange={(e) => setCurrentInput(e.target.value)} />
            <h2>{currentTimeLimit / 10} second limit per word!</h2>
        </>
    )
}

export default GameScreen
