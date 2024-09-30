import React, { useEffect, useState, useRef } from 'react'
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

// TODO automatically change to short break or long break after timer hits 0
const modeDurationsInSeconds = {
  [TimerModes.POMODORO]: 1,
  [TimerModes.SHORT_BREAK]: 1,
  [TimerModes.LONG_BREAK]: 1,
  // [TimerModes.POMODORO]: 25 * 60,
  // [TimerModes.SHORT_BREAK]: 5 * 60,
  // [TimerModes.LONG_BREAK]: 15 * 60,
};

function Timer() {

  const [time, setTime] = useState(modeDurationsInSeconds[TimerModes.POMODORO]);
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [currentTimerMode, setCurrentTimerMode] = useState(TimerModes.POMODORO);
  const [currentPomodoroCount, setCurrentPomodoroCount] = useState(0);

  useEffect(() => {
    let interval;
    if (timerIsRunning) {
      interval = setInterval(() => {
        setTime(prevTime => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(interval);
            handleTimerEnd();
            return 0;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerIsRunning, currentTimerMode]);

  const handleTimerEnd = () => {
    if (currentTimerMode === TimerModes.POMODORO) {
      setCurrentPomodoroCount(prevCount => {
        const newCount = prevCount + 1;
        if (newCount % 4 === 0) {
          changeTimerMode(TimerModes.LONG_BREAK);
        } else {
          changeTimerMode(TimerModes.SHORT_BREAK);
        }
        return newCount;
      });
    } else {
      changeTimerMode(TimerModes.POMODORO);
    }
  };

const changeTimerMode = (newMode) => {
  setTimerIsRunning(false);
  setCurrentTimerMode(newMode);
  setTime(modeDurationsInSeconds[newMode]);
};

  const startTimerClick = () => setTimerIsRunning(true);
  const pauseTimerClick = () => setTimerIsRunning(false);
  const restartTimerClick = () => {
    setTimerIsRunning(false);
    setTime(modeDurationsInSeconds[currentTimerMode]);
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
          onClick={restartTimerClick} 
          shouldSpin={true}
          />

        <IconButton 
          icon={<SettingsIcon/>}
          onClick={() => alert("settings clicked")} 
          shouldSpin={false}
          />
        </div>
        
      </div>
    </>
  )
};

export default Timer;