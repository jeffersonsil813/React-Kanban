import React, { useState } from "react";
import "./styles.css";
import Navbar from "./components/Navbar/Navbar";
import TaskList from "./components/TaskList/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [idAcc, setIdAcc] = useState(0);

  const generateId = () => {
    setIdAcc(idAcc + 1);
  };

  const addTask = (title, state) => {
    generateId();
    const newTask = {
      id: idAcc,
      title,
      state
    };

    setTasks((existingTasks) => {
      return [...existingTasks, newTask];
    });
  };

  const updateTask = (id, title, state) => {
    setTasks((existingTasks) => {
      return existingTasks.map((task) => {
        if (task.id === id) {
          return { ...task, title, state };
        } else {
          return task;
        }
      });
    });
  };

  const deleteTask = (id) => {
    setTasks((existingTasks) => {
      return existingTasks.filter(task => task.id !== id);   
    });
  }

  return (
    // jsx ==> sintaxe do js com um pouco de xml--> "html" do react
    <div className="App">
      <Navbar />

      <div className="container">
        <TaskList
          title={`Pendente`}
          onAddTask={addTask}
          taskState="Pendente"
          tasks={tasks.filter((t) => t.state === "Pendente")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />

        <TaskList
          title={`Fazendo`}
          onAddTask={addTask}
          taskState="Fazendo"
          tasks={tasks.filter((t) => t.state === "Fazendo")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />

        <TaskList
          title="Completa"
          onAddTask={addTask}
          taskState="Completa"
          tasks={tasks.filter((t) => t.state === "Completa")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
}
