// Create unique id for the books using crypto.randomUUID().
// Make constructor for book objects to be populated with values and information
// Populate the 'myLibrary' array with those objects and use a loop to display them on the DOM.
// Add a 'New book button' that allows the user to add a new book using the constructor function
// Add this new book onto the array and thusly the DOM.
// Add a 'remove' button to remove a book from the array and the DOM
// Add a button that marks the book as 'read'.
const bookshelf = document.querySelector(".bookshelf");
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const addButton = document.querySelector("dialog button.add-book");
const closeButton = document.querySelector("dialog button");

const myLibrary = [];


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
    if (title === "" || author === "" || genre === "") {
        alert("Please enter all information, 'title', 'author' and 'genre'!");
        throw new Error("Error!");
    } else {
        const book = new Book(title, author, genre);
        book.getID();
        myLibrary.push(book);
    }
}


// Find books marked for removal and remove from array!
function removeBook(array) {
    let index = array.findIndex(item => item.remove === true);
    return array.splice(index, 1);
    
}

// Read through library and draw each item
function drawBooks(library) {
    library.forEach((item) => {
        const book = document.createElement("div");
        book.classList.add("book-card");
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
        const buttonArea = document.createElement("div");
        buttonArea.className = "button-area";
        bookshelf.appendChild(book);
        book.appendChild(title);
        book.appendChild(author);
        book.appendChild(genre);
        book.appendChild(buttonArea);
        buttonArea.appendChild(readButton);
        buttonArea.appendChild(removeButton);

        readButton.addEventListener("click", () => {
            item.bookRead();
            if (book.className === "book-card read") {
                book.classList.remove("read");
                title.classList.remove("read");
                author.classList.remove("read");
                genre.classList.remove("read");
            } else {
                book.classList.add("read");
                title.classList.add("read");
                author.classList.add("read");
                genre.classList.add("read");
            }
        });

        removeButton.addEventListener("click", () => {
            item.bookRemove();
            removeBook(myLibrary);
            book.remove();
        })

        title.textContent = item.title;
        author.textContent = item.author;
        genre.textContent = item.genre;
    });
}

// eventListeners 

showButton.addEventListener("click", () => {
    dialog.showModal();
});
addButton.addEventListener("click", () => {
    const bookTitle = document.querySelector("#title");
    const bookAuthor = document.querySelector("#author");
    const bookGenre = document.querySelector("#genre");
    if (bookTitle.value === "" || bookAuthor.value === "" || bookGenre.value === "") {
        alert("Please enter all information, 'title', 'author' and 'genre'!");
        throw new Error("Error!");
    }
    const book = document.querySelectorAll(".book-card");
    if (book) {
        book.forEach((item) => {
            item.remove();
        });
    };
    addBookToLibrary(bookTitle.value, bookAuthor.value, bookGenre.value);
    
    drawBooks(myLibrary);
    bookTitle.value = "";
    bookAuthor.value = "";
    bookGenre.value = "";
    dialog.close();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});
// Initial book-cards for visualization

addBookToLibrary("Manufacturing Consent", "Edward S. Herman & Noam Chomsky", "Political Essay");
addBookToLibrary("Sacred and Terrible Air", "Robert Kurvitz", "Crime, fantasy");
drawBooks(myLibrary);