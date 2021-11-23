import React from 'react'
import { useContext } from 'react'
import {Wrapper} from '../styles/Auth.styled'
import LoginContext from '../context/LoginContext'        

const Login = () => 
{
    const {loggingIn} = useContext(LoginContext)

    return (       
        <Wrapper>
            <p>login</p>
        </Wrapper>   
    )
}

export default Login
