import './favoriteBookCard.css'
import { removeFromFavorites } from '../../utils/favoriteBooks.js'

export function FavoriteBookCard(book) {
    const card = document.createElement('div')
    card.classList.add('favorite-book-card')

    const coverId = book.cover_i

    const coverElement = coverId
        ? `<img 
              src="https://covers.openlibrary.org/b/id/${coverId}-M.jpg" 
              alt="${book.title}" 
              class="favorite-book-cover"
           />`
        : `<div class="favorite-book-cover placeholder">No Cover</div>`

    card.innerHTML = `
        ${coverElement}
        <div class="favorite-book-info">

            <div class="text-column">
                <h4>${book.title}</h4>

                <p class="book-authors">
                    ${book.author_name ? book.author_name.join(', ') : 'Unknown author'}
                </p>

                <p class="book-year">
                    ${book.first_publish_year || 'Year unknown'}
                </p>
            </div>

            <button class="remove-btn active">
                <svg class="heart-icon" viewBox="0 0 16 16"  xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.6667 9.33333C13.66 8.36 14.6667 7.19333 14.6667 5.66667C14.6667 4.69421 14.2804 3.76158 13.5928 3.07394C12.9051 2.38631 11.9725 2 11 2C9.82671 2 9.00004 2.33333 8.00004 3.33333C7.00004 2.33333 6.17337 2 5.00004 2C4.02758 2 3.09495 2.38631 2.40732 3.07394C1.71968 3.76158 1.33337 4.69421 1.33337 5.66667C1.33337 7.2 2.33337 8.36667 3.33337 9.33333L8.00004 14L12.6667 9.33333Z"  stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>

        </div>
    `

    const favBtn = card.querySelector('.remove-btn')

    favBtn.addEventListener('click', () => {
        removeFromFavorites(book.key)

        card.remove()

        document.dispatchEvent(new Event('favoritesUpdated'))
    })

    return card
}