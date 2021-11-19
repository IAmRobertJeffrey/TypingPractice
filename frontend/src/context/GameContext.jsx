import { createContext, useState, useEffect, useMemo} from "react";

const GameContext = createContext({});

export const GameProvidor = ({children}) => 
{
    const words = useMemo(() => ["i", "hello", "there"], []);
    const [currentWord, setCurrentWord] = useState(words[Math.floor(Math.random() * words.length)]);
    const [currentInput, setCurrentInput] = useState("");
    const [currentTime, setCurrentTime] = useState(0)
    const [currentTimeLimit, setCurrentTimeLimit] = useState(50);
    const [timerList, setTimerList] = useState([]);
    const [wpm, setWpm]  = useState(0);
    const [gameStart, setGameStart] = useState(false)
    const [score, setScore] = useState(0);

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


    return(
        <GameContext.Provider value={{
            score,
            setScore,
            words,
            gameStart,
            setGameStart,
            wpm,
            setWpm,
            timerList,
            setTimerList,
            currentTime,
            setCurrentTime,
            setCurrentTimeLimit,
            currentTimeLimit,
            currentWord,
            setCurrentWord,
            currentInput,
            setCurrentInput,
        }}>
        {children}
        </GameContext.Provider>
    )
}

export default GameContext