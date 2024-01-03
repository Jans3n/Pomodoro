import React, { useEffect, useState } from 'react'
import CustomButton from './customButton';

function Timer() {

  const pomodoroInSeconds = 0.1 * 60;

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