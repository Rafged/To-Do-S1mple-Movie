import React from "react";

const TasksFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <button
        onClick={() => setFilter("all")}
        style={{ fontWeight: filter === "all" ? "bold" : "normal" }}
      >
        All
      </button>
      <button
        onClick={() => setFilter("active")}
        style={{ fontWeight: filter === "active" ? "bold" : "normal" }}
      >
        Active
      </button>
      <button
        onClick={() => setFilter("completed")}
        style={{ fontWeight: filter === "completed" ? "bold" : "normal" }}
      >
        Completed
      </button>
    </div>
  );
};

export default TasksFilter;