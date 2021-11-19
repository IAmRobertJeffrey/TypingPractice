import { Wrapper, BeginButton } from "../styles/App.styled";
import { useState } from "react";
import TypeGame from "./TypeGame";

function App() 
{
  const [gameStart, setGameStart] = useState(false)


  return (
    <Wrapper>
      {
        gameStart === false ? 
        
        <BeginButton onClick={() => setGameStart(true)}>
          Begin
        </BeginButton>
        :
        <TypeGame/>
      }
      
    </Wrapper>
   
  );
}

export default App;
