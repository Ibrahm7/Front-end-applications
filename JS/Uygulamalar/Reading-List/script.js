const input = document.querySelector("#book-input");
const addButton = document.querySelector("#add-btn");
const bookList = document.querySelector(".book-list");

addButton.addEventListener("click", addBook);

let books = [];

function addBook() {
  const book = {
    id: generateId(),
    name: input.value,
    completed: false,
  };
  books.push(book);
  saveToLocalStorage();
  const newBook = createList(book);
  bookList.appendChild(newBook);
  input.value = "";
}

function generateId() {
  return Math.floor(Math.random() * 100000).toString();
}

function createList(book) {
  const li = document.createElement("li");
  li.className = "border rounded p-2 mb-1";
  li.setAttribute("book-id", book.id);

  const input = document.createElement("input");
  input.type = "checkbox";
  input.classList.add("form-check-input");
  input.checked = book.completed;
  input.addEventListener("change", function (e) {
    const li = e.target.parentElement;
    book.completed = e.target.checked;
    li.toggleAttribute("item-completed", e.target.checked);
    saveToLocalStorage();
  });

  const div = document.createElement("div");
  div.textContent = book.name;
  div.className = "book-name";

  const editIcon = document.createElement("i");
  editIcon.className = "bi bi-pencil";
  editIcon.addEventListener("click", function (e) {
    const li = e.target.parentElement;
    const id = li.getAttribute("book-id");

    const book = books.find(function (book) {
      return book.id === id;
    });

    const nameDiv = li.querySelector(".book-name");
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = book.name;
    nameDiv.replaceWith(editInput);

    editInput.addEventListener("keydown", function (e) {
      if (e.key == "Enter") {
        book.name = editInput.value;
        saveToLocalStorage();
        const newDiv = document.createElement("div");
        newDiv.textContent = book.name;
        newDiv.className = "book-name";
        editInput.replaceWith(newDiv);
      }
    });

    editInput.addEventListener("blur", function () {
      const newDiv = document.createElement("div");
      newDiv.textContent = book.name;
      newDiv.className = "book-name";
      editInput.replaceWith(newDiv);
    });
  });

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "bi bi-trash";
  deleteIcon.addEventListener("click", function (e) {
    const li = e.target.parentElement;
    const id = li.getAttribute("book-id");

    books = books.filter(function (book) {
      return book.id != id;
    });
    saveToLocalStorage();

    li.remove();
  });

  li.appendChild(input);
  li.appendChild(div);
  li.appendChild(editIcon);
  li.appendChild(deleteIcon);

  return li;
}

function saveToLocalStorage() {
  localStorage.setItem("readingItems", JSON.stringify(books));
}

function loadFromLocalStorage() {
  const savedBooks = localStorage.getItem("readingItems");

  if (savedBooks) {
    books = JSON.parse(savedBooks);

    for (let book of books) {
      const li = createList(book);
      bookList.appendChild(li);
    }
  }
}

loadFromLocalStorage();
