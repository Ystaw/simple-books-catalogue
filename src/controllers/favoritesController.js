import { getFavoriteBooks } from '../utils/favoriteBooks.js'
import { renderFavoriteBooks } from '../views/renderFavoriteBooks.js'

export function initFavorites(favoritesContainer) {

    function render() {
        renderFavoriteBooks(getFavoriteBooks(), favoritesContainer)
    }

    render()

    document.addEventListener('favoritesUpdated', render)
}