import React from 'react';
import { useContext, useEffect } from 'react';
import { Wrapper } from '../styles/Auth.styled';
import AuthContext from '../context/AuthContext';
import { AuthForm, AuthButton } from '../styles/Auth.styled';


const Login = () =>
{
	const {
		loginUsername,
		loginPassword,
		setLoginUsername,
		setLoginPassword,
		setLoggingIn,
		setRegistering,
		login,
	} = useContext(AuthContext);


	useEffect(() =>
	{
		setRegistering(false);
		setLoggingIn(true);
	}, [setLoggingIn, setRegistering]);


	useEffect(() =>
	{
		setLoginUsername("");
		setLoginPassword("");
	}, [setLoginPassword, setLoginUsername]);

	function handleSubmit(e)
	{
		e.preventDefault();

		console.log("clicked login button");
		login();

		setLoginUsername("");
		setLoginPassword("");



	}

	return (
		<Wrapper>
			<AuthForm onSubmit={(e) => handleSubmit(e)}>
				<label htmlFor="username">Username</label>
				<input id="username" onChange={(e) => setLoginUsername(e.target.value)} value={loginUsername} placeholder="Username" type="text" />
				<label htmlFor="password">Password</label>
				<input id="password" onChange={(e) => setLoginPassword(e.target.value)} value={loginPassword} placeholder="Password" type="password" />
				<AuthButton type="submit">Log In</AuthButton>
			</AuthForm>
		</Wrapper>
	);
};

export default Login;
