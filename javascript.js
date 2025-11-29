
(function () {
    function cacheDom() {
        let DOM = [];
        DOM.bookshelf = document.querySelector(".bookshelf");
        DOM.dialog = document.querySelector("dialog");
        DOM.showButton = document.querySelector("button.add-button");
        DOM.addButton = document.querySelector("dialog button.add-book");
        DOM.closeButton = document.querySelector("dialog button");
        DOM.title = document.querySelector("#title");
        DOM.author = document.querySelector("#author");
        DOM.genre = document.querySelector("#genre");
        return DOM;
    }
class Book {
    constructor(title, author, genre) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.id = this.getID();
        this.read = false;
        this.delete = false;
    }

    getID() {
        return crypto.randomUUID();
    }

    markBookRead() {
        if (this.read == true) {
            this.read = false;
        } else {
            this.read = true;
        }
    }

    markBookDelete() {
        this.delete = true;
    }
}

const handlers = {
    addBookToLibrary(title, author, genre) {
        if (title === "" || author === "" || genre === "") {
        alert("Please enter all information, 'title', 'author' and 'genre'!");
        throw new Error("Error!");
        } else {
        const book = new Book(title, author, genre);
        myLibrary.push(book);
        console.log(myLibrary);
    }
    },
    removeBook(array) {
        let index = array.findIndex(item => item.remove === true);
        return array.splice(index, 1);
    },
    drawBooks(DOM, library) {
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
            DOM.bookshelf.appendChild(book);
            book.appendChild(title);
            book.appendChild(author);
            book.appendChild(genre);
            book.appendChild(buttonArea);
            buttonArea.appendChild(readButton);
            buttonArea.appendChild(removeButton);
            DOM.book = document.querySelector(".book-card");
            DOM.bookTitle = document.querySelector(".title");
            DOM.bookAuthor = document.querySelector(".author");
            DOM.bookGenre = document.querySelector(".genre");
            DOM.readButton = document.querySelectorAll(".read-button");
            DOM.removeButton = document.querySelectorAll(".remove-button");
        title.textContent = item.title;
        author.textContent = item.author;
        genre.textContent = item.genre;
    });
}
}

const listeners = {
    showDialog(DOM) {
        DOM.showButton.addEventListener("click", function () {
            DOM.dialog.showModal();
        });
    },
    addButton(DOM, handler) {
        DOM.addButton.addEventListener("click", () => {
            if (DOM.title.value === "" || DOM.author.value === "" || DOM.genre.value === "") {
                throw new Error(alert("Please enter all information, 'title', 'author' and 'genre'!"));
            }
            const madeBooks = document.querySelectorAll(".book-card");
            if (madeBooks) {
                madeBooks.forEach((book) => {
                    book.remove();
                });
            }
            handler.addBookToLibrary(DOM.title.value, DOM.author.value, DOM.genre.value);
            handler.drawBooks(DOM, myLibrary);
            DOM.dialog.close();
            DOM.title.value = "";
            DOM.author.value = "";
            DOM.genre.value = "";
        });
    },
    closeButton(DOM) {
        DOM.closeButton.addEventListener("click", () => {
            DOM.dialog.close();
        });
    },
    readButton(DOM) {
        if (DOM.readButton) {
            DOM.readButton.forEach((button) => {
                button.addEventListener("click", () => {
                    
                    DOM.book.classList.toggle("read");
                    DOM.book.classList.toggle("read");
                    DOM.bookTitle.classList.toggle("read");
                    DOM.bookAuthor.classList.toggle("read");
                    DOM.bookGenre.classList.toggle("read");
        });
            })
        } else {
            console.log("No Books yet!");
        }
        
    },
    removeButton(DOM, handler) {
        if (DOM.removeButton) {
            DOM.removeButton.forEach((button) => {
                button.addEventListener("click", () => {
                    Book.markBookDelete();
                    handler.removeBook(myLibrary);
                    DOM.book.remove();
                })
            });
        } else {
            console.log("No books yet!");
        }
        
    },
}
const DOM = cacheDom();
const myLibrary = [];
handlers.addBookToLibrary("Manufacturing Consent", "Edward S. Herman & Noam Chomsky", "Political Essay");
handlers.addBookToLibrary("Sacred and Terrible Air", "Robert Kurvitz", "Crime, fantasy");
handlers.drawBooks(DOM, myLibrary);
console.log(myLibrary.Book.title);


listeners.showDialog(DOM);
listeners.addButton(DOM, handlers);
listeners.closeButton(DOM);
listeners.readButton(DOM);
listeners.removeButton(DOM, handlers)

})();


// Initial book-cards for visualization

// addBookToLibrary("Manufacturing Consent", "Edward S. Herman & Noam Chomsky", "Political Essay");
// addBookToLibrary("Sacred and Terrible Air", "Robert Kurvitz", "Crime, fantasy");
// drawBooks(myLibrary);