// products.js
const products = [
  {
    id: 1,
    name: "Chocolate",
    price: 250,
    img: "images/coffee-0.png",
    rating: 5, // Public rating
  },
  {
    id: 2,
    name: "Cookies & Cream",
    price: 250,
    img: "images/coffee-2.png",
    rating: 4, // Public rating
  },
  {
    id: 3,
    name: "Matcha",
    price: 250,
    img: "images/coffee-1.png",
    rating: 5, // Public rating
  },
  {
    id: 4,
    name: "Caramel",
    price: 250,
    img: "images/caramel.png",
    rating: 4, // Public rating
  },
  {
    id: 5,
    name: "S'mores",
    price: 250,
    img: "images/smores.png",
    rating: 3, // Public rating
  },
  {
    id: 6,
    name: "Cherry",
    price: 250,
    img: "images/cherry.png",
    rating: 5, // Public rating
  },
  {
    id: 7,
    name: "Biscoff",
    price: 250,
    img: "images/biscoff.png",
    rating: 4, // Public rating
  },
  {
    id: 8,
    name: "Black Coffee",
    price: 250,
    img: "images/black-coffee.png",
    rating: 3, // Public rating
  },
  {
    id: 9,
    name: "Stawberry",
    price: 250,
    img: "images/strawberry.png",
    rating: 4, // Public rating
  },
  {
    id: 10,
    name: "Mango",
    price: 250,
    img: "images/mango.png",
    rating: 4, // Public rating
  },
  {
    id: 11,
    name: "Pumpkin Spice",
    price: 250,
    img: "images/pumpkin-spice.png",
    rating: 5, // Public rating
  },
  {
    id: 12,
    name: "Fat White",
    price: 250,
    img: "images/flat-white.png",
    rating: 3, // Public rating
  },
];

const productList = document.getElementById("productList");
let currentView = "public";
let currentFilter = "all";

// Function to get user ratings from local storage
function getUserRatings() {
    return JSON.parse(localStorage.getItem("userRatings")) || {};
}

// Function to filter products based on rating
function filterByRating(items, minRating) {
    if (minRating === "all") {
        return items;
    }
    const ratingValue = parseInt(minRating);
    const userRatings = getUserRatings();

    return items.filter(p => {
        const ratingToUse = currentView === "public" ? p.rating : (userRatings[p.id] || 0);
        return ratingToUse === ratingValue;
    });
}

// Display products
function displayProducts(items) {
    productList.innerHTML = "";
    
    // First, filter the items based on the search query
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filteredBySearch = items.filter(p => p.name.toLowerCase().includes(searchInput));

    // Then, filter the search results based on the star rating
    const finalFilteredItems = filterByRating(filteredBySearch, currentFilter);

    if (finalFilteredItems.length === 0) {
        productList.innerHTML = `<p class="no-results">No products found with the selected rating.</p>`;
        return;
    }

    finalFilteredItems.forEach((p) => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₱${p.price}.00</p>
        <div class="rating-section" data-product-id="${p.id}">
            <span class="rating-label">Your Rating:</span>
            <span class="rating-star" data-value="1">☆</span>
            <span class="rating-star" data-value="2">☆</span>
            <span class="rating-star" data-value="3">☆</span>
            <span class="rating-star" data-value="4">☆</span>
            <span class="rating-star" data-value="5">☆</span>
        </div>
        <button onclick="addToCart(${p.id})">🛒 Add to Cart</button>
        `;
        productList.appendChild(card);

        const ratingToDisplay = currentView === "public" ? p.rating : (getUserRatings()[p.id] || 0);
        updateStarDisplay(p.id, ratingToDisplay);
    });

    // Attach event listeners for rating
    document.querySelectorAll(".rating-star").forEach((star) => {
        star.addEventListener("click", function () {
            const productId = this.parentElement.getAttribute("data-product-id");
            const rating = this.getAttribute("data-value");
            setRating(productId, rating);
        });
    });
}

// Function to update the visual display of the stars
function updateStarDisplay(productId, ratingValue) {
    const ratingSection = document.querySelector(`.rating-section[data-product-id="${productId}"]`);
    if (!ratingSection) return;

    const stars = ratingSection.querySelectorAll(".rating-star");

    ratingSection.querySelector(".rating-label").textContent = currentView === "public" ? "Public Rating:" : "Your Rating:";

    stars.forEach((star) => {
        if (parseInt(star.getAttribute("data-value")) <= ratingValue) {
            star.classList.add("rated");
            star.textContent = "★"; // Full star
        } else {
            star.classList.remove("rated");
            star.textContent = "☆"; // Empty star
        }
    });
}

// Function to handle and set the user's rating
function setRating(productId, ratingValue) {
    if (currentView !== "your") {
        alert("Please switch to 'Your Rating' view to rate a product.");
        return;
    }
    const userRatings = getUserRatings();
    userRatings[productId] = parseInt(ratingValue);
    localStorage.setItem("userRatings", JSON.stringify(userRatings));

    updateStarDisplay(productId, userRatings[productId]);

    console.log(
        `Product with ID ${productId} rated ${userRatings[productId]} out of 5.`
    );
}

// Function to toggle between public and user rating views
function toggleRatingView(view) {
    currentView = view;
    document.getElementById("publicRatingBtn").classList.remove("active");
    document.getElementById("yourRatingBtn").classList.remove("active");
    document.getElementById(`${view}RatingBtn`).classList.add("active");
    displayProducts(products);
}

// Function to set the rating filter
function setRatingFilter(filter) {
    currentFilter = filter;
    document.querySelectorAll(".rating-filter-menu a").forEach(link => link.classList.remove("active"));
    document.querySelector(`.rating-filter-menu a[data-rating-filter="${filter}"]`).classList.add("active");
    displayProducts(products);
}

// Search
document.getElementById("searchInput").addEventListener("input", function () {
    displayProducts(products);
});

// Cart
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find((p) => p.id === id);
    const existing = cart.find((item) => item.id === id);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
}

// Initial render and event listeners
document.addEventListener("DOMContentLoaded", () => {
    displayProducts(products);

    document.getElementById("publicRatingBtn").addEventListener("click", () => {
        toggleRatingView("public");
    });

    document.getElementById("yourRatingBtn").addEventListener("click", () => {
        toggleRatingView("your");
    });

    // New event listeners for the hamburger menu
    document.querySelector(".rating-filter-toggle").addEventListener("click", function() {
        document.getElementById("filter-menu").classList.toggle("show");
    });
    
    document.querySelectorAll(".rating-filter-menu a").forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault(); // Prevent default link behavior
            setRatingFilter(this.dataset.ratingFilter);
        });
    });

    // Close the dropdown if the user clicks outside of it
    window.addEventListener("click", function(event) {
        if (!event.target.matches('.rating-filter-toggle')) {
            const dropdown = document.getElementById("filter-menu");
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        }
    });

});

