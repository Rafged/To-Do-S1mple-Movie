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

// Перерисовка задач
function render() {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${todo.text}</span>
      <small style="margin-left: 10px; color: gray;">
        ${timeAgo(todo.created)}
      </small>
      <button onclick="deleteTodo(${index})">✖</button>
    `;

    todoList.appendChild(li);
  });
}

// Удаление задачи
function deleteTodo(index) {
  todos.splice(index, 1);
  render();
}

// Автообновление времени каждые 1 сек
setInterval(render, 1000);