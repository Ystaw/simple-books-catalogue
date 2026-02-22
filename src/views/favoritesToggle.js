export function initFavoritesToggle() {
    const favoritesHeader = document.querySelector('.favorites-header');
    const favoritesBlock = document.querySelector('.favorites');

    if (!favoritesHeader || !favoritesBlock) return;

    favoritesHeader.addEventListener('click', () => {
        favoritesBlock.classList.toggle('collapsed');
    });
}