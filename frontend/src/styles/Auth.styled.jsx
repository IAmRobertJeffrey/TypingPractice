import styled from 'styled-components'

export const Wrapper = styled.main`
    width: 50%;
    height: calc(100vh -100px);

    display: flex;
    transform: translate(0px, +50px);
    align-items: center;
`


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
`