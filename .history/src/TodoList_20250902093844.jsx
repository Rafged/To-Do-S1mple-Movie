import React, { useState } from "react";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (text) => {
    setTasks([
      ...tasks,
      { id: Date.now(), description: text, completed: false, createdAt: Date.now() }
    ]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <section className="main">
      <ul className="todo-list">
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            description={task.description}
            completed={task.completed}
            createdAt={task.createdAt}
            onToggle={() => toggleTask(task.id)}
            onDelete={() => deleteTask(task.id)}
          />
        ))}
      </ul>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value.trim()) {
            addTask(e.target.value.trim());
            e.target.value = "";
          }
        }}
      />
    </section>
  );
};

export default TodoList;