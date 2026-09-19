const products = [
  // SHOES 001-020
  { id: 1, type: "shoes", price: 2199 },
  { id: 2, type: "shoes", price: 2299 },
  { id: 3, type: "shoes", price: 2599 },
  { id: 4, type: "shoes", price: 1999 },
  { id: 5, type: "shoes", price: 2199 },
  { id: 6, type: "shoes", price: 2299 },
  { id: 7, type: "shoes", price: 2599 },
  { id: 8, type: "shoes", price: 1999 },
  { id: 9, type: "shoes", price: 2199 },
  { id: 10, type: "shoes", price: 2299 },
  { id: 11, type: "shoes", price: 2599 },
  { id: 12, type: "shoes", price: 1999 },
  { id: 13, type: "shoes", price: 2199 },
  { id: 14, type: "shoes", price: 2299 },
  { id: 15, type: "shoes", price: 2599 },
  { id: 16, type: "shoes", price: 1999 },
  { id: 17, type: "shoes", price: 2199 },
  { id: 18, type: "shoes", price: 2299 },
  { id: 19, type: "shoes", price: 2599 },
  { id: 20, type: "shoes", price: 1999 },

  // FASHION 021-040
  { id: 21, type: "fashion", price: 1499 },
  { id: 22, type: "fashion", price: 1299 },
  { id: 23, type: "fashion", price: 1399 },
  { id: 24, type: "fashion", price: 1699 },
  { id: 25, type: "fashion", price: 1999 },
  { id: 26, type: "fashion", price: 1899 },
  { id: 27, type: "fashion", price: 1499 },
  { id: 28, type: "fashion", price: 1299 },
  { id: 29, type: "fashion", price: 1399 },
  { id: 30, type: "fashion", price: 1699 },
  { id: 31, type: "fashion", price: 1999 },
  { id: 32, type: "fashion", price: 1899 },
  { id: 33, type: "fashion", price: 1499 },
  { id: 34, type: "fashion", price: 1299 },
  { id: 35, type: "fashion", price: 1399 },
  { id: 36, type: "fashion", price: 1699 },
  { id: 37, type: "fashion", price: 1999 },
  { id: 38, type: "fashion", price: 1899 },
  { id: 39, type: "fashion", price: 1499 },
  { id: 40, type: "fashion", price: 1299 }
];

const grid = document.getElementById("productGrid");

function formatPrice(price) {
  return "₹" + price.toLocaleString("en-IN");
}

function getOldPrice(price) {
  return Math.round(price / 0.75);
}

function imageName(id) {
  return String(id).padStart(3, "0") + ".jpg";
}

function showProducts(filter = "all") {

  if (!grid) {
    console.error("productGrid not found");
    return;
  }

  grid.innerHTML = "";

  let list = products;

  if (filter === "shoes") {
    list = products.filter(p => p.type === "shoes");
  }

  if (filter === "fashion") {
    list = products.filter(p => p.type === "fashion");
  }

  if (filter === "offers") {
    list = products;
  }

  list.forEach(product => {

    const number = String(product.id).padStart(3, "0");

    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image">
        <img
          src="${imageName(product.id)}"
          alt="Premium ${product.type} ${number}"
          onerror="this.style.display='none'; this.parentElement.classList.add('image-error');"
        >
      </div>

      <div class="product-info">

        <span class="product-code">
          CODE ${number}
        </span>

        <h3>
          Premium ${product.type === "shoes" ? "Shoes" : "Fashion"}
        </h3>

        <div class="price">

          <del>${formatPrice(getOldPrice(product.price))}</del>

          <strong>${formatPrice(product.price)}</strong>

          <span class="discount">
            25% OFF
          </span>

        </div>

        ${
          product.type === "shoes"
            ? `
              <div class="sizes">
                <span>Size:</span>
                <button type="button">6</button>
                <button type="button">7</button>
                <button type="button">8</button>
                <button type="button">9</button>
                <button type="button">10</button>
              </div>
            `
            : ""
        }

        <button
          type="button"
          class="buy-btn"
          onclick="orderProduct(${product.id})">
          BUY NOW
        </button>

      </div>
    `;

    grid.appendChild(card);
  });
}

function orderProduct(id) {

  const product = products.find(p => p.id === id);

  if (!product) return;

  const code = String(id).padStart(3, "0");

  alert(
    "Product Code: " + code +
    "\nPrice: " + formatPrice(product.price) +
    "\n\nOrder system next step me connect karenge."
  );
}

document.addEventListener("DOMContentLoaded", function () {

  showProducts("all");

  const buttons = document.querySelectorAll(".nav-btn");

  buttons.forEach(button => {

    button.addEventListener("click", function () {

      buttons.forEach(btn => {
        btn.classList.remove("active");
      });

      this.classList.add("active");

      const filter = this.dataset.filter || "all";

      showProducts(filter);

    });

  });

});
