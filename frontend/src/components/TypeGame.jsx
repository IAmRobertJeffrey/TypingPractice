import React, { useEffect } from 'react'
import { Wrapper } from '../styles/TypeGame.styled';
import StartScreen from './StartScreen';
import GameScreen from './GameScreen';
import EndScreen from './EndScreen';


const TypeGame = ({ score,setScore,words,gameStart,setGameStart,wpm,setWpm,timerList,setTimerList,currentTime,setCurrentTime,setCurrentTimeLimit,currentTimeLimit,currentWord,setCurrentWord,currentInput,setCurrentInput}) => 
{

    useEffect(() => 
    {
        const arrayOfCurrentWord = [];
        const arrayOfCurrentInput = [];
        setArraysForLetterChecking();
        function setArraysForLetterChecking()
            {
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
        }
     
        let initialArray = [];  
        if(currentInput === currentWord)
        {
            if(timerList.length > 0)
            {  
                timerList.map((current) => initialArray.push(current))
                initialArray.push(currentTime / 10)
                setTimerList(initialArray)
            }
            else
            {
                initialArray.push(currentTime / 10)
                setTimerList(initialArray)
            }  
            setCurrentWord(words[Math.floor(Math.random() * words.length)])
            setCurrentInput("")
            setScore(score + 1)
            setCurrentTime(0)
        }

    
    },[currentInput, currentTime, currentWord, score, setCurrentInput, setCurrentTime, setCurrentWord, setScore, setTimerList, timerList, words])
    
    useEffect(() => 
    {
        if(gameStart)
        {
            const timer = setInterval(() =>
            {
                setCurrentTime(currentTime + 1)
            }, 100)
            
            return () => {
                clearInterval(timer)
            }
        }
       
    }, [currentTime, gameStart, setCurrentTime])

    
    return ( 
        <Wrapper>
            {
                gameStart === false 
                ? 
                    <StartScreen setGameStart={setGameStart}/>
                :
                currentTime < currentTimeLimit && gameStart &&  
                    <GameScreen currentTime={currentTime} score={score} currentWord={currentWord} currentInput={currentInput} setCurrentInput={setCurrentInput}/>            
            }   
            {
                currentTime >= currentTimeLimit && gameStart &&   
                    <EndScreen wpm={wpm} setGameStart={setGameStart}/>
            }
        </Wrapper>
    )
}

export default TypeGame
