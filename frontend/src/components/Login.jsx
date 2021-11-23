import React from 'react'
import { useContext } from 'react'
import {Wrapper} from '../styles/Auth.styled'
import AuthContext from '../context/AuthContext'        

const Login = () => 
{
    const {loggingIn} = useContext(AuthContext)

    return (       
        <Wrapper>
            <p>login</p>
        </Wrapper>   
    )
}

export default Login
