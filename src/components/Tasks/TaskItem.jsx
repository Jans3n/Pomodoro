import React, { useEffect, useState } from 'react'

function TaskItem({task, toggleCompleted, editTask, deleteTask}) {

  return(
    <>
      <div>
        <p>{task.text}</p>
      </div>
    </>
  )
}

export default TaskItem;