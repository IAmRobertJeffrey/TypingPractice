import React from 'react'
import { BeginButton } from '../styles/App.styled'


const EndScreen = ({wpm, setGameStart}) => {
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
