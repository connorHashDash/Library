let log = console.log

let j = 0; // to cycle the "myLibrary" array by one

const mainDiv = document.getElementById('main')
const newBook = document.getElementById('newBook')
const openFormButton = document.querySelectorAll('[data-modal-target]')
const closeFormButton = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

//form elements
const formTitle = document.getElementById('title')
const formAuthor = document.getElementById('author')
const formPages = document.getElementById('pages')
const form = document.getElementById('form')
const formSubmit = document.getElementById('formSubmit')

//Data from form
let myLibrary = [];

let x = 0;
form.addEventListener('submit', (e) => {
    e.preventDefault()
    let inputTitle = document.getElementsByName('title')[0].value
    let inputAuthor = document.getElementsByName('author')[0].value
    let inputPage = document.getElementsByName('pages')[0].value
    let inputReadToggle = document.getElementById('readToggle').checked
    log(inputReadToggle)
    myLibrary[j] = new Book(inputTitle, inputAuthor, inputPage, inputReadToggle)
    form.reset();
    j++;
    x++;
    log(x);
    bookDisplay();
});

openFormButton.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

closeFormButton.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modalForm')
        closeModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modalForm.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

function Book(title, author, pages, read) {
    this.title = title,
        this.author = author,
        this.pages = pages,
        this.read = read,
        this.readChange = function() {
            if (this.read == false) {
                this.read.innerHTML = '';
                this.read.innerHTML = 'Read: yes';
                this.read = true;
            } else {
                this.read.innerHTML = '';
                this.read.innerHTML = 'Read: no';
                this.read = false;
            }
        }
}

    let i = 0;
function bookDisplay() {
    let bookDiv = document.createElement('div')
    bookDiv.className = `bookDiv`
    mainDiv.appendChild(bookDiv)

    let currentBook = myLibrary[i]
    let title = document.createElement('p')
    title.className = `title`
    title.innerHTML = `Title: ${currentBook.title}`
    bookDiv.appendChild(title)

    let author = document.createElement('p')
    author.className = `author`
    author.innerHTML = `Author: ${currentBook.author}`
    bookDiv.appendChild(author)

    let pages = document.createElement('p')
    pages.className = `pages`
    pages.innerHTML = `Pages: ${currentBook.pages}`
    bookDiv.appendChild(pages)

    let read = document.createElement('p')
    if (currentBook.read == true){
        read.className = `read`
        read.innerHTML = `Read: yes`
        bookDiv.appendChild(read)
    } else{
        read.className = `read`
        read.innerHTML = `Read: no`
        bookDiv.appendChild(read)
    }
    

    let removeButton = document.createElement('button')
    removeButton.innerHTML = `Remove`
    removeButton.className = `RemoveButton`
    bookDiv.appendChild(removeButton)
    removeButton.addEventListener('click', function() {
        this.parentElement.remove()
    });
    i++
    let readButton = document.createElement('Button')
    readButton.innerHTML = `Read`
    readButton.className = `readButton`
    bookDiv.appendChild(readButton)
    readButton.addEventListener('click', function() {
        let readStatus = false
        if (read.innerHTML == 'Read: no') {
            read.innerHTML = '';
            read.innerHTML = 'Read: yes';
            readStatus = true
        } else {
            read.innerHTML = '';
            read.innerHTML = 'Read: no';
            readStatus = false
        }
    });
}
