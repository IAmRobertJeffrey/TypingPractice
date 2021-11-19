import styled from "styled-components"

export const UserInput = styled.input`
width:50%;
min-width: 410px;
font-family: Poppins;
font-size: 2rem;
border:15px solid #1a4363;
outline: none;
border-radius: 2rem;
text-align: center;
color: #1a4363;


`

export const Wrapper = styled.div`
min-height: 400px;
height: 50%;
display: flex;
flex-direction:column;
align-items: center;
justify-content: space-around;

@media (max-width: 1050px) {
    width:100%
  }

`