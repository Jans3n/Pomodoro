import React, { useEffect, useState } from 'react'
import CustomButton from '../UI/CustomButton';

function TaskItem({task, toggleCompleted, editTask, deleteTask}) {

  const handleCompletedTaskChange = () => {
    toggleCompleted(task.id)
  }

  return(
    <>
      <div>
        <input type="checkbox" checked={task.completed} onChange={handleCompletedTaskChange}/>
        <p>{task.text}</p>
        <CustomButton name="Remove" onClick={() => deleteTask(task.id)}/>
      </div>
    </>
  )
}

export default TaskItem;