import React, { useEffect, useState } from 'react'
import './TaskItem.css'
import IconButton from '../UI/IconButton';
import CheckFullIcon from '../icons/CheckFullIcon';
import CheckIcon from '../icons/CheckIcon';
import EditIcon from '../icons/EditIcon';
import ArrowUpIcon from '../icons/ArrowUpIcon';
import ArrowDownIcon from '../icons/ArrowDownIcon';

function TaskItem({task, toggleCompleted, editTask, deleteTask, isTaskItemOpen, handleTaskItemToggle}) {

  const [PomodorosPassed, setPomodorosPassed] = useState(task.pomodorosPassed)
  const [TaskDescription, setTaskDescription] = useState(task.taskDescription)
  const [TaskPomodoros, setTaskPomodoros] = useState(task.pomodoros)

  const handleCompletedTaskChange = () => {
    toggleCompleted(task.id, task.isComplete)
  }

  const handleSaveTask = () => {
    editTask(task, TaskDescription, TaskPomodoros)
    handleTaskItemToggle()
  }

  const handleCancelEditTask = () => {
    setTaskDescription(task.taskDescription)
    setTaskPomodoros(task.pomodoros)
    handleTaskItemToggle()
  }

  const handleDeleteTask = () => {
    deleteTask(task.id)
    handleTaskItemToggle()
  }

  const handlePomodoroInputChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d{0,2}$/.test(inputValue) && (inputValue === '' || parseInt(inputValue) <= 24 && parseInt(inputValue) >= 1)) {
      setTaskPomodoros(inputValue);
    }
  };

  const handleKeyDown = (e) => {
    if (['-', '.', ',', '+'].includes(e.key)) {
      e.preventDefault();
    }
  };

  const incrementPomodoroValue = () => {
    const currentValue = Number(TaskPomodoros);
    if (currentValue < 24){
      setTaskPomodoros(currentValue + 1)
    }
  }

  const decrementPomodoroValue = () => {
    const currentValue = Number(TaskPomodoros);
    if (currentValue > 0){
      setTaskPomodoros(currentValue - 1)
    }
  }

  const buttonStyle = {
    textAlign: 'center',
    opacity: '0.9',
    color: 'rgb(85, 85, 85)',
  }

  const editButtonStyle = {
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


  return(
    <>
      <div className={`TaskItem ${isTaskItemOpen ? 'open' : ''}`}>
        {
          isTaskItemOpen
          ? 
            <div>
              <div className='TaskInformation'>
                <div className='TaskInput'>
                  <input type="text" 
                  value={TaskDescription} 
                  onChange={e => setTaskDescription(e.target.value)}
                  placeholder='What do you have planned?'
                  className='editInputField'
                  maxLength={50}/>
                </div>
                <div className='PomodorosRequiredContainer'>
                  <p>Estimated Pomodoros</p>
                  <div className='PomodoroCounter'>
                    <input type="number" min="1" step="1" max="100" 
                      onKeyDown={handleKeyDown} 
                      onChange={handlePomodoroInputChange}
                      value={TaskPomodoros} 
                      className='EstimatedPomodorosInput'/>
                    <div className='EstimatedPomodorosButtons'>
                      <IconButton 
                      icon={<ArrowUpIcon/>}
                      onClick={() => incrementPomodoroValue()} 
                      shouldSpin={false} 
                      style={editButtonStyle}
                      />
                      <IconButton 
                        icon={<ArrowDownIcon/>}
                        onClick={() => decrementPomodoroValue()} 
                        shouldSpin={false} 
                        style={editButtonStyle}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='TaskButtons'>
                <button className='DeleteTaskButton' onClick={handleDeleteTask}>Delete</button>
                <div>
                  <button className='CancelTaskButton' onClick={handleCancelEditTask}>Cancel</button>
                  <button className='SaveTaskButton' onClick={handleSaveTask}>Save</button>
                </div>
                
              </div>
            </div>
          :
            <>
              <div className='LeftSideTask'>
                {task.isComplete 
                ? <IconButton
                  icon={<CheckFullIcon/>}
                  onClick={() => handleCompletedTaskChange()} 
                  shouldSpin={false} 
                  style={buttonStyle}/>
                :
                  <IconButton
                  icon={<CheckIcon/>}
                  onClick={() => handleCompletedTaskChange()} 
                  shouldSpin={false} 
                  style={buttonStyle}/>
                }
                <div className='TaskText' style={task.completed ? {textDecoration: 'line-through', color: 'rgb(85, 85, 85)'} : {}}>
                  {task.taskDescription}
                </div>
              </div>
              <div className='RightSideTask'>
                <div className='Pomodoros'>{PomodorosPassed}/{TaskPomodoros}</div>
                <IconButton
                  icon={<EditIcon/>}
                  onClick={() => handleTaskItemToggle()} 
                  shouldSpin={false} 
                  style={buttonStyle}/>
              </div>
            </>
        }
      </div>
        
    </>
  )
}

export default TaskItem;