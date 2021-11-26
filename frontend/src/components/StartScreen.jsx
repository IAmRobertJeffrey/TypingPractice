import React from 'react';
import { BeginButton } from '../styles/App.styled';
import GameContext from '../context/GameContext';
import { useContext } from 'react';

const StartScreen = () => 
{
	const { resetGame } = useContext(GameContext);


	function handleStart()
	{
		resetGame();
	}

	return (
		<BeginButton onClick={handleStart}>
			Begin
		</BeginButton>
	);
};

export default StartScreen;
