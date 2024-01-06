import React, { useEffect, useState } from 'react'
import CustomButton from './customButton';

const TimerModes = {
  POMODORO: 'pomodoro',
  SHORT_BREAK: 'shortBreak',
  LONG_BREAK: 'longBreak',
};

const modeDurationsInSeconds = {
  [TimerModes.POMODORO]: 25 * 60,
  [TimerModes.SHORT_BREAK]: 5 * 60,
  [TimerModes.LONG_BREAK]: 15 * 60,
};

function Timer() {

  const [time, setTime] = useState(modeDurationsInSeconds[TimerModes.POMODORO]);
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [currentTimerMode, setCurrentTimerMode] = useState(TimerModes.POMODORO);

  useEffect(() => {
    let interval;

    if (timerIsRunning) {
      interval = setInterval(() => {
        setTime(prevTime => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(interval);
            setTimerIsRunning(false);
            console.log("Countdown finished!");
            return 0;
          }
        })
      }, 1000)
    } else {
      clearInterval(interval)
    }

    // Cleanup interval on unmount
    return () => clearInterval(interval);

  }, [timerIsRunning, currentTimerMode])

  const changeTimerMode = (newMode) => {
    if (currentTimerMode !== newMode){
      setTimerIsRunning(false);
      setCurrentTimerMode(newMode);
      setTime(modeDurationsInSeconds[newMode])
    }
  }

  const startTimerClick = () => {
    setTimerIsRunning(true);
  }

  const pauseTimerClick = () => {
    setTimerIsRunning(false);
  }

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <>
      <div>
        <CustomButton name="pomodoro" onClick={() => changeTimerMode(TimerModes.POMODORO)} />
        <CustomButton name="short break" onClick={() => changeTimerMode(TimerModes.SHORT_BREAK)} />
        <CustomButton name="long break" onClick={() => changeTimerMode(TimerModes.LONG_BREAK)} />

        <h1>Countdown Timer</h1>
        <p>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>
        {!timerIsRunning ? (
          <CustomButton name="Start" onClick={startTimerClick} />
        ) : (
          <CustomButton name="Pause" onClick={pauseTimerClick} />
        )}
      </div>
    </>
  )
};

export default Timer;