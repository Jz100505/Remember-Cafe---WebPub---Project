// DOM elements
const cartItemsContainer = document.getElementById("cartItems");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");
const DELIVERY_FEE = 50;

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* --------------------
   Render Cart Items
-------------------- */
function renderCart() {
  cartItemsContainer.innerHTML = "";
  let subtotal = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach(item => {
      subtotal += item.price * item.qty;

      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div class="cart-info">
          <h3>${item.name}</h3>
          <p>₱${item.price}.00</p>
          <div class="cart-controls">
            <button onclick="updateQty(${item.id}, -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="updateQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="remove-btn" onclick="removeItem(${item.id})">🗑</button>
      `;
      cartItemsContainer.appendChild(div);
    });
  }

  subtotalEl.textContent = subtotal;
  totalEl.textContent = subtotal + DELIVERY_FEE;
}

/* --------------------
   Update Quantity
-------------------- */
function updateQty(id, change) {
  const product = cart.find(item => item.id === id);
  if (product) {
    product.qty += change;
    if (product.qty <= 0) {
      cart = cart.filter(item => item.id !== id);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

/* --------------------
   Remove Item
-------------------- */
function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

/* --------------------
   Checkout Logic
-------------------- */
document.querySelector(".checkout-btn").addEventListener("click", () => {
  const addressInput = document.getElementById("addressInput");
  const address = addressInput ? addressInput.value.trim() : "";

  if (!address) {
    alert("Please enter your delivery address before checking out.");
    return;
  }

  localStorage.setItem("deliveryAddress", address); // Save address
  localStorage.removeItem("cart"); // Clear cart
  cart = [];

  // Show thank-you message
  document.body.innerHTML = `
    <div class="thank-you-wrapper">
      <div class="thank-you-message">
        <h2>Thank you for ordering!</h2>
        <p>Your order will be there shortly at:</p>
        <p><strong>${address}</strong></p>
        <button class="back-btn" onclick="window.location.href='products.html'">
          Back to Products
        </button>
      </div>
    </div>
  `;
});

/* --------------------
   Initial Render
-------------------- */
renderCart();
