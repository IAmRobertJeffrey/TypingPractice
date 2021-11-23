import React, { useEffect } from 'react'
import { Wrapper, Nav, AuthSection } from '../styles/Header.styled'
import AuthContext from '../context/AuthContext'   
import { useContext } from 'react'

const Header = () => 
{

  // const postOpt = 
  //       {
  //         method: "POST",
  //         headers: 
  //         {
  //           "Content-Type": "application/json", 
  //         },
  //         body:{userId: "roberty", password:"robert"},
  //       };
    
  //       const response = await fetch("http://localhost:4024/auth/login", postOpt)
  //       const data = await response.json();
  //       console.log(data);

  const {loginCheck} = useContext(AuthContext)

    function handleLogin()
    {
        loginCheck();
    }

    useEffect(() => 
    {
      async function checkUser()
      {
        const response = await fetch("http://localhost:4024/game")
        const data = await response.json();
        console.log(data);
      }
      checkUser();
     
    }, [])
        

    return (
        <Wrapper>
          <Nav className="title" to="/">
            <p>Typing Practice</p>
          </Nav>
          <AuthSection>
            <Nav to="/login">
              Log In
            </Nav>
            <Nav to="/register">
              Register
            </Nav>
          </AuthSection>
        </Wrapper>
    )
}

export default Header
