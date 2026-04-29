const state = {
  books: [],
  search: "",
  genre: "all",
  status: "all"
};

const elements = {
  list: document.getElementById("bookList"),
  message: document.getElementById("message"),
  searchInput: document.getElementById("searchInput"),
  genreFilter: document.getElementById("genreFilter"),
  statusFilter: document.getElementById("statusFilter")
};

init();

async function init() {
  attachEvents();
  await loadBooks();
}

function attachEvents() {
  elements.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value.trim().toLowerCase();
    render();
  });

  elements.genreFilter.addEventListener("change", (event) => {
    state.genre = event.target.value;
    render();
  });

  elements.statusFilter.addEventListener("change", (event) => {
    state.status = event.target.value;
    render();
  });
}

async function loadBooks() {
  try {
    const response = await fetch("bookcatalog.xml");
    if (!response.ok) {
      throw new Error("Could not load XML file.");
    }

    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");

    const parserError = xmlDoc.querySelector("parsererror");
    if (parserError) {
      throw new Error("Invalid XML format.");
    }

    state.books = extractBooks(xmlDoc);
    populateFilters(state.books);
    render();
  } catch (error) {
    elements.message.textContent =
      "Could not load bookcatalog.xml. Run this in a local web server (for example, VS Code Live Server).";
    elements.list.innerHTML = "";
  }
}

function extractBooks(xmlDoc) {
  const bookNodes = Array.from(xmlDoc.querySelectorAll("Book"));

  return bookNodes.map((bookNode) => {
    const id = bookNode.getAttribute("id") || "N/A";
    const title = getText(bookNode, "Title");
    const authors = Array.from(bookNode.querySelectorAll("Author")).map((authorNode) =>
      authorNode.textContent.trim()
    );
    const genre = getText(bookNode, "Genre");

    const priceNode = bookNode.querySelector("Price");
    const currency = priceNode?.getAttribute("currency") || "USD";
    const price = priceNode?.textContent?.trim() || "0.00";

    const availabilityNode = bookNode.querySelector("Availability");
    const status = availabilityNode?.getAttribute("status") || "Unknown";
    const quantity = getText(availabilityNode, "Quantity");

    return {
      id,
      title,
      authors,
      genre,
      price,
      currency,
      status,
      quantity
    };
  });
}

function getText(root, selector) {
  if (!root) return "";
  const node = root.querySelector(selector);
  return node?.textContent?.trim() || "";
}

function populateFilters(books) {
  const genres = [...new Set(books.map((book) => book.genre).filter(Boolean))].sort();
  const statuses = [...new Set(books.map((book) => book.status).filter(Boolean))].sort();

  for (const genre of genres) {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    elements.genreFilter.append(option);
  }

  for (const status of statuses) {
    const option = document.createElement("option");
    option.value = status;
    option.textContent = status;
    elements.statusFilter.append(option);
  }
}

function getFilteredBooks() {
  return state.books.filter((book) => {
    const searchableText = `${book.title} ${book.authors.join(" ")}`.toLowerCase();
    const matchesSearch = searchableText.includes(state.search);
    const matchesGenre = state.genre === "all" || book.genre === state.genre;
    const matchesStatus = state.status === "all" || book.status === state.status;

    return matchesSearch && matchesGenre && matchesStatus;
  });
}

function render() {
  const filteredBooks = getFilteredBooks();

  if (filteredBooks.length === 0) {
    elements.message.textContent = "No books match the selected filters.";
    elements.list.innerHTML = "";
    return;
  }

  elements.message.textContent = `Showing ${filteredBooks.length} of ${state.books.length} books`;

  elements.list.innerHTML = filteredBooks
    .map(
      (book) => `
      <article class="book-card">
        <h2>${escapeHtml(book.title)}</h2>
        <p class="book-meta"><strong>ID:</strong> ${escapeHtml(book.id)}</p>
        <p class="book-meta"><strong>Author(s):</strong> ${escapeHtml(book.authors.join(", "))}</p>
        <p class="book-meta"><strong>Genre:</strong> ${escapeHtml(book.genre)}</p>
        <p class="book-meta"><strong>Price:</strong> ${escapeHtml(book.currency)} ${escapeHtml(book.price)}</p>
        <p class="book-meta"><strong>Quantity:</strong> ${escapeHtml(book.quantity)}</p>
        <span class="badge">${escapeHtml(book.status)}</span>
      </article>
    `
    )
    .join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
