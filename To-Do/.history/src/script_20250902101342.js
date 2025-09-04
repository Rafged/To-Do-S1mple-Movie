document.addEventListener("DOMContentLoaded", () => {
  const newTodoInput = document.querySelector(".new-todo");
  const todoList = document.querySelector(".todo-list");
  const filters = document.querySelectorAll(".filters button");
  const clearCompletedBtn = document.querySelector(".clear-completed");
  const todoCount = document.querySelector(".todo-count");

  let todos = [];
  let currentFilter = "All";

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
            <span class="created">${todo.created}</span>
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
        created: `created just now`,
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

    let seconds = 0;

  function formatTime(sec) {
    let h = String(Math.floor(sec / 3600)).padStart(2, "0");
    let m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    let s = String(sec % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  }

  function updateTimer() {
    seconds++;
    document.getElementById("created just now").textContent = formatTime(seconds);
  }

  setInterval(updateTimer, 1000);

  // Очистка завершённых
  clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter(t => !t.completed);
    render();
  });

  render();
});