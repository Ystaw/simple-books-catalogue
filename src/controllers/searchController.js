import { searchBooks } from '../utils/booksApi.js'
import { renderBooks } from '../views/renderBooks.js'
import { setOverlayMessage } from '../views/overlay.js'
import { debounce } from '../utils/debounce.js'

export function initSearch(resultsContainer) {
    const searchBtn = document.getElementById('searchBtn')
    const searchInput = document.getElementById('searchInput')
    const authorInput = document.getElementById('authorFilter')

    let allBooks = []

    async function handleSearch() {
        const query = searchInput.value.trim()

        if (!query) {
            allBooks = []
            renderBooks([], resultsContainer)
            setOverlayMessage('Enter a search query')
            return
        }

        try {
            setOverlayMessage('Loading...')

            const books = await searchBooks(query)
            allBooks = books

            if (!books.length) {
                setOverlayMessage('Nothing found')
                renderBooks([], resultsContainer)
                return
            }

            setOverlayMessage('', false)
            renderBooks(allBooks, resultsContainer)
            authorInput.value = ''

        } catch (error) {
            setOverlayMessage('Network error')
            console.error(error)
        }
    }

    const debouncedSearch = debounce(handleSearch, 500)

    function handleAuthorFilter() {
        const authorQuery = authorInput.value.trim().toLowerCase()

        if (!authorQuery) {
            renderBooks(allBooks, resultsContainer)
            return
        }

        const filtered = allBooks.filter(book =>
            book.author_name?.some(author =>
                author.toLowerCase().includes(authorQuery)
            )
        )

        renderBooks(filtered, resultsContainer)
    }

    searchBtn.addEventListener('click', handleSearch)
    searchInput.addEventListener('input', debouncedSearch)
    authorInput.addEventListener('input', handleAuthorFilter)
}