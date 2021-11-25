import React from 'react'
import { useContext, useEffect } from 'react'
import { Wrapper } from '../styles/Auth.styled'
import AuthContext from '../context/AuthContext'
import { AuthForm } from '../styles/Auth.styled'

const Login = () => {
  const { username,
    setUsername,
    password,
    setPassword,
    setLoggingIn,
    setRegistering,
    login
  } = useContext(AuthContext)


  useEffect(() => {
    setRegistering(false);
    setLoggingIn(true);
  }, [setLoggingIn, setRegistering])


  function handleSubmit(e) {

    e.preventDefault()
    login()
  }

  return (
    <Wrapper>
      <AuthForm onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username">Username</label>
        <input id="username" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Username" type="text" />
        <label htmlFor="password">Password</label>
        <input id="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" type="password" />
        <button type="submit">Register</button>
      </AuthForm>
    </Wrapper>
  )
}

export default Login
