import React, { useEffect, useState } from 'react'
import CustomButton from '../UI/CustomButton';
import TimerButton from '../UI/TimerModeButton';
import './Timer.css'
import IconButton from '../UI/IconButton';
import SettingsIcon from '../icons/Settingsicon';
import RestartIcon from '../icons/RestartIcon';

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
      <div className='TimerContainer'>
        <div className='TimerModes'>
          <TimerButton label="pomodoro" onClick={() => changeTimerMode(TimerModes.POMODORO)} active={currentTimerMode == TimerModes.POMODORO}/>
          <TimerButton label="short break" onClick={() => changeTimerMode(TimerModes.SHORT_BREAK)} active={currentTimerMode == TimerModes.SHORT_BREAK}/>
          <TimerButton label="long break" onClick={() => changeTimerMode(TimerModes.LONG_BREAK)} active={currentTimerMode == TimerModes.LONG_BREAK}/>
        </div>

        <div className='Timer'>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</div>

        <div className='TimerButtons'>
          {!timerIsRunning ? (
          <CustomButton name="start" onClick={startTimerClick} />
        ) : (
          <CustomButton name="pause" onClick={pauseTimerClick} />
        )}

        <IconButton 
          icon={<RestartIcon/>}
          // onClick={} 
          />

        <IconButton 
          icon={<SettingsIcon/>}
          // onClick={} 
          />
        </div>
        
      </div>
    </>
  )
};

export default Timer;