const myLibrary = [];


function Book(title, author, pages, read) {
this.title = title;
this. author = author;
this.pages = pages
this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

addBookToLibrary("hobbt", "jjtolkin", 203, "no");
addBookToLibrary("harry poter", "idunno", 233, "yea");