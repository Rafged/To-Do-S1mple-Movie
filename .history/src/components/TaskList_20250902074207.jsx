import React from "react";
import Task from "./Task";
<TaskList tasks={tasks} filter={filter} toggleTask={toggleTask} deleteTask={deleteTask} editTask={editTask} />

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