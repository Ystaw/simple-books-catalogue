import { FavoriteBookCard } from "../components/favoriteBookCards/favoriteBookCard.js"

export function renderFavoriteBooks(books, container) {
    container.innerHTML = ''

    const countElement = document.getElementById('favoritesCount')
    if (countElement) {
        countElement.textContent =
            `${books.length} ${books.length === 1 ? 'book saved' : 'books saved'}`
    }

    if (!books.length) {
        container.innerHTML = '<p>No favorites yet</p>'
        return
    }

    books.forEach(book => {
        const card = FavoriteBookCard(book)
        container.appendChild(card)
    })
}