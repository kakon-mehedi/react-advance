import { useState } from 'react';
import './stopwatch.css';

export default function Stopwatch() {
	let timerId: any;

	const [isStartDisable, setIsStartDisable] = useState(false);
	const [startText, setStartText] = useState('Start');
	const [isStopDisable, setIsStopDisable] = useState(true);
	const [isResetDisable, setIsResetDisable] = useState(true);
	const [time, setTime] = useState(0);
	const [intervalId, setIntervalId] = useState();
	const [lastTimeAmount, setLastTimeAmount] = useState(0);

	function handleStartClick() {
		setIsStartDisable(true);
		setIsStopDisable(false);
		setIsResetDisable(true);

		startTimer(time);
	}

	function startTimer(time: any) {
		setTime((prev) => lastTimeAmount);

		updateTimeInEveryMilliseconds();
	}

	function updateTimeInEveryMilliseconds() {
		timerId = setInterval(() => {
			setTime((prevTime) => prevTime + 1);
		}, 10);

		setIntervalId(timerId);
	}

	function handleStopClick() {
		setIsStartDisable(false);
		setIsStopDisable(true);
		setIsResetDisable(false);

		setStartText('Pause');
		setLastTimeAmount(time);
		clearInterval(intervalId);
	}

	function handleResetClick() {
		resetTime();

		setIsResetDisable(true);
		setIsStartDisable(true);
		setIsStartDisable(false);

		setStartText('Start');

		setTime(0);
	}

	function resetTime() {
		setLastTimeAmount(0);
		clearTimer();
	}

	function clearTimer() {
		console.log('clear timer id' + timerId);
		clearInterval(intervalId);
	}

	return (
		<div className='container'>
			<div className='stopwatch'>
				<p className='timer'>{`${Math.floor(time / 6000) % 60}:${
					Math.floor(time / 100) % 60
				}:${time % 100 < 10 ? `0${time % 100}` : time % 100}`}</p>
				<div className='button-list'>
					<button
						disabled={isStartDisable}
						onClick={handleStartClick}
					>
						{startText}
					</button>
					<button
						disabled={isStopDisable}
						onClick={handleStopClick}
					>
						Stop
					</button>
					<button
						disabled={isResetDisable}
						onClick={handleResetClick}
					>
						Reset
					</button>
				</div>
			</div>
		</div>
	);
}
