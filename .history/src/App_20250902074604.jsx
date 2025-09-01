const [filter, setFilter] = useState("all");

return (
  <div className="App">
    <NewTaskForm setTasks={setTasks} />
    <TaskList
      tasks={tasks}
      filter={filter}
      toggleTask={toggleTask}
      deleteTask={deleteTask}
      editTask={editTask}
    />
    <Footer setFilter={setFilter} />
  </div>
);