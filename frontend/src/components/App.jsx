import { Wrapper} from "../styles/App.styled";

import TypeGame from "./TypeGame";
import Header from "./Header";
import { GameProvidor } from "../context/GameContext";
import { LoginProvidor } from "../context/LoginContext";
import Login from "./Login";
import { Route, Routes } from "react-router-dom";
import Register from "./Register";
import Home from './Home'

function App() 
{
  

  return (
    <Wrapper> 
      <Header/> 
      <Routes> 
      <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginProvidor><Login/></LoginProvidor>} />
        <Route path="/register" element={<LoginProvidor><Register/></LoginProvidor>} />
        <Route path="/practice" element={<GameProvidor><TypeGame mode={"practice"}/></GameProvidor>} />
        <Route path="/online" element={<GameProvidor><TypeGame mode={"online"}/></GameProvidor>} />
      </Routes>
    </Wrapper>
   
  );
}

export default App;
