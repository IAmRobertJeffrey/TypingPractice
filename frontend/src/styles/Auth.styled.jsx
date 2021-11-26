import styled from 'styled-components';

export const Wrapper = styled.main`
    width: 50%;
    height: calc(100vh -100px);

    display: flex;
    transform: translate(0px, +50px);
    align-items: center;
`;


export const AuthForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    align-items: center;

  


    label{
        font-size:1.5rem;
        margin-bottom: 5px;
    }
    input{
        margin-bottom: 25px;
        outline: none;
        text-align:center;
        font-size:1.2rem;
        font-family:Poppins;
        height:50px;
        width:100%;
    }
`;

export const AuthButton = styled.button`
	width: 100%;
	background-color: #102B3F;
	display: flex;
	text-decoration: none;
	color: white;
	align-items: center;
	font-family:Poppins;
	font-size:1.5rem;
    border: 1px solid white;
    border-radius: 0.5rem;
    text-align:"center";
	padding:10px;
	margin: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: fit-content;
    box-shadow:
  0.4px 0.8px 2.2px rgba(0, 0, 0, 0.03),
  1px 1.9px 5.3px rgba(0, 0, 0, 0.022),
  1.9px 3.6px 10px rgba(0, 0, 0, 0.018),
  3.4px 6.5px 17.9px rgba(0, 0, 0, 0.015),
  6.3px 12.1px 33.4px rgba(0, 0, 0, 0.012),
  15px 29px 80px rgba(0, 0, 0, 0.008);

  &:hover{
    transition: 200ms background-color ease-in-out, 200ms border ease-in-out;       
    background-color:white;
    color: #102B3F;
   
}
&:active{
    box-shadow:none
}
`;