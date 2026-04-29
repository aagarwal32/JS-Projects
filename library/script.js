// Book Object
function Book(author, title, numPages, isRead) {
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.isRead = isRead;
}

const myLibrary = [];

function addBookToLibrary() {
    // upon click of submit, add new book object to library
    // initiate displayBook to add the new book to shelf
}

function displayBook() {
    // create card (div) for new book
}

// to retrieve form data, prevent default upon submit click
// pass the 'form' in a new FormData object
// access values with FormData.get(name-attribute-value)