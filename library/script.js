// Book Object
function Book(author, title, numPages, isRead) {
    if (!new.target) {
        throw Error("Must call object with new");
    }
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.isRead = isRead;
}


function addBookToLibrary(data) {
    // upon click of submit, add new book object to library
    myLibrary.push(new Book(data[0], data[1], data[2], data[3]));
    return;
}

function removeBookFromLibrary(bookId) {
    // check if library is empty
    if (myLibrary.length === 0) {
        alert("Couldn't remove book: no books in library!");
    }
    // remove book with bookId from library array of book objects
    myLibrary = myLibrary.filter(book => book.id != bookId);

    // remove the card from the DOM
    const card = document.querySelector(`[data-book-id="${bookId}"]`);
    card.remove();
}

function displayBook() {
    // check if library is empty
    if (myLibrary.length === 0) {
        alert("Couldn't update shelf: no books in library!");
        return;
    }

    // create card (div) for new book
    let card = document.createElement("div");
    card.classList.add("card");

    // retrieve latest book object
    let book = myLibrary.at(-1);

    // iterate through book key-value pairs
    for (let [key, value] of Object.entries(book)) {
        if (key === "id") {continue; }
        let section = document.createElement("div");
        section.classList.add("section");
        section.innerText = `${capitalize(key)}: ${value}`;
        card.appendChild(section);
    }

    // create remove button and append to card
    let removeButton = document.createElement("button");
    removeButton.classList.add("remove-btn");
    removeButton.innerText = "Delete Book";

    // Add remove button listener
    removeButton.addEventListener('click', (event) => {
        removeBookFromLibrary(book.id);
    });

    card.appendChild(removeButton);

    // set card attribute id to book id
    card.setAttribute("data-book-id", book.id);

    shelf.appendChild(card);
    return;
}


function validateData(data) {
    let author = data[0];
    let title = data[1];
    let pages = data[2];

    // author and title character count check
    if ((author.length === 0 || author.length >= 50) || 
        (title.length === 0 || title.length >= 50)) {
        alert("Author or Title must be between 1 to 50 characters (inclusive)");
        return false;
    }

    // check
    if (!pages) {
        data[2] = "N/A";
    }

    // all checks passed
    return data;
}


function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

// holds all book objects
let myLibrary = [];

// displays book objects as cards
const shelf = document.querySelector("#shelf");

// initiates book creation
const submitBtn = document.querySelector(".submit-btn");


let authorInput = document.querySelector("#author-entry");
let titleInput = document.querySelector("#title-entry");
let pagesInput = document.querySelector("#pages-entry");
let readInput = document.querySelector("#read-check");


submitBtn.addEventListener('click', (event) => {
    let userData = [authorInput.value, titleInput.value, pagesInput.value, readInput.checked];

    userData = validateData(userData);

    if (userData){
        // add new book entry to library
        addBookToLibrary(userData);
        // log new entry to console
        console.log(myLibrary);
        // display new book in shelf
        displayBook();

        // Clear form inputs
        authorInput.value = "";
        titleInput.value = "";
        pagesInput.value = "";
        readInput.checked = false;
    }
});