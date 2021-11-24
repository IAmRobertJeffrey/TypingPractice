import React from 'react'
import {Wrapper, AuthForm} from '../styles/Auth.styled'
import AuthContext from '../context/AuthContext'
import { useContext, useEffect } from 'react'

const Register = () => {

  const { username, 
    setUsername,
    password,  
    setPassword, 
    setRegistering,
    verifyPassword,
    setVerifyPassword,
    setLoggingIn,
    register
  } = useContext(AuthContext)

  useEffect(() => {
    setRegistering(true);
    setLoggingIn(false);
  }, [setLoggingIn, setRegistering])

    function handleSubmit(e)
    {
        e.preventDefault();
        register();
    }

    return (
        <Wrapper>
            <AuthForm onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="username">Username</label>
                <input id="username" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Username" type="text"/>
                <label htmlFor="password">Password</label>
                <input id="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" type="password"/>
                <label htmlFor="verifyPassword">Verify Password</label>
                <input id="verifyPassword" onChange={(e) => setVerifyPassword(e.target.value)} value={verifyPassword} placeholder="Verify Password" type="password"/>
                <button type="submit">Register</button>
           </AuthForm>
        </Wrapper>
    )
}

export default Register
