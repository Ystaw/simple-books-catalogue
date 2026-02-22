import { initTheme } from './utils/theme.js'
import { initSearch } from './controllers/searchController.js'
import { initFavorites } from './controllers/favoritesController.js'
import { initFavoritesToggle } from './views/favoritesToggle.js'

export function initApp() {
    const resultsContainer = document.getElementById('results')
    const favoritesContainer = document.getElementById('favoritesList')

    initTheme()
    initSearch(resultsContainer)
    initFavorites(favoritesContainer)
    initFavoritesToggle()
}