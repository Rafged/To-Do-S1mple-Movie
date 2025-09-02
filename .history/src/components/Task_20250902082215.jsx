import PropTypes from "prop-types";

function Task({ task, onToggle }) {
  const timeAgo = (timestamp) => {
    const diff = Math.floor((Date.now() - timestamp) / 1000);
    if (diff < 60) return `created ${diff} second${diff !== 1 ? "s" : ""} ago`;
    const minutes = Math.floor(diff / 60);
    return `created ${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  };

  return (
    <li
      onClick={() => onToggle(task.id)}
      style={{
        textDecoration: task.completed ? "line-through" : "none",
        cursor: "pointer",
      }}
    >
      {task.text} <small>({timeAgo(task.createdAt)})</small>
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

// ✅ DefaultProps
Task.defaultProps = {
  task: {
    id: 0,
    text: "Untitled task",
    completed: false,
    createdAt: Date.now(),
  },
  onToggle: () => {},
};

export default Task;