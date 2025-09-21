// Add this script to the end of your body tag in index.html,
// or in a separate JavaScript file linked to your HTML.

document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('open-infographic-btn');
    const closeBtn = document.getElementById('close-infographic-btn');
    const overlay = document.getElementById('infographic-overlay');

    openBtn.addEventListener('click', () => {
        overlay.classList.add('show');
    });

    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('show');
    });

    // Optional: Close the overlay when clicking outside the content
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('show');
        }
    });
});