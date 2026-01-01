
(function () {
    function cacheDom() {
        let DOM = [];
        DOM.bookshelf = document.querySelector(".bookshelf");
        DOM.dialog = document.querySelector("dialog");
        DOM.form = document.querySelector("form");
        DOM.showButton = document.querySelector("button.add-button");
        DOM.addButton = document.querySelector("dialog button.add-book");
        DOM.closeButton = document.querySelector("dialog button");
        DOM.title = document.getElementById("title");
        DOM.author = document.getElementById("author");
        DOM.genre = document.getElementById("genre");
        DOM.error = document.querySelectorAll(".error");
        return DOM;
    }

    class DefaultCard {

        constructor(DOM) {
            this.DOM = DOM;
            this.div = document.createElement("div");
            this.para = document.createElement("p");
        }

        drawDefault() {
            this.div.className = "default-card";
            this.para.className = "default-para";
            let message = ["Click the add button above to add a book to your personal library!", "Why don't ya give it a try? Add a book to your library with the add button above!", "Add a book to view it in your library!"];
            let random = Math.floor(Math.random() * message.length);
            this.DOM.bookshelf.appendChild(this.div);
            this.div.appendChild(this.para);
            this.para.textContent = message[random];
    }

        deleteDefault() {
            this.div.remove();
        }
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

    drawBook(DOM) {
        const book = document.createElement("div");
        book.classList.add("book-card");
        const title = document.createElement("p");
        title.classList.add("title");
        const author = document.createElement("p");
        author.classList.add("author");
        const genre = document.createElement("p");
        genre.classList.add("genre");
        const readButton = document.createElement("button");
        readButton.classList.add("read-button");
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

        DOM.madeBook = document.querySelector(".book-card");
        DOM.bookTitle = document.querySelector(".title");
        DOM.bookAuthor = document.querySelector(".author");
        DOM.bookGenre = document.querySelector(".genre");

        readButton.addEventListener("click", () => {
            this.markBookRead(DOM);
            title.classList.toggle("read");
            author.classList.toggle("read");
            genre.classList.toggle("read");
            book.classList.toggle("read");
        });
        removeButton.addEventListener("click", () => {
            this.delete = true;
            this.removeBook(myLibrary);
            book.remove();
            handlers.reloadLibrary(DOM);
            
        });

        title.textContent = this.title;
        author.textContent = this.author;
        genre.textContent = this.genre;
    }

    removeBook(array) {
            let index = array.findIndex(item => item.delete === true);
            return array.splice(index, 1);
    }

}

const validationFunctions = {
    submitValidation() {
        this.checkInput();
        DOM.form.addEventListener("submit", (e) => {
            e.preventDefault();
            let fields = DOM.form.querySelectorAll("input");
            let isValid = true;
            fields.forEach((item) => {
                const fieldValid = this.validateField(item);
                if (!fieldValid) {
                    isValid = false;
                }
            });
            if (isValid) {
                console.log("good!");
                listeners.addButton(DOM, handlers)
            } else {
                DOM.form.querySelector(":invalid").focus();
            }
        });
    },
    
     validateField(field) {
        const error = field.parentElement.querySelector(".error-message")
        if (!field.validity.valid) {
            
            error.textContent = field.dataset.error;
            return false;
        } else {
            error.textContent = "";
            return true;
        }
    },
    checkInput() {
        DOM.form.querySelectorAll("input").forEach(input => {
            input.addEventListener("blur", () => {
                this.validateField(input);
            })
        })
    }
}


const handlers = {
    addBookToLibrary(title, author, genre, DOM) {
        if (title === "" || author === "" || genre === "") {
        // alert("Please enter all information, 'title', 'author' and 'genre'!");
        // throw new Error("Error!");
        } else {
        const book = new Book(title, author, genre);
        myLibrary.push(book);
        book.drawBook(DOM);
        console.log(myLibrary);
    }
    },
    card: ""
    ,

    isEmpty(DOM) {
        this.card = new DefaultCard(DOM);
        this.card.drawDefault();
    },

    isNotEmpty() {
        if (document.querySelector(".book-card")) {
            this.card.deleteDefault();
        } else {
            return;
        }
    },

    reloadLibrary(DOM) {
        if (!document.querySelector(".book-card"))
        {
            this.isEmpty(DOM); 
        } else {
            this.isNotEmpty();
        }
    }
}

const listeners = {
    showDialog(DOM) {
        DOM.showButton.addEventListener("click", function () {
            DOM.dialog.showModal();
            
        });
    },
    addButton(DOM, handler) {
        
            let foundBooks = document.querySelectorAll(".book-card");
            if (foundBooks) {
                foundBooks.forEach((item) => {
                    item.remove();
                })
                myLibrary.forEach((book) => {
                    book.drawBook(DOM);
                })
            }
            handler.addBookToLibrary(DOM.title.value, DOM.author.value, DOM.genre.value, DOM);
            DOM.dialog.close();
            DOM.form.reset();
            handler.reloadLibrary(DOM);
    },
    closeButton(DOM) {
        DOM.closeButton.addEventListener("click", () => {
            DOM.dialog.close();
        });
    },
        
}
const DOM = cacheDom();
const myLibrary = [];
handlers.reloadLibrary(DOM)
// handlers.addBookToLibrary("Manufacturing Consent", "Edward S. Herman & Noam Chomsky", "Political Essay", DOM);
// handlers.addBookToLibrary("Sacred and Terrible Air", "Robert Kurvitz", "Crime, fantasy", DOM);
listeners.showDialog(DOM);
// listeners.addButton(DOM, handlers);
validationFunctions.submitValidation();
listeners.closeButton(DOM);
})();