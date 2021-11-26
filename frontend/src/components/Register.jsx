import React from 'react';
import { Wrapper, AuthForm } from '../styles/Auth.styled';
import AuthContext from '../context/AuthContext';
import { useContext, useEffect } from 'react';
import { AuthButton } from '../styles/Auth.styled';

const Register = () =>
{

	const {
		registerUsername,
		registerPassword,
		setRegisterUsername,
		setRegisterPassword,
		setRegistering,
		verifyPassword,
		setVerifyPassword,
		setLoggingIn,
		register,
	} = useContext(AuthContext);

	useEffect(() =>
	{
		setRegistering(true);
		setLoggingIn(false);
	}, [setLoggingIn, setRegistering]);

	useEffect(() =>
	{
		setRegisterUsername("");
		setRegisterPassword("");
		setVerifyPassword("");
	}, [setRegisterPassword, setRegisterUsername, setVerifyPassword]);

	function handleSubmit(e)
	{
		e.preventDefault();
		register();

		setRegisterUsername("");
		setRegisterPassword("");
		setVerifyPassword("");
	}

	return (
		<Wrapper>
			<AuthForm onSubmit={(e) => handleSubmit(e)}>
				<label htmlFor="username">Username</label>
				<input id="username" onChange={(e) => setRegisterUsername(e.target.value)} value={registerUsername} placeholder="Username" type="text" />
				<label htmlFor="password">Password</label>
				<input id="password" onChange={(e) => setRegisterPassword(e.target.value)} value={registerPassword} placeholder="Password" type="password" />
				<label htmlFor="verifyPassword">Verify Password</label>
				<input id="verifyPassword" onChange={(e) => setVerifyPassword(e.target.value)} value={verifyPassword} placeholder="Verify Password" type="password" />
				<AuthButton type="submit">Register</AuthButton>
			</AuthForm>
		</Wrapper>
	);
};

export default Register;
