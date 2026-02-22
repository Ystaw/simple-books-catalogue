import { searchBooks } from '../utils/booksApi.js'
import { renderBooks } from '../views/renderBooks.js'
import { setOverlayMessage } from '../views/overlay.js'

export function initSearch(resultsContainer) {
    const searchBtn = document.getElementById('searchBtn')
    const searchInput = document.getElementById('searchInput')

    async function handleSearch() {
        const query = searchInput.value.trim()

        if (!query) {
            renderBooks([], resultsContainer)
            setOverlayMessage('Enter a search query')
            return
        }

        try {
            setOverlayMessage('Loading...')

            const books = await searchBooks(query)

            if (!books.length) {
                setOverlayMessage('Nothing found')
                return
            }

            setOverlayMessage('', false)
            renderBooks(books, resultsContainer)

        } catch (error) {
            setOverlayMessage('Network error')
            console.error(error)
        }
    }

    searchBtn.addEventListener('click', handleSearch)
    searchInput.addEventListener('input', handleSearch)
}