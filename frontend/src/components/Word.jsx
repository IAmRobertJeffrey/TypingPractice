import React from 'react'
import { Wrapper, Score, ScoreWrapper } from '../styles/Word.styled'

const Word = ({currentWord, score, currentTime}) => {
    return (
        <Wrapper>
            <ScoreWrapper>
                <Score>
                    <p>{score}</p>
                </Score>
                <Score>
                    <p>{currentTime % 10 === 0 ? `${currentTime / 10}.0` : currentTime / 10}</p>
                </Score>
            </ScoreWrapper>
            <p>{currentWord}</p>
        </Wrapper>
    )
}

export default Word
