const libraryTable = document.getElementById("library-table");
const addBtn = document.getElementById("add");
const bookForm = document.getElementById("book-form");
const bookDialog = document.getElementById("book-dialog");
const closeDialogBtn = document.getElementById("close-dialog");

class Book{
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

class Library {
    constructor(){
        this.bookList = [];
    }

    addBookToLibrary(title, author, pages, read) {
        const newBook = new Book(title, author, pages, read);
        this.bookList.push(newBook);
    }

    removeBook(index) {
        this.bookList.splice(index, 1);
        this.addLibraryToTable(this.bookList);
    }

    addLibraryToTable() {
        libraryTable.innerHTML = "";
        this.bookList.forEach((element, index) => {
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
            removeBtn.addEventListener("click", () => this.removeBook(index));
            removeTd.appendChild(removeBtn);
            tr.appendChild(removeTd);
    
            libraryTable.appendChild(tr);
        });
    }

    
}

function setupLibraryEventListeners(libraryInstance) {
    addBtn.addEventListener("click", () => {
        bookDialog.showModal();
    });

    closeDialogBtn.addEventListener("click", () => {
        bookDialog.close();
    });

    bookForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const pages = document.getElementById("pages").value;
        const read = document.getElementById("read").checked;

        libraryInstance.addBookToLibrary(title, author, pages, read);
        libraryInstance.addLibraryToTable();

        bookForm.reset();
        bookDialog.close();
    });
}

const library = new Library();
setupLibraryEventListeners(library)