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
    await axios.put(`https://localhost:7044/api/tasks/increment-pomodoro-passed`)
    .then(res => {
      setTasks(prevTasks => 
        prevTasks.map(task => ({ ...task, pomodorosPassed: task.pomodorosPassed + 1 })),
      );
    })
    

  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, incrementPomodorosPassedForAllTasks, fetchTasksData }}>
      {children}
    </TaskContext.Provider>
  );
};
