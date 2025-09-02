document.addEventListener("DOMContentLoaded", () => {
  const newTodoInput = document.querySelector(".new-todo");
  const todoList = document.querySelector(".todo-list");
  const filters = document.querySelectorAll(".filters button");
  const clearCompletedBtn = document.querySelector(".clear-completed");
  const todoCount = document.querySelector(".todo-count");

  let todos = [];
  let currentFilter = "All";

  // Removed duplicate render function. The updated render function using timeAgo is defined below.

  function updateCount() {
    const activeCount = todos.filter(t => !t.completed).length;
    todoCount.textContent = `${activeCount} item${activeCount !== 1 ? "s" : ""} left`;
  }

newTodoInput.addEventListener("keypress", e => {
  if (e.key === "Enter" && newTodoInput.value.trim() !== "") {
    todos.push({
      text: newTodoInput.value.trim(),
      completed: false,
      created: Date.now() // сохраняем timestamp
    });
    newTodoInput.value = "";
    render();
  }
});

// Функция преобразования времени в "x sec/min ago"
function timeAgo(timestamp) {
  const now = Date.now();
  const diff = Math.floor((now - timestamp) / 1000); // разница в секундах

  if (diff < 5) return "just now";
  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

// Update the render function to use timeAgo for created field
function render() {
  todoList.innerHTML = "";

  let filteredTodos = todos;
  if (currentFilter === "Active") {
    filteredTodos = todos.filter(t => !t.completed);
  } else if (currentFilter === "Completed") {
    filteredTodos = todos.filter(t => t.completed);
  }

  filteredTodos.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.completed) li.classList.add("completed");

    li.innerHTML = `
      <div class="view">
        <input class="toggle" type="checkbox" ${todo.completed ? "checked" : ""}>
        <label>
          <span class="description">${todo.text}</span>
          <span class="created">${timeAgo(todo.created)}</span>
        </label>
        <button class="icon icon-edit"></button>
        <button class="icon icon-destroy"></button>
      </div>
    `;

    // Toggle
    li.querySelector(".toggle").addEventListener("change", () => {
      todos[index].completed = !todos[index].completed;
      updateCount();
      render();
    });

    // Delete
    li.querySelector(".icon-destroy").addEventListener("click", () => {
      todos.splice(index, 1);
      updateCount();
      render();
    });

    todoList.appendChild(li);
  });

  updateCount();
}

// Optionally, auto-update the timeAgo every second
setInterval(render, 1000);
}