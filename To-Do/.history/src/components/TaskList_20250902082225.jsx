import PropTypes from "prop-types";
import Task from "./Task";

function TaskList({ tasks, onToggle }) {
  if (tasks.length === 0) {
    return <p>No tasks available</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onToggle={onToggle} />
      ))}
    </ul>
  );
}

// ✅ PropTypes
TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      createdAt: PropTypes.number.isRequired,
    })
  ),
  onToggle: PropTypes.func,
};

// ✅ DefaultProps
TaskList.defaultProps = {
  tasks: [],
  onToggle: () => {},
};

export default TaskList;