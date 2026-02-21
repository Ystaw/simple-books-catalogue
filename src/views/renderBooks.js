import { BookCard } from "../components/bookCards/bookCard"

let allBooks = []
let currentIndex = 0
const BOOKS_PER_BATCH = 10

export function renderBooks(books, container, message = null) {
    const overlay = document.getElementById('resultsOverlay')
    container.innerHTML = ''

    if (message) {
        overlay.classList.add('hidden')
        container.innerHTML = `<p class="results-message">${message}</p>`
        return
    }

    if (!books || books.length === 0) {
        overlay.classList.remove('hidden')
        return
    }

    overlay.classList.add('hidden')

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