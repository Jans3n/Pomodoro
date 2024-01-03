import React, { useEffect, useState } from 'react'
import CustomButton from './customButton';

function Timer() {

  const pomodoroInSeconds = 25 * 60;
  const shortBreakInSeconds = 5 * 60;
  const longBreakInSeconds = 10 * 60;

  const [time, setTime] = useState(pomodoroInSeconds);
  const [timerIsRunning, setTimerIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (timerIsRunning){
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

  }, [timerIsRunning])

  const changeTimerMode = (newTime) => {
    setTimerIsRunning(false);
    setTime(newTime)
  }

  const pomodoroModeClick = () => changeTimerMode(pomodoroInSeconds);
  const shortBreakModeClick = () => changeTimerMode(shortBreakInSeconds);
  const longBreakModeClick = () => changeTimerMode(longBreakInSeconds);

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
        <CustomButton name="pomodoro" onClick={pomodoroModeClick}/>
        <CustomButton name="short break" onClick={shortBreakModeClick}/>
        <CustomButton name="long break" onClick={longBreakModeClick}/>

        <h1>Countdown Timer</h1>
        <p>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>
        {!timerIsRunning ? (
          <CustomButton name="Start" onClick={startTimerClick} />
        ) : (
          <CustomButton name="Pause" onClick={pauseTimerClick}/>
        )}
      </div>
    </>
  )
};

export default Timer;