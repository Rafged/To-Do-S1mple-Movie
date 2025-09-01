import React from "react";

const Task = ({ task, toggleTask, deleteTask }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />
      <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        {task.text}
      </span>
      <button onClick={() => deleteTask(task.id)}>✖</button>
    </li>
  );
};

export default Task;