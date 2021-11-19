import { Wrapper} from "../styles/App.styled";
import { useState } from "react";
import TypeGame from "./TypeGame";
import Header from "./Header";

function App() 
{
  const words = ["i", "hello", "there"];
  const [currentWord, setCurrentWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [currentInput, setCurrentInput] = useState("");
  const [currentTime, setCurrentTime] = useState(0)
  const [currentTimeLimit, setCurrentTimeLimit] = useState(50);
  const [timerList, setTimerList] = useState([]);
  const [wpm, setWpm]  = useState(0);
  const [gameStart, setGameStart] = useState(false)
  const [score, setScore] = useState(0);

  

  return (
    <Wrapper>
      <Header/>
      <TypeGame 
        score={score} 
        setScore={setScore} 
        words={words} 
        gameStart={gameStart} 
        setGameStart={setGameStart} 
        wpm={wpm}
        setWpm={setWpm} 
        timerList={timerList} 
        setTimerList={setTimerList}
        currentTime={currentTime} 
        setCurrentTime={setCurrentTime} 
        setCurrentTimeLimit={setCurrentTimeLimit} 
        currentTimeLimit={currentTimeLimit} 
        currentWord={currentWord} 
        setCurrentWord={setCurrentWord} 
        currentInput={currentInput} 
        setCurrentInput={setCurrentInput}
        />
  
    </Wrapper>
   
  );
}

export default App;
