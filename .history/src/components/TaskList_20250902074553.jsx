import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

function TaskList({ tasks, filter, toggleTask, deleteTask, editTask }) {
  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // all
  });

  return (
    <ul>
      {filteredTasks.map(task => (
        <li key={task.id}>
          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer"
            }}
            onClick={() => toggleTask(task.id)}
          >
            {task.text}
          </span>
          <button onClick={() => deleteTask(task.id)}>
            <FaTrash />
          </button>
          <button onClick={() => {
            const newText = prompt("Измени задачу:", task.text);
            if (newText) editTask(task.id, newText);
          }}>
            <FaEdit />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;