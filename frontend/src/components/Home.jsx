import React from 'react'
import { Wrapper, Mode } from '../styles/Home.styled'

const Home = () => {
    return (
        <Wrapper>
            <Mode to="/practice">
                <p>Practice</p>
            </Mode>
            {/* <Mode to="/online">
                <p>Online</p>
            </Mode> */}
        </Wrapper>
    )
}

export default Home
