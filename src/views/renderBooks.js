import { BookCard } from "../components/bookCards/bookCard"

let allBooks = []
let currentIndex = 0
const BOOKS_PER_BATCH = 10

export function renderBooks(books, container) {
    container.innerHTML = ''

    if (!books || books.length === 0) {
        container.innerHTML = '<p>Nothing found</p>'
        return
    }

    allBooks = books
    currentIndex = 0

    renderNextBatch(container)

    container.removeEventListener('scroll', handleScroll)
    container.addEventListener('scroll', () => handleScroll(container))
}

function renderNextBatch(container) {
    const nextBooks = allBooks.slice(currentIndex, currentIndex + BOOKS_PER_BATCH)

    nextBooks.forEach(book => {
        const card = BookCard(book)
        container.appendChild(card)
    })

    currentIndex += BOOKS_PER_BATCH
}

function handleScroll(container) {
    const bottomReached =
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 50

    if (bottomReached && currentIndex < allBooks.length) {
        renderNextBatch(container)
    }
}

export function renderLoading(container) {
    container.innerHTML = '<p>Loading...</p>'
}

export function renderError(container, message) {
    container.innerHTML = `<p>${message}</p>`
}