import React from 'react'
import { Wrapper } from '../styles/Header.styled'

const Header = () => {
    const sendData = async (pollObject) => {
        const postOpt = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
           
          },
          body: JSON.stringify({userId: "roberto", password:"robert"}),
        };
    
        const response = await fetch("http://localhost:4024/auth/login", postOpt)
        const data = await response.json();
        console.log(data);
      };
    return (
        <Wrapper>
            <p style={ {fontFamily:"Poppins", fontSize:"2rem", marginLeft:"25px"} }>Typing Practice</p>
            <button onClick={sendData}>Click me</button>
        </Wrapper>
    )
}

export default Header
