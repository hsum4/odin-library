const myLibrary = [];
const libraryTable = document.getElementById("library-table");
const addBtn = document.getElementById("add");
const bookForm = document.getElementById("book-form");
const bookDialog = document.getElementById("book-dialog");
const closeDialogBtn = document.getElementById("close-dialog");

function Book(title, author, pages, read) {
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

function addLibraryToTable(myLibrary) {
    libraryTable.innerHTML = "";

    myLibrary.forEach((element, index) => {
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
        removeBtn.addEventListener("click", () => removeBook(index));
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

    bookForm.reset();
    bookDialog.close();
});

function removeBook(index) {
    myLibrary.splice(index, 1);
    addLibraryToTable(myLibrary);
}