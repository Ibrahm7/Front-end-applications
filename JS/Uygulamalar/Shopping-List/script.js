const shoppingList = document.querySelector(".shopping-list");
const shoppingForm = document.querySelector(".shopping-form");
const filterButtons = document.querySelectorAll(".filter-buttons button");
const clearBtn = document.querySelector(".clear");

//Sayfadaki HTML dosyaları yüklendikten sonra direkt bizim ilk olarak çalışacak kodlarımızdır DOMContentLoaded img ve styles dahil değil.
document.addEventListener("DOMContentLoaded", function () {
  loadItems();

  displayAlert();

  shoppingForm.addEventListener("submit", handleFormSubmit);

  for (let button of filterButtons) {
    button.addEventListener("click", handleFilterSelection);
  }

  clearBtn.addEventListener("click", clear);
});

function clear() {
  shoppingList.innerHTML = "";
  localStorage.clear("shoppingItems");

  displayAlert();
}

function displayAlert() {
  const isEmpty = shoppingList.querySelectorAll("li").length === 0;

  const alert = document.querySelector(".alert");

  alert.classList.toggle("d-none", !isEmpty);
}

function loadItems() {
  const items = JSON.parse(localStorage.getItem("shoppingItems")) || [];

  shoppingList.innerHTML = "";

  for (let item of items) {
    const li = createListItem(item);
    shoppingList.appendChild(li);
  }
}

function addItem(input) {
  const newItem = createListItem({
    id: generateId(),
    name: input.value,
    completed: false,
  });
  shoppingList.appendChild(newItem);

  input.value = "";

  updateFilteredItems();

  saveToLocalStorage();

  displayAlert();
}

function generateId() {
  return Date.now().toString();
}

function handleFormSubmit(e) {
  e.preventDefault();
  const input = document.getElementById("item_name");

  // girilen input'un value'suna bak trim() ile sağ-sol boşlukları sıfırla ve uzunluğu 0 ise uyarı ver
  if (input.value.trim().length == 0) {
    alert("Yeni değer giriniz!!");
    return;
  }
  addItem(input);
}

function toggleCompleted(e) {
  const li = e.target.parentElement;
  li.toggleAttribute("item-completed", e.target.checked);

  updateFilteredItems();

  saveToLocalStorage();
}

function createListItem(item) {
  const input = document.createElement("input");
  input.type = "checkbox";
  input.classList.add("form-check-input");
  input.checked = item.completed;
  input.addEventListener("change", toggleCompleted);

  const div = document.createElement("div");
  div.textContent = item.name;
  div.classList.add("item-name");
  div.addEventListener("click", openEditMode);
  div.addEventListener("blur", closeEditMode);
  div.addEventListener("keydown", cancelEnter);

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fs-3 bi bi-x text-danger delete-icon";
  deleteIcon.addEventListener("click", removeItem);

  const li = document.createElement("li");
  li.className = "border rounded p-2 mb-1";
  li.toggleAttribute("item-completed", item.completed);
  li.setAttribute("item-id", item.id);

  li.appendChild(input);
  li.appendChild(div);
  li.appendChild(deleteIcon);

  return li;
}

function removeItem(e) {
  const li = e.target.parentElement;
  shoppingList.removeChild(li);

  saveToLocalStorage();

  displayAlert();
}

function openEditMode(e) {
  const li = e.target.parentElement;
  if (li.hasAttribute("item-completed") == false) {
    e.target.contentEditable = true;
  }
}

function closeEditMode(e) {
  e.target.contentEditable = false;

  saveToLocalStorage();
}

function cancelEnter(e) {
  if (e.key == "Enter") {
    e.preventDefault();
    closeEditMode(e);
  }
}

function handleFilterSelection(e) {
  const filterBtn = e.target;

  for (let button of filterButtons) {
    button.classList.add("btn-secondary");
    button.classList.remove("btn-primary");
  }

  filterBtn.classList.add("btn-primary");
  filterBtn.classList.remove("btn-secondary");

  filterItems(filterBtn.getAttribute("item-filter"));
}

function filterItems(filterType) {
  const items = shoppingList.querySelectorAll("li");

  for (let item of items) {
    item.classList.remove("d-none");
    item.classList.remove("d-block");

    const completed = item.hasAttribute("item-completed");

    if (filterType == "completed") {
      item.classList.toggle(completed ? "d-flex" : "d-none");
    } else if (filterType == "incomplete") {
      item.classList.toggle(completed ? "d-none" : "d-flex");
    } else {
      item.classList.toggle("d-flex");
    }
  }
}

function updateFilteredItems() {
  const activeFilter = document.querySelector(".btn-primary[item-filter]");

  filterItems(activeFilter.getAttribute("item-filter"));
}

function saveToLocalStorage() {
  const listItems = shoppingList.querySelectorAll("li");
  const liste = [];

  for (let li of listItems) {
    const id = li.getAttribute("item-id");
    const name = li.querySelector(".item-name").textContent;
    const completed = li.hasAttribute("item-completed");

    liste.push({ id, name, completed });
  }

  localStorage.setItem("shoppingItems", JSON.stringify(liste));
}
