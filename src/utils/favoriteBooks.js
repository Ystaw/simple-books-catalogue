const STORAGE_KEY = 'favoriteBooks'

let favoriteBooks = loadFromStorage()

function loadFromStorage() {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
}

function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteBooks))
}

export function getFavoriteBooks() {
    return favoriteBooks
}

export function isFavorite(book) {
    return favoriteBooks.some(item => item.key === book.key)
}

export function addToFavorites(book) {
    if (!isFavorite(book)) {
        favoriteBooks.push(book)
        saveToStorage()
    }
}

export function removeFromFavorites(bookKey) {
    favoriteBooks = favoriteBooks.filter(book => book.key !== bookKey)
    saveToStorage()
}

