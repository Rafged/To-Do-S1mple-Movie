import React from "react";
import TasksFilter from "./TasksFilter";

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