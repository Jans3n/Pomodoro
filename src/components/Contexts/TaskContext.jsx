import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "This is the first Task", pomodoros: 1, pomodorosPassed: 0, completed: false },
    { id: 2, text: "This is the second Task", pomodoros: 2, pomodorosPassed: 0, completed: true },
    { id: 3, text: "This is the third Task", pomodoros: 4, pomodorosPassed: 0, completed: false }
  ]);

  const incrementPomodorosPassedForAllTasks = () => {
    setTasks(prevTasks => 
      prevTasks.map(task => ({ ...task, pomodorosPassed: task.pomodorosPassed + 1 })),
    );
    console.log(tasks[1].pomodorosPassed)
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, incrementPomodorosPassedForAllTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
