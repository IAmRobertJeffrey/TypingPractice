import React, { useState, useEffect } from 'react'
import { UserInput } from '../styles/TypeGame.styled';
import { Wrapper } from '../styles/TypeGame.styled';
import Word from './Word'


const TypeGame = () => {
    const words = ["hi", "there", "brown", "cow"];
    const [currentWord, setCurrentWord] = useState(words[Math.floor(Math.random() * words.length)]);
    const [currentInput, setCurrentInput] = useState("");
    const [currentTime, setCurrentTime] = useState(0)

    const [score, setScore] = useState(0);
    const arrayOfCurrentWord = [];
    const arrayOfCurrentInput = [];

    useEffect(() => {
        const timer = setInterval(() =>{
            setCurrentTime(currentTime + 1)
        }, 100)
        
        return () => {
            clearInterval(timer)
        }
    }, [currentTime, setCurrentTime])

    for(let i = 0; i < currentWord.length; i++)
    {
        arrayOfCurrentWord.push(currentWord[i])
    }
    for(let i = 0; i < currentInput.length; i++)
    {      
        arrayOfCurrentInput.push(currentInput[i])
        if(arrayOfCurrentWord[i] !== arrayOfCurrentInput[i] && arrayOfCurrentInput.length > 0)
        {
            setCurrentInput("");
        }
    }
   
   
    
    useEffect(() => 
    {
      
        if(currentInput === currentWord)
        {
            setCurrentWord(words[Math.floor(Math.random() * words.length)])
            setCurrentInput("")
            setScore(s=> s + 1)
        }
    }, [currentInput, setCurrentWord, currentWord, words])

    return (
        <Wrapper>
            <Word currentTime={currentTime} score={score} word={currentWord}/>
            <UserInput autoFocus type="text" value={currentInput} onChange={(e) => setCurrentInput(e.target.value)}/>
        </Wrapper>
    )
}

export default TypeGame
