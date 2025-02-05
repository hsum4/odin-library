const myLibrary = [];
const libraryTable = document.getElementById("library-table");


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

function addLibraryToTable(myLibrary) {
    libraryTable.innerHTML = "";
    myLibrary.forEach(element => {
        const tr = document.createElement("tr");
        for (const data in element) {
            if (element.hasOwnProperty(data)) {
                const td = document.createElement('td');
                td.textContent = element[data];
                tr.appendChild(td);
            }
        }
        libraryTable.appendChild(tr);
    });
}

addBookToLibrary("hobbt", "jjtolkin", 203, "no");
addBookToLibrary("harry poter", "idunno", 233, "yea");

addLibraryToTable(myLibrary);