// Create unique id for the books using crypto.randomUUID().
// Make constructor for book objects to be populated with values and information
// Populate the 'myLibrary' array with those objects and use a loop to display them on the DOM.
// Add a 'New book button' that allows the user to add a new book using the constructor function
// Add this new book onto the array and thusly the DOM.
// Add a 'remove' button to remove a book from the array and the DOM
// Add a button that marks the book as 'read'.
const bookshelf = document.querySelector(".bookshelf");

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
    this.read = true;
}

Book.prototype.bookRemove = function() {
    this.remove = true;
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

// When "read" button pressed, marks book as read:
function markBookAsRead(book) {
    book.bookRead();
    return book.read;
}


// when remove book is clicked, run these two functions.
function markBookToRemove(book) {
    book.bookRemove();
    return book.remove;
}
// Find books marked for removal and remove from array!
function removeBook(array) {
    let index = array.findIndex(item => item.remove === true);
    return array.splice(index, 1);
}
