// product.js
const products = [
  {
    id: 1,
    name: "Chocolate",
    price: 250,
    img: "images/coffee-0.png"
  },
  {
    id: 2,
    name: "Cookies & Cream",
    price: 250,
    img: "images/coffee-2.png"
  },
  {
    id: 3,
    name: "Matcha",
    price: 250,
    img: "images/coffee-1.png"
  },
  {
      id: 4,
    name: "Caramel",
    price: 250,
    img: "images/caramel.png"
  },
  {
    id: 5,
    name: "S'mores",
    price: 250,
    img: "images/smores.png"
  },
  {
    id: 6,
    name: "Cherry",
    price: 250,
    img: "images/cherry.png"
  },
  {
    id: 7,
    name: "Biscoff",
    price: 250,
    img: "images/biscoff.png"
  },
  {
    id: 8,
    name: "Black Coffee",
    price: 250,
    img: "images/black-coffee.png"
  },
  {
    id: 9,
    name: "Stawberry",
    price: 250,
    img: "images/strawberry.png"
  },

];

const productList = document.getElementById("productList");

// Display products
function displayProducts(items) {
  productList.innerHTML = "";
  items.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₱${p.price}.00</p>
      <button onclick="addToCart(${p.id})">🛒 Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

// Search
document.getElementById("searchInput").addEventListener("input", function() {
  const query = this.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  displayProducts(filtered);
});

// Cart
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

// Initial render
displayProducts(products);
