import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Купить хлеб", completed: false },
    { id: 2, title: "Сделать To-Do", completed: true },
  ]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Добавление задачи
  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }]);
    setNewTask("");
  };

  // Переключение выполнено/не выполнено
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Удаление
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Начать редактирование
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditingText(task.title);
  };

  // Сохранить редактирование
  const saveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: editingText } : task
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  // Фильтрация + поиск
  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h1>To-Do List</h1>

      {/* Добавление задачи */}
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Новая задача"
      />
      <button onClick={addTask}>Добавить</button>

      {/* Поиск */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Поиск..."
        style={{ display: "block", marginTop: "10px" }}
      />

      {/* Фильтры */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      {/* Список задач */}
      <ul style={{ marginTop: "20px" }}>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            {editingId === task.id ? (
              <>
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => saveEdit(task.id)}>💾</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.title}
                </span>
                <button onClick={() => startEdit(task)}>✏️</button>
                <button onClick={() => deleteTask(task.id)}>❌</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;