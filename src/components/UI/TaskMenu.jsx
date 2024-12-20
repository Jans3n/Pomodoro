import React, { useContext, useState } from 'react'
import './TaskMenu.css'
import IconButton from './IconButton';
import ArrowUpIcon from '../icons/ArrowUpIcon'
import ArrowDownIcon from '../icons/ArrowDownIcon';
import { TaskContext } from '../Contexts/TaskContext';

function TaskMenu({onClose}) {

  const [taskText, setTaskText] = useState('');
  const [pomodoroInputValue, setPomodoroInputValue] = useState(1)
  const {addTask} = useContext(TaskContext);

  const handleSaveTask = () => {
    // TODO Add error handling (toast)
    if (taskText != '' && Number(pomodoroInputValue) != 0){
      addTask(taskText, pomodoroInputValue)
      console.log('Task saved:', taskText, pomodoroInputValue);
      onClose();
    }
  };

  const handleCancelTask = () => {
    setTaskText('');
    setPomodoroInputValue(1);
    onClose();
  };

  const handlePomodoroInputChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d{0,2}$/.test(inputValue) && (inputValue === '' || parseInt(inputValue) <= 24 && parseInt(inputValue) >= 1)) {
      setPomodoroInputValue(inputValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === '-' || e.key === '.'|| e.key === ','|| e.key === '+') {
      e.preventDefault();
    }
  };

  const incrementPomodoroValue = () => {
    const currentValue = Number(pomodoroInputValue);
    if (currentValue < 24){
      setPomodoroInputValue(currentValue + 1)
    }
  }

  const decrementPomodoroValue = () => {
    const currentValue = Number(pomodoroInputValue);
    if (currentValue > 0){
      setPomodoroInputValue(currentValue - 1)
    }
  }

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
            <input type="text" value={taskText} 
            onChange={(e) => setTaskText(e.target.value)}
            placeholder='What do you have planned?'
            className='inputField'
            maxLength={50}/>
          </div>
          <div className='PomodorosRequiredContainer'>
            <p>Estimated Pomodoros</p>
            <div className='PomodoroCounter'>
              <input type="number" min="1" step="1" max="100" 
                onKeyDown={handleKeyDown} 
                onChange={handlePomodoroInputChange}
                value={pomodoroInputValue} 
                className='EstimatedPomodorosInput'/>
              <div className='EstimatedPomodorosButtons'>
                <IconButton 
                icon={<ArrowUpIcon/>}
                onClick={() => incrementPomodoroValue()} 
                shouldSpin={false} 
                style={buttonStyle}
              />
              <IconButton 
                icon={<ArrowDownIcon/>}
                onClick={() => decrementPomodoroValue()} 
                shouldSpin={false} 
                style={buttonStyle}
              />
              </div>
              
            </div>
          </div>
        </div>
        <div className='TaskButtons'>
          <button className='CancelTaskButton' onClick={handleCancelTask}>Cancel</button>
          <button className='SaveTaskButton' onClick={handleSaveTask}>Save</button>
        </div>
      </div>
    </>
  )


}
export default TaskMenu