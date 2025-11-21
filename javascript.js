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
Book.prototype.getID = function() {
    this.id = crypto.randomUUID();
}



function addBookToLibrary(title, author, genre) {
    const book = new Book(title, author, genre);
    book.getID();
    myLibrary.push(book);
}