import React from "react";
import Task from "./Task";
<TaskList tasks={tasks} filter={filter} toggleTask={toggleTask} deleteTask={deleteTask} editTask={editTask} />

const App = () => {
  const [tasks, setTasks] = React.useState([]);
  const [filter, setFilter] = React.useState("all");

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const editTask = (taskId, updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? updatedTask : task))
    );
  };

  return (
    <div>
      <TaskList
        tasks={tasks}
        filter={filter}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </div>
  );
};

export default App;

const TaskList = ({ tasks, toggleTask, deleteTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;