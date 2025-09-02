import { useState } from "react";
import TaskList from "./components/TaskList";
import NewTaskForm from "./components/NewTaskForm";
import TasksFilter from "./components/TasksFilter";
import Footer from "./components/Footer";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false, createdAt: Date.now() - 60000 },
    { id: 2, text: "Build Todo App", completed: true, createdAt: Date.now() - 120000 },
    { id: 3, text: "Deploy to Vercel", completed: false, createdAt: Date.now() - 300000 },
  ]);
  const [filter, setFilter] = useState("all");

  // Add new task with createdAt timestamp
  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos([...todos, newTask]);
  };

  const toggleTask = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>Todo App</h1>
      <NewTaskForm onAdd={addTask} />
      <TaskList tasks={filteredTodos} onToggle={toggleTask} />
      <Footer
        count={todos.filter((t) => !t.completed).length}
        onClearCompleted={clearCompleted}
        filter={filter}
        onFilterChange={setFilter}
      />
      <TasksFilter filter={filter} onFilterChange={setFilter} />
    </div>
  );
}

export default App;