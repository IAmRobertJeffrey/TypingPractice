import React from 'react'
import { Wrapper, Nav, AuthSection } from '../styles/Header.styled'


const Header = () => 
{
 
    // useEffect(() => 
    // {
    //   async function checkUser()
    //   {
    //     const postOpt = 
    //             {
    //                 method: "POST",
    //                 headers: 
    //                 {
    //                     "Content-Type": "application/json", 
                        
                        
    //                 },
    //                 body:localStorage.getItem("token")
                   
    //             };
       
    //     const response = await fetch("http://localhost:4024/game", postOpt)
    //     const data = await response.json();
    //     console.log(data);
    //   }
    //   checkUser();
     
    // }, [])
        

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
