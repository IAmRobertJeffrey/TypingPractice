import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router";

const AuthContext = createContext({});

export const AuthProvidor = ({ children }) =>
{
	const [loggingIn, setLoggingIn] = useState(false);
	const [registering, setRegistering] = useState(false);
	const [loginUsername, setLoginUsername] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [data, setData] = useState();
	const [registerUsername, setRegisterUsername] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [verifyPassword, setVerifyPassword] = useState("");
	const navigate = useNavigate();

	function login()
	{
		if (loginUsername && loginPassword)
		{
			axios({
				method: "post",
				data: {
					username: loginUsername,
					password: loginPassword
				},
				withCredentials: true,
				url: "http://localhost:4024/login"
			}).then((res) => getUser());
			navigate("/");
		}
		else
		{
			alert("Please fill in all fields");
		}

	}

	function register()
	{
		if (registerUsername && registerPassword && verifyPassword)
		{
			if (registerPassword === verifyPassword)
			{
				axios({
					method: "post",
					data: {
						username: registerUsername,
						password: registerPassword
					},
					withCredentials: true,
					url: "http://localhost:4024/register"
				}).then((res) => getUser());
				navigate("/");
			}
			else
			{
				alert("Your entered passwords do not match.");
			}
		}
		else
		{
			alert("Please fill in all fields.");
		}

	}

	function getUser()
	{
		axios({
			method: "get",

			withCredentials: true,
			url: "http://localhost:4024/user"
		}).then((res) => setData(res.data));

	}

	useEffect(() =>
	{
		getUser();
	}, []);

	function logout()
	{
		axios({
			method: "get",
			withCredentials: true,
			url: "http://localhost:4024/logout"
		}).then((res) => setData(res.data));

	}


	return (
		<AuthContext.Provider value={{
			loggingIn,
			setLoggingIn,
			registering,
			setRegistering,
			register,
			logout,
			login,
			loginUsername,
			loginPassword,
			registerUsername,
			registerPassword,
			verifyPassword,
			setLoginUsername,
			setLoginPassword,
			setRegisterUsername,
			setRegisterPassword,
			setVerifyPassword,
			data

		}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;