import React from 'react'
import { Wrapper, Score, ScoreWrapper } from '../styles/Word.styled'

const Word = ({word, score, currentTime}) => {
    return (
        <Wrapper>
            <ScoreWrapper>
            <Score><p>{score}</p></Score>
            <Score><p>{currentTime / 10}</p></Score>
            </ScoreWrapper>
            <p>{word}</p>
        </Wrapper>
    )
}

export default Word
