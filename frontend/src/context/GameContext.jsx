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
    const [resultsShown, setResultsShown] = useState(false);
    const [playedAGame, setPlayedAGame] = useState(false)

    //resets the game
    function resetGame()
    {
        setCurrentInput("");
        setCurrentTime(0);
        setTimerList([]);
        setScore(0)
        setResultsShown(false)
        setGameStart(true)
    }

    useEffect(() => 
    {
        //Checks whether you've typed incorrectly and resets you if you have.
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
     
        //This incremenets the score when you type correctly
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
        //starts a timer and checks whether the current time is over the limit, stops the game if it is.
        const timer = setInterval(() =>
        {
            if(currentTime < currentTimeLimit && gameStart)
            {
                setCurrentTime(currentTime + 1)
                setPlayedAGame(true);
            }
            else
            {
                clearInterval(timer)
                setGameStart(false)
                setCurrentTime(0)

                if(playedAGame)
                { 
                    setPlayedAGame(false)
                    setResultsShown(true)
                }
                
            }
        }, 100)
        
        return () => {
            clearInterval(timer)
        }
        
    }, [currentTimeLimit,currentTime, gameStart, setResultsShown, playedAGame])


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
            resetGame,
            resultsShown,
            setResultsShown
        }}>
        {children}
        </GameContext.Provider>
    )
}

export default GameContext