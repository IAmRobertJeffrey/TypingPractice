import React from 'react';
import { Wrapper, Mode, ModeIncomplete } from '../styles/Home.styled';

const Home = () =>
{
	return (
		<Wrapper>
			<Mode to="/practice">
				<p>Practice</p>
			</Mode>
			<ModeIncomplete to="/">
				<p style={{ textDecoration: "line-through" }}>Online</p>
			</ModeIncomplete>
		</Wrapper>
	);
};

export default Home;
