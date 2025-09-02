import PropTypes from "prop-types";

function TasksFilter({ filter, onFilterChange }) {
  const filters = ["all", "active", "completed"];

  return (
    <div className="tasks-filter">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onFilterChange(f)}
          style={{
            fontWeight: filter === f ? "bold" : "normal",
            marginRight: "8px",
          }}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}

// ✅ PropTypes
TasksFilter.propTypes = {
  filter: PropTypes.oneOf(["all", "active", "completed"]),
  onFilterChange: PropTypes.func,
};

// ✅ DefaultProps
TasksFilter.defaultProps = {
  filter: "all",
  onFilterChange: () => {},
};

export default TasksFilter;