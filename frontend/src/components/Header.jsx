import React from 'react';
import { Wrapper, Nav, AuthSection } from '../styles/Header.styled';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Header = () =>
{
	const { logout, data } = useContext(AuthContext);

	function handleLogout()
	{
		logout();
	}


	return (
		<Wrapper>
			<Nav to="/">
				<p>Typing Practice</p>
			</Nav>

			{!data ?
				<AuthSection>
					<Nav to="/login">
						Log In
					</Nav>
					<Nav to="/register">
						Register
					</Nav>
				</AuthSection>
				:
				<AuthSection>
					<Nav to={{ pathname: `/profile/${data.username}` }}>
						{data.username}
					</Nav>
					<Nav onClick={handleLogout} to="/">
						Log Out
					</Nav>
				</AuthSection>
			}
		</Wrapper >
	);
};

export default Header;
