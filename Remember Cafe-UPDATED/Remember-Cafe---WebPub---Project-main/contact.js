document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !contact || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    // ✅ Show Thank You message
    document.body.innerHTML = `
      <div class="thank-you-wrapper">
        <div class="thank-you-message">
          <h2>Thank you, ${name}!</h2>
          <p>Your message has been sent successfully.</p>
          <p>We will get back to you at <strong>${email}</strong> shortly.</p>
          <button class="back-btn" onclick="window.location.href='index.html'">
            Back to Home
          </button>
        </div>
      </div>
    `;
  });
});
