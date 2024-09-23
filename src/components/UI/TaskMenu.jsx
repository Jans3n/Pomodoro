import React, { useEffect, useState } from 'react'
import './TaskMenu.css'
import IconButton from './IconButton';
import ArrowUpIcon from '../icons/ArrowUpIcon'
import ArrowDownIcon from '../icons/ArrowDownIcon';

function TaskMenu({name, onClick}) {

  const [taskText, setTaskText] = useState('');
  const [pomodoroInputValue, setPomodoroInputValue] = useState('')

  const handlePomodoroInputChange = (e) => {
    const inputValue = e.target.value;

    if (/^\d{0,2}$/.test(inputValue) && (inputValue === '' || parseInt(inputValue) <= 24)) {
      setPomodoroInputValue(inputValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === '-' || e.key === '.'|| e.key === ','|| e.key === '+') {
      e.preventDefault();
    }
  };

  const buttonStyle = {
    textAlign: 'center',
    borderRadius: '4px',
    opacity: '0.9',
    fontSize: '14px',
    padding: '8px 12px',
    minWidth: '0px',
    width: '40px',
    backgroundColor: 'white',
    color: 'rgb(85, 85, 85)',
    border: '1px solid rgb(223, 223, 223)',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 2px',
    height: '100%',
  }

  return (
    <>
      <div className='TaskMenuContainer'>
        <div className='TaskInformation'>
          <div className='TaskInput'>
            <input 
            type="text" 
            value={taskText} 
            onChange={(e) => setTaskText(e.target.value)}
            placeholder='What do you have planned?'
            className='inputField'/>
          </div>
          <div className='PomodorosRequiredContainer'>
            <p>Estimated Pomodoros</p>
            <div className='PomodoroCounter'>
              <input type="number" min="0" step="1" max="100" onKeyDown={handleKeyDown} onChange={handlePomodoroInputChange} value={pomodoroInputValue} className='EstimatedPomodorosInput'/>
              <div className='EstimatedPomodorosButtons'>
                <IconButton 
                icon={<ArrowUpIcon/>}
                onClick={() => alert("settings clicked")} 
                shouldSpin={false} 
                style={buttonStyle}
              />
              <IconButton 
                icon={<ArrowDownIcon/>}
                onClick={() => alert("settings clicked")} 
                shouldSpin={false} 
                style={buttonStyle}
              />
              </div>
              
            </div>
          </div>
        </div>
        <div className='TaskButtons'>
        
          <button>Cancel</button>
          <button>Save</button>
        </div>
      </div>
    </>
  )


}
export default TaskMenu