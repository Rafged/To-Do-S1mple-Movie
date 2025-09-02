import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function timeAgo(timestamp) {
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  if (diff < 60) return `created ${diff} seconds ago`;
  const minutes = Math.floor(diff / 60);
  return `created ${minutes} minutes ago`;
}

const TodoItem = ({ description, completed, onToggle, onDelete, createdAt }) => {
  const [time, setTime] = useState(timeAgo(createdAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(timeAgo(createdAt));
    }, 1000);
    return () => clearInterval(interval);
  }, [createdAt]);

  return (
    <li className={completed ? "completed" : ""}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={onToggle}
        />
        <label>
          <span className="description">{description}</span>
          <span className="created">{time}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDelete}></button>
      </div>
    </li>
  );
};

TodoItem.defaultProps = {
  description: "Untitled task",
  completed: false,
  createdAt: Date.now(),
  onToggle: () => {},
  onDelete: () => {}
};

TodoItem.propTypes = {
  description: PropTypes.string,
  completed: PropTypes.bool,
  createdAt: PropTypes.number,
  onToggle: PropTypes.func,
  onDelete: PropTypes.func
};

export default TodoItem;