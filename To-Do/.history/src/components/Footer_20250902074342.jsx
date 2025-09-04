import React from "react";
import TasksFilter from "./TasksFilter";

<div>
  <button onClick={() => setFilter("all")}>All</button>
  <button onClick={() => setFilter("active")}>Active</button>
  <button onClick={() => setFilter("completed")}>Completed</button>
</div>

const Footer = ({ tasks, filter, setFilter }) => {
  const activeCount = tasks.filter((t) => !t.completed).length;

  return (
    <footer>
      <span>{activeCount} items left</span>
      <TasksFilter filter={filter} setFilter={setFilter} />
    </footer>
  );
};

export default Footer;