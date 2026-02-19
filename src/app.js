import { searchBooks } from './utils/api.js' 

export function initApp() {
    const searchBtn = document.getElementById('searchBtn')
    const searchInput = document.getElementById('searchInput')

    searchBtn.addEventListener('click', async () => {
        const query = searchInput.value.trim()

        if (!query) return

        try {
            const books = await searchBooks(query)
        } catch (error) {
            console.error(error)
        }
    })

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click()
        }
    })
}