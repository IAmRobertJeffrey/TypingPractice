import styled from 'styled-components'

export const Wrapper = styled.div`
    background-color:#102B3F;
    min-height: 100vh;
    color: white;
    display: flex;
    align-items: center;
    justify-content:flex-start;
    flex-direction: column;
`

export const BeginButton = styled.button`
    background-color:#102B3F;
    width:15vw;
    min-width: 200px;
    min-height:200px;
    height:15vw;
    border-radius: 50%;
    border:15px solid white;
    color: white;
    font-family: Poppins;
    font-size:2rem;
    transition: 200ms background-color ease-in-out, 200ms border ease-in-out;
   
   

    &:hover
    {
        transition: 200ms background-color ease-in-out, 200ms border ease-in-out;
      
        
        background-color:white;
        color: #102B3F;
        border:15px solid #1a4363;
    }
`