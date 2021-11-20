import React from 'react'
import { Wrapper } from '../styles/Header.styled'

const Header = () => {
    return (
        <Wrapper>
            <p style={ {fontFamily:"Poppins", fontSize:"2rem", marginLeft:"25px"} }>Typing Practice</p>
        </Wrapper>
    )
}

export default Header
