import { Wrapper} from "../styles/App.styled";

import TypeGame from "./TypeGame";
import Header from "./Header";
import { GameProvidor } from "../context/GameContext";

function App() 
{

  return (
    <Wrapper>  
      <Header/>
      <GameProvidor>
        <TypeGame />
      </GameProvidor>
    </Wrapper>
   
  );
}

export default App;
