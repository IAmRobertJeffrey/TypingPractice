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
				url: "https://roberts-typing.herokuapp.com/login"
			}).then((res) => getUser());
			navigate("/");
		}
		else
		{
			alert("Please fill in all fields");
		}

	}

	async function register()
	{
		if (registerUsername && registerPassword && verifyPassword)
		{
			if (registerPassword === verifyPassword)
			{
				const response = await axios({
					method: "post",
					data: {
						username: registerUsername,
						password: registerPassword
					},
					withCredentials: true,
					url: "https://roberts-typing.herokuapp.com/register"
				});

				const data = await response.data;
				console.log(data);
				getUser();
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

	async function getUser()
	{
		const response = await axios({
			method: "get",
			withCredentials: true,
			url: "https://roberts-typing.herokuapp.com/user"
		});

		const data = await response.data;
		setData(data);

	}

	useEffect(() =>
	{
		getUser();
	}, []);

	async function logout()
	{
		const response = await axios({
			method: "get",
			withCredentials: true,
			url: "https://roberts-typing.herokuapp.com/logout"
		});

		const data = await response.data;
		setData(data);

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