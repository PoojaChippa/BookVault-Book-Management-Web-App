let books = JSON.parse(localStorage.getItem("books")) || [];

let currentFilter = "All";
let currentSort = "AZ";

function getBookImage(title) {
  return `https://covers.openlibrary.org/b/title/${encodeURIComponent(title)}-M.jpg`;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookForm");
  const filterSelect = document.getElementById("filterSelect");

  if (form) {
    form.addEventListener("submit", handleAddBook);
  }

  document.getElementById("sortAz").onclick = () => {
    currentSort = "AZ";
    renderBooks();
  };

  document.getElementById("sortZa").onclick = () => {
    currentSort = "ZA";
    renderBooks();
  };

  filterSelect.addEventListener("change", (e) => {
    currentFilter = e.target.value;
    renderBooks();
  });

  renderBooks();
});

function handleAddBook(e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const category = document.getElementById("category").value;

  const newBook = {
    id: Date.now(),
    title,
    author,
    category,
    imageUrl: getBookImage(title),
  };

  books.push(newBook);
  localStorage.setItem("books", JSON.stringify(books));

  e.target.reset();
  renderBooks();
}

function renderBooks() {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";

  let filteredBooks = books;

  if (currentFilter !== "All") {
    filteredBooks = books.filter((b) => b.category === currentFilter);
  }

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    return currentSort === "AZ"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  });

  if (sortedBooks.length === 0) {
    bookList.innerHTML = "<p>No books yet</p>";
    return;
  }

  sortedBooks.forEach((book) => {
    const card = document.createElement("div");
    card.className = "book-card";

    card.innerHTML = `
        <img src="${book.imageUrl}" 
        class="book-image"
        onerror="this.src='https://picsum.photos/200/300?random='+Math.random()">

        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <span class="category-tag">${book.category}</span>

        <button class="delete-btn" data-id="${book.id}">
        Delete
        </button>
        `;

    bookList.appendChild(card);
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.onclick = () => {
      const id = Number(btn.dataset.id);
      books = books.filter((b) => b.id !== id);
      localStorage.setItem("books", JSON.stringify(books));
      renderBooks();
    };
  });
}
