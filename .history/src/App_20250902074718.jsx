import { useState } from "react";
import NewTaskForm from "./NewTaskForm";
import TaskList from "./TaskList";

function App() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="App">
      <NewTaskForm setTasks={setTasks} />
      <TaskList />
    </div>
  );
}

export default App;