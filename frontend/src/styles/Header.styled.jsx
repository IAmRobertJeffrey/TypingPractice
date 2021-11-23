import styled from "styled-components"
import * as Router from "react-router-dom";

export const Wrapper = styled.header`
width:100%;
height:50px;
background-color: #1a4363;
display: flex;
justify-content: space-between;
padding-left: 50px;
padding-right:50px;

`

export const Nav = styled(Router.Link)`
width: fit-content;
height:50px;
background-color: #1a4363;
display: flex;
text-decoration: none;
color: white;
align-items: center;
font-family:Poppins;
font-size:2rem;
`
export const AuthSection = styled.div`
gap: 50px;
height:50px;
background-color: #1a4363;
display: flex;
align-items: center;

a
{
    font-size:1rem;
    border: 1px solid white;
    border-radius: 0.5rem;
    width: 90px;
    text-align:"center";
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    box-shadow:
  0.4px 0.8px 2.2px rgba(0, 0, 0, 0.03),
  1px 1.9px 5.3px rgba(0, 0, 0, 0.022),
  1.9px 3.6px 10px rgba(0, 0, 0, 0.018),
  3.4px 6.5px 17.9px rgba(0, 0, 0, 0.015),
  6.3px 12.1px 33.4px rgba(0, 0, 0, 0.012),
  15px 29px 80px rgba(0, 0, 0, 0.008)
;

&:hover{
    transition: 200ms background-color ease-in-out, 200ms border ease-in-out;       
    background-color:white;
    color: #102B3F;
    border:1px solid #1a4363;
}
&:active{
    box-shadow:none
}
}

`
