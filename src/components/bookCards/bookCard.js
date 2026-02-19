import './bookCard.css'

export function BookCard(book) {
    const card = document.createElement('div')
    card.classList.add('book-card')

    const coverId = book.cover_i

    const coverElement = coverId
        ? `<img 
              src="https://covers.openlibrary.org/b/id/${coverId}-L.jpg" 
              alt="${book.title}" 
              class="book-cover"
           />`
        : `<div class="book-cover placeholder">No Cover</div>`

    card.innerHTML = `
        <div class="book-image-wrapper">
            ${coverElement}
          <button class="favorite-btn">
                <svg class="heart-icon" viewBox="0 0 24 24">
                    <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                        2 5.42 4.42 3 7.5 3
                        9.24 3 10.91 3.81 12 5.09
                        13.09 3.81 14.76 3 16.5 3
                        19.58 3 22 5.42 22 8.5
                        22 12.28 18.6 15.36 13.45 20.04
                        L12 21.35z"
                    />
                </svg>
            </button>
        </div>

        <div class="book-info">
            <h3 class="book-title">
                ${book.title || 'No title'}
            </h3>

            <p class="book-author">
                ${book.author_name
            ? book.author_name.join(', ')
            : 'Unknown author'}
            </p>

            <p class="book-year">
                ${book.first_publish_year || 'Year unknown'}
            </p>
        </div>
    `

    const favBtn = card.querySelector('.favorite-btn')

    favBtn.addEventListener('click', () => {
        favBtn.classList.toggle('active')
    })

    return card
}