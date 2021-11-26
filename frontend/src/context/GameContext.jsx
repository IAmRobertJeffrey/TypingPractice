import { createContext, useState, useEffect, useMemo } from "react";

const GameContext = createContext({});

export const GameProvidor = ({ children }) =>
{
	const words = useMemo(() => ["hello", "there", "quick", "chocolate", "sand", "cloud", "ball", "house", "boat", "plane", "computer", "lettuce", "mouse", "water", "hot", "cold"], []);
	const [currentWord, setCurrentWord] = useState(words[Math.floor(Math.random() * words.length)]);
	const [currentInput, setCurrentInput] = useState("");
	const [currentTime, setCurrentTime] = useState(20);
	const [currentTimeLimit, setCurrentTimeLimit] = useState(20);
	const [timerList, setTimerList] = useState([]);
	const [wpm, setWpm] = useState(0);
	const [gameStart, setGameStart] = useState(false);
	const [score, setScore] = useState(0);
	const [resultsShown, setResultsShown] = useState(false);
	const [playedAGame, setPlayedAGame] = useState(false);

	//resets the game
	function resetGame()
	{
		setCurrentInput("");
		setCurrentTime(20);
		setTimerList([]);
		setScore(0);
		setResultsShown(false);
		setGameStart(true);
	}

	useEffect(() =>
	{
		//Checks whether you've typed incorrectly and resets you if you have.
		const arrayOfCurrentWord = [];
		const arrayOfCurrentInput = [];
		setArraysForLetterChecking();
		function setArraysForLetterChecking()
		{
			for (let i = 0; i < currentWord.length; i++)
			{
				arrayOfCurrentWord.push(currentWord[i]);
			}
			for (let i = 0; i < currentInput.length; i++)
			{
				arrayOfCurrentInput.push(currentInput[i]);
				if (arrayOfCurrentWord[i] !== arrayOfCurrentInput[i] && arrayOfCurrentInput.length > 0)
				{
					setCurrentInput("");
				}
			}
		}

		//This incremenets the score when you type correctly
		let initialArray = [];
		if (currentInput === currentWord)
		{
			if (timerList.length > 0)
			{
				timerList.map((current) => initialArray.push(current));
				const timeSpent = currentTimeLimit - currentTime;
				initialArray.push(timeSpent / 10);
				setTimerList(initialArray);
			}
			else
			{
				const timeSpent = currentTimeLimit - currentTime;
				initialArray.push(timeSpent / 10);
				setTimerList(initialArray);
			}
			setScore(score + 1);
			submitWord();
			setCurrentWord(words[Math.floor(Math.random() * words.length)]);
			setCurrentInput("");
			setCurrentTime(20);
		}

		function submitWord()
		{

		}

	}, [currentInput, currentTime, currentWord, score, setCurrentInput, setCurrentTime, setCurrentWord, setScore, setTimerList, timerList, words, currentTimeLimit]);

	useEffect(() =>
	{
		//starts a timer and checks whether the current time is over the limit, stops the game if it is.
		const timer = setInterval(() =>
		{
			if (currentTime > 0 && gameStart)
			{
				setCurrentTime(currentTime - 1);
				setPlayedAGame(true);
			}
			else
			{
				clearInterval(timer);
				setGameStart(false);
				setCurrentTime(20);

				if (playedAGame)
				{
					console.log(timerList);

					calculateWPM();
					submitMatch();
					setPlayedAGame(false);

					setResultsShown(true);
				}
			}
		}, 100);

		function submitMatch()
		{

		}

		function calculateWPM()
		{
			let timeTotal = 0;
			timerList.map((current) => timeTotal += current);
			let multiplier = timeTotal / timerList.length;
			if (timerList.length === 0)
			{
				setWpm(0);
				return (0);
			}
			setWpm((60 / multiplier).toFixed(3));
			return (60 / multiplier).toFixed(3);
		}

		return () =>
		{
			clearInterval(timer);
		};

	}, [score, wpm, currentTimeLimit, currentTime, gameStart, setResultsShown, playedAGame, timerList]);





	return (
		<GameContext.Provider value={{
			score,
			setScore,
			words,
			gameStart,
			setGameStart,
			wpm,
			setWpm,
			timerList,
			setTimerList,
			currentTime,
			setCurrentTime,
			setCurrentTimeLimit,
			currentTimeLimit,
			currentWord,
			setCurrentWord,
			currentInput,
			setCurrentInput,
			resetGame,
			resultsShown,
			setResultsShown,
		}}>
			{children}
		</GameContext.Provider>
	);
};

export default GameContext;