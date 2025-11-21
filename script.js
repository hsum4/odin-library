const myLibrary = [];
const libraryTable = document.getElementById("library-table");
const addBtn = document.getElementById("add");
const bookForm = document.getElementById("book-form");
const bookDialog = document.getElementById("book-dialog");
const closeDialogBtn = document.getElementById("close-dialog");

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages
    this.read = read;   
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function addLibraryToTable() {
    libraryTable.innerHTML = "";

    myLibrary.forEach((element) => {
        const tr = document.createElement("tr");
        for (const data of ["title", "author", "pages"]) {
            const td = document.createElement('td');
            td.textContent = element[data];
            tr.appendChild(td);
        }

        const readTd = document.createElement("td");
        const readCheckbox = document.createElement("input");
        readCheckbox.type = "checkbox";
        readCheckbox.checked = element.read;
        readCheckbox.addEventListener("change", () => {
            element.toggleRead();
        });
        readTd.appendChild(readCheckbox);
        tr.appendChild(readTd);

        const removeTd = document.createElement("td");
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.addEventListener("click", () => removeBook(element.id));
        removeTd.appendChild(removeBtn);
        tr.appendChild(removeTd);

        libraryTable.appendChild(tr);
    });
}

addBtn.addEventListener("click", () => {
    bookDialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
    bookDialog.close();
});

bookForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);
    addLibraryToTable(myLibrary);
    saveLibrary();

    bookForm.reset();
    bookDialog.close();
});

function removeBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }
    addLibraryToTable();
    saveLibrary();
}

function saveLibrary() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function loadLibrary() {
    const data = localStorage.getItem("myLibrary");
    console.log(data);
    if (data) {
        const books = JSON.parse(data);
        books.forEach(book => {
            const newBook = new Book(book.title, book.author, book.pages, book.read);
            newBook.id = book.id;
            myLibrary.push(newBook);
        });
    }
    addLibraryToTable();
}

loadLibrary();