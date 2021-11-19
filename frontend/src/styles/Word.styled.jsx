import styled from "styled-components";

export const Wrapper = styled.div`
width:100%;
height: 45%;

display: flex;
align-items: center;
justify-content: center;
min-height: fit-content;

flex-direction: column;
p
{
    font-family:Poppins;
    font-size:3rem;
    margin: 25px;
}

`

export const Score = styled.div`

width:150px;
height:150px;
background-color: white;
border-radius: 50%;
color: #1a4363;
display: flex;
justify-content: center;
align-items: center;
min-width: fit-content;

p{
    font-family:SpaceMono;
    margin: 0%;
}

`


export const ScoreWrapper = styled.div`
display:flex;
flex-direction: row;
width: 100%;
justify-content:space-around;

`

