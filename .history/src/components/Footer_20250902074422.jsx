import React from "react";
import TasksFilter from "./TasksFilter";

<>
  <button onClick={() => setFilter("all")}>All</button>
  <button onClick={() => setFilter("active")}>Active</button>
  <button onClick={() => setFilter("completed")}>Completed</button>
</>

export default Footer;