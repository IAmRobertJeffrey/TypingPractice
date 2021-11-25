import React from 'react'
import { Wrapper, Nav, AuthSection } from '../styles/Header.styled'
import { useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext'

const Header = () => {
  const { username, getUserData, logout } = useContext(AuthContext)

  useEffect(() => {
    try {
      getUserData();
    } catch (err) {
      console.log(err);
    }


  }, [])

  function handleLogout() {
    logout();
  }

  return (
    <Wrapper>
      <Nav className="title" to="/">

        <p>Typing Practice</p>
      </Nav>
      {!username ?
        <AuthSection>
          <Nav to="/login">
            Log In
          </Nav>
          <Nav to="/register">
            Register
          </Nav>
        </AuthSection>
        :
        <AuthSection>
          <Nav to="/profile">
            {username}
          </Nav>
          <Nav onClick={handleLogout} to="/">
            Log Out
          </Nav>
        </AuthSection>
      }
    </Wrapper>
  )
}

export default Header
