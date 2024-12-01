import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    // Example data
    // { id: 1, text: "This is the first Task", pomodoros: 1, pomodorosPassed: 0, completed: false },
    // { id: 2, text: "This is the second Task", pomodoros: 2, pomodorosPassed: 0, completed: true },
    // { id: 3, text: "This is the third Task", pomodoros: 4, pomodorosPassed: 0, completed: false }
  ]);

  useEffect(() => {
    fetchTasksData();
  }, [])

  const fetchTasksData = async () => {
    console.log("Fetching tasks from database...")
    await axios.get(`https://localhost:7044/api/tasks/`)
    .then(res => {
      const tasks = res.data
      setTasks(tasks)
      console.log(tasks)
    })
  }

  const incrementPomodorosPassedForAllTasks = async () => {
    await axios.put(`https://localhost:7044/api/tasks/increment-pomodoros`)
    .then(res => {
      setTasks(prevTasks => 
        prevTasks.map(task => ({ ...task, pomodorosPassed: task.pomodorosPassed + 1 })),
      );
    })
  };

  const addTask = async (text, pomodoros) => {
    const newTask = {
      taskDescription: text,
      pomodoros: pomodoros,
      pomodorosPassed: 0,
      isCompleted: false
    };
    await axios.post(`https://localhost:7044/api/tasks/`, newTask)
    .then(res => {
      fetchTasksData()
    })
  }

  const editTask = async (oldTaskData, newTaskDescription, newPomodoros) => {
    const taskObject = {
      id: oldTaskData.id,
      taskDescription: newTaskDescription,
      pomodoros: newPomodoros,
      pomodorosPassed: oldTaskData.pomodorosPassed,
      isComplete: oldTaskData.isComplete,
    }
    await axios.put(`https://localhost:7044/api/tasks/` + oldTaskData.id, taskObject)
    .then(res => {
      setTasks(tasks.map(task => {
            if (task.id === oldTaskData.id) {
              return { ...task, taskDescription: newTaskDescription, pomodoros: newPomodoros };
            }
            return task;
          }));
    })
    console.log(taskObject)
  }

  const deleteTask = async (id) => {
    await axios.delete(`https://localhost:7044/api/tasks/` + id)
    .then(res => {
      const newTasks = tasks.filter(task => task.id !== id)
      setTasks(newTasks)
    })
  }

  const toggleCompleted = async (id, isComplete) => {
    await axios.patch(`https://localhost:7044/api/tasks/${id}/completion`, isComplete,
      {
        headers: {"Content-Type": "application/json"}
      }
    )
    .then(res => {
      setTasks(tasks.map(task => {
            if (task.id == id){
              return {...task, isComplete: !task.isComplete}
            } else {
              return task
            }
          }))
    })

    // const patchIsCompleteObject = [
    //   {
    //     op: "replace",
    //     path: "/iscomplete",
    //     value: !isComplete
    //   }
    // ]
    // await axios.patch(`https://localhost:7044/api/tasks/` + id, patchIsCompleteObject)
    // .then(res => {
    //   setTasks(tasks.map(task => {
    //     if (task.id == id){
    //       return {...task, isComplete: !task.isComplete}
    //     } else {
    //       return task
    //     }
    //   }))
    // })
  }

  return (
    <TaskContext.Provider value={{ tasks, setTasks, incrementPomodorosPassedForAllTasks, fetchTasksData, editTask, addTask, deleteTask, toggleCompleted }}>
      {children}
    </TaskContext.Provider>
  );
};
