import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Task({ task, onToggle }) {
  const [timeAgo, setTimeAgo] = useState("");

  // Функция пересчёта времени
  const calculateTimeAgo = (timestamp) => {
    const diff = Math.floor((Date.now() - timestamp) / 1000);

    if (diff < 5) return "created just now";
    if (diff < 60) return `created ${diff} second${diff !== 1 ? "s" : ""} ago`;

    const minutes = Math.floor(diff / 60);
    if (minutes < 60) {
      return `created ${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    }

    const hours = Math.floor(minutes / 60);
    return `created ${hours} hour${hours !== 1 ? "s" : ""} ago`;
  };

  // Обновляем каждую секунду
  useEffect(() => {
    const update = () => setTimeAgo(calculateTimeAgo(task.createdAt));
    update(); // сразу при монтировании
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [task.createdAt]);

  return (
    <li
      onClick={() => onToggle(task.id)}
      style={{
        textDecoration: task.completed ? "line-through" : "none",
        cursor: "pointer",
      }}
    >
      {task.text} <small>({timeAgo})</small>
    </li>
  );
}

// ✅ PropTypes
Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.number.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
};


export default Task;