const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearBtn = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  secondCardBody.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodos);
  clearBtn.addEventListener("click", clearAllTodos);
}

function addTodo(e) {
  e.preventDefault();

  const newTodo = input.value.trim();

  if (newTodo === "") {
    showAlert("danger", "Lütfen bir todo girin...");
  } else {
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success", "Todo başarıyla eklendi...");
  }
}

function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;

  firstCardBody.appendChild(alert);

  setTimeout(function () {
    alert.remove();
  }, 1000);
}

function addTodoToUI(newTodo) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";

  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class ='fa fa-remove'></i>";

  li.appendChild(document.createTextNode(newTodo));
  li.appendChild(link);
  todoList.appendChild(li);

  input.value = "";
}

function getTodosFromStorage() {
  let todos;
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();

  todos.push(newTodo);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI() {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}

function deleteTodo(e) {
  if (e.target.className == "fa fa-remove") {
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    e.target.parentElement.parentElement.remove();
    showAlert("success", "Todo başarıyla silindi...");
  }
}

function deleteTodoFromStorage(deletetodo) {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo, index) {
    if (todo == deletetodo) {
      todos.splice(index, 1); //o indeksten itibaren 1 değer silinecek.
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const li = document.querySelectorAll(".list-group-item");

  li.forEach(function (li) {
    const text = li.textContent.toLowerCase();

    if (text.indexOf(filterValue) == -1) {
      li.setAttribute("style", "display: none !importantcide");
    } else {
      li.setAttribute("style", "display:block");
    }
  });
}

function clearAllTodos(e) {
  if (confirm("Tümünü silmek istediğinize emin misiniz?")) {
    while (todoList.firstElementChild != null) {
      todoList.removeChild(todoList.firstElementChild);
    }

    localStorage.removeItem("todos");
  }
}
