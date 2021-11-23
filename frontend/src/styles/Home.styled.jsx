import styled from "styled-components"
import * as Router from "react-router-dom";

export const Wrapper = styled.main`
width:50%;
min-height:calc(100vh - 50px);
flex-wrap: wrap;

display: flex;
justify-content: center;
align-items: center;
transform: translate(0px, -50px);
justify-items: center;
gap:25px;

`

export const Mode = styled(Router.Link)`
cursor: pointer;
width:15vw;
height:15vw;
border: 15px solid white;
border-radius: 2rem;
min-width: 200px;
min-height: 200px;
background-color: #102B3F;
display: flex;
justify-content: center;
align-items: center;
text-decoration: none;
color:white;
font-family:Poppins;
font-size:2rem;
`