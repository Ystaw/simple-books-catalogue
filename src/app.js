import { searchBooks } from './utils/api.js'
import { renderBooks } from './views/renderBooks.js'

export function initApp() {
    const searchBtn = document.getElementById('searchBtn')
    const searchInput = document.getElementById('searchInput')
    const resultsContainer = document.getElementById('results')

    searchBtn.addEventListener('click', async () => {
        const query = searchInput.value.trim()

        if (!query) {
            resultsContainer.innerHTML = '<p>Enter a search query</p>'
            return
        }

        try {
            resultsContainer.innerHTML = '<p>Loading...</p>'

            const books = await searchBooks(query)

            if (!books.length) {
                resultsContainer.innerHTML = '<p>Nothing found</p>'
                return
            }

            renderBooks(books, resultsContainer)

        } catch (error) {
            resultsContainer.innerHTML = '<p>Network error</p>'
            console.error(error)
        }
    })

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click()
        }
    })
}