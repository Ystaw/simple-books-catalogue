import { searchBooks } from './utils/api.js'
import { renderBooks } from './views/renderBooks.js'
import { getFavoriteBooks } from './utils/favoriteBooks.js'
import { renderFavoriteBooks } from './views/renderFavoriteBooks.js'

export function initApp() {
    const searchBtn = document.getElementById('searchBtn')
    const searchInput = document.getElementById('searchInput')
    const resultsContainer = document.getElementById('results')
    const favoritesContainer = document.getElementById('favoritesList')

    function debounce(fn, delay = 500) {
        let timeout

        return (...args) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => fn(...args), delay)
        }
    }

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

    const debouncedSearch = debounce(handleSearch, 500)

    searchBtn.addEventListener('click', handleSearch)

    searchInput.addEventListener('input', () => {
        if (!searchInput.value.trim()) {
            renderBooks([], resultsContainer)
            return
        }

        debouncedSearch()
    })

    renderFavoriteBooks(getFavoriteBooks(), favoritesContainer)

    document.addEventListener('favoritesUpdated', () => {
        renderFavoriteBooks(getFavoriteBooks(), favoritesContainer)
    })

    function setOverlayMessage(text, show = true) {
        const overlay = document.getElementById('resultsOverlay')
        const message = overlay.querySelector('.results-message')

        message.textContent = text

        if (show) {
            overlay.classList.remove('hidden')
        } else {
            overlay.classList.add('hidden')
        }
    }
}