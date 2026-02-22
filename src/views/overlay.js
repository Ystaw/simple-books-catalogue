export function setOverlayMessage(text, show = true) {
    const overlay = document.getElementById('resultsOverlay');
    const message = overlay.querySelector('.results-message');

    message.textContent = text;

    overlay.classList.toggle('hidden', !show);
}