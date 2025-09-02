document.addEventListener("DOMContentLoaded", () => {
  const newTodoInput = document.querySelector(".new-todo");
  const todoList = document.querySelector(".todo-list");
  const filters = document.querySelectorAll(".filters button");
  const clearCompletedBtn = document.querySelector(".clear-completed");
  const todoCount = document.querySelector(".todo-count");

  let todos = [];
  let currentFilter = "All";

  // Форматирование времени
  function formatTime(timestamp) {
    const diff = Math.floor((Date.now() - timestamp) / 1000); // разница в секундах
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) > 1 ? "s" : ""} ago`;
    return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? "s" : ""} ago`;
  }

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
            <span class="created">${formatTime(todo.createdAt)}</span>
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

  function updateCount() {
    const activeCount = todos.filter(t => !t.completed).length;
    todoCount.textContent = `${activeCount} item${activeCount !== 1 ? "s" : ""} left`;
  }

  // Добавление новой задачи
  newTodoInput.addEventListener("keypress", e => {
    if (e.key === "Enter" && newTodoInput.value.trim() !== "") {
      todos.push({
        text: newTodoInput.value.trim(),
        completed: false,
        createdAt: Date.now(), // сохраняем время создания
      });
      newTodoInput.value = "";
      render();
    }
  });

  // Фильтры
  filters.forEach(button => {
    button.addEventListener("click", () => {
      filters.forEach(b => b.classList.remove("selected"));
      button.classList.add("selected");
      currentFilter = button.textContent;
      render();
    });
  });

  // Очистка завершённых
  clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter(t => !t.completed);
    render();
  });

  // Обновление "created ..." каждую минуту
  setInterval(render, 1000);

  render();
});