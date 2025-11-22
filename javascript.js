// Create unique id for the books using crypto.randomUUID().
// Make constructor for book objects to be populated with values and information
// Populate the 'myLibrary' array with those objects and use a loop to display them on the DOM.
// Add a 'New book button' that allows the user to add a new book using the constructor function
// Add this new book onto the array and thusly the DOM.
// Add a 'remove' button to remove a book from the array and the DOM
// Add a button that marks the book as 'read'.
const bookshelf = document.querySelector(".bookshelf");

const myLibrary = [];

// DOM Constants:
const book = document.createElement("div");
book.classList.add("book-card");
book.textContent = "Book 1";
const title = document.createElement("p");
title.className = "title";
const author = document.createElement("p");
author.className = "author";
const genre = document.createElement("p");
genre.className = "genre";
const readButton = document.createElement("button");
readButton.className = "read-button";
readButton.textContent = "Read?";
const removeButton = document.createElement("button");
removeButton.className = "remove-button";
removeButton.textContent = "Remove book";
bookshelf.appendChild(book);
book.appendChild(title);
book.appendChild(author);
book.appendChild(genre);

const buttonArea = document.createElement("div");
buttonArea.className = "button-area";
book.appendChild(buttonArea);
buttonArea.appendChild(readButton);
buttonArea.appendChild(removeButton);

// Constructor
const Book = function(title, author, genre) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor!");
    }
    this.title = title;
    this.author = author;
    this.genre = genre;
}

Book.prototype.read = false;
Book.prototype.remove = false;

Book.prototype.getID = function() {
    this.id = crypto.randomUUID();
}

Book.prototype.bookRead = function() {
    if (this.read === true) {
        this.read = false;
    } else {
        this.read = true;
    }
}

Book.prototype.bookRemove = function() {
    if (this.remove === true) {
        this.remove = false;
    } else {
        this.remove = true;
    }
}
// Populate array with books
function addBookToLibrary(title, author, genre) {
    if (title === undefined || author === undefined || genre === undefined) {
        throw new Error("Please enter all information, 'title', 'author' and 'genre'!");
    };
    const book = new Book(title, author, genre);
    book.getID();
    myLibrary.push(book);
}


// Find books marked for removal and remove from array!
function removeBook(array) {
    let index = array.findIndex(item => item.remove === true);
    return array.splice(index, 1);
}

// Initial book-cards for visualization

addBookToLibrary("Manufacturing Consent", "Edward S. Herman & Noam Chomsky", "Political Essay");

title.textContent = myLibrary[0].title;
author.textContent = myLibrary[0].author;
genre.textContent = myLibrary[0].genre;