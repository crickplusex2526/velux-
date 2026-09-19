// ===============================
// VELUX PREMIUM STORE
// ===============================

const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbzrYR52fJ0706-D3Ga7F0qjzs3aumrCPOQqB4emt6chjT3GQoOAkR1YTxhjvOWfFMLlQQ/exec";


// ===============================
// PRODUCTS
// ===============================

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


// ===============================
// BASIC FUNCTIONS
// ===============================

const grid = document.getElementById("productGrid");

function formatPrice(price) {
  return "₹" + Number(price).toLocaleString("en-IN");
}

function getOldPrice(price) {
  return Math.round(price / 0.75);
}

function productCode(id) {
  return String(id).padStart(3, "0");
}

function imageName(id) {
  return productCode(id) + ".jpg";
}


// ===============================
// MIXED HOME ORDER
// 2 FASHION → 2 SHOES
// ===============================

function getMixedProducts() {

  const shoes = products.filter(p => p.type === "shoes");
  const fashion = products.filter(p => p.type === "fashion");

  const mixed = [];

  for (let i = 0; i < 10; i++) {

    mixed.push(fashion[i * 2]);
    mixed.push(fashion[i * 2 + 1]);

    mixed.push(shoes[i * 2]);
    mixed.push(shoes[i * 2 + 1]);

  }

  return mixed;
}


// ===============================
// SHOW PRODUCTS
// ===============================

function showProducts(filter = "all") {

  if (!grid) {
    console.error("productGrid not found");
    return;
  }

  grid.innerHTML = "";

  let list;

  if (filter === "all" || filter === "offers") {
    list = getMixedProducts();
  }

  else if (filter === "shoes") {
    list = products.filter(p => p.type === "shoes");
  }

  else if (filter === "fashion") {
    list = products.filter(p => p.type === "fashion");
  }

  list.forEach(product => {

    const code = productCode(product.id);

    const card = document.createElement("div");

    card.className = "product-card";

    const sizeText =
      product.type === "shoes"
        ? "6 • 7 • 8 • 9 • 10"
        : "S • M • L • XL • XXL";

    card.innerHTML = `

      <div class="product-image">

        <img
          src="${imageName(product.id)}"
          alt="Premium ${product.type} ${code}"
          onerror="
            this.style.display='none';
            this.parentElement.classList.add('image-error');
          "
        >

      </div>


      <div class="product-info">

        <span class="product-code">
          CODE ${code}
        </span>

        <h3>
          Premium ${product.type === "shoes" ? "Shoes" : "Fashion"}
        </h3>

        <div class="price">

          <del>
            ${formatPrice(getOldPrice(product.price))}
          </del>

          <strong>
            ${formatPrice(product.price)}
          </strong>

          <span class="discount">
            25% OFF
          </span>

        </div>


        <div class="available-size">

          <span>Sizes:</span>

          ${sizeText}

        </div>


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


// ===============================
// CHECKOUT MODAL
// ===============================

function createCheckoutModal() {

  if (document.getElementById("checkoutModal")) {
    return;
  }

  const style = document.createElement("style");

  style.textContent = `

    .checkout-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.75);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 15px;
      z-index: 99999;
      overflow-y: auto;
    }

    .checkout-box {
      width: 100%;
      max-width: 520px;
      background: #fff;
      color: #111;
      border-radius: 18px;
      padding: 22px;
      box-sizing: border-box;
      position: relative;
      max-height: 95vh;
      overflow-y: auto;
    }

    .checkout-close {
      position: absolute;
      right: 15px;
      top: 10px;
      border: none;
      background: transparent;
      font-size: 28px;
      cursor: pointer;
    }

    .checkout-box h2 {
      margin-top: 5px;
      margin-bottom: 5px;
    }

    .checkout-product {
      background: #f5f5f5;
      padding: 12px;
      border-radius: 10px;
      margin: 15px 0;
    }

    .checkout-form label {
      display: block;
      font-weight: 600;
      margin-top: 12px;
      margin-bottom: 5px;
    }

    .checkout-form input,
    .checkout-form select,
    .checkout-form textarea {
      width: 100%;
      box-sizing: border-box;
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 15px;
    }

    .checkout-form textarea {
      min-height: 80px;
      resize: vertical;
    }

    .checkout-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .payment-options {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 8px;
    }

    .payment-option {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 12px;
      cursor: pointer;
    }

    .payment-option input {
      width: auto;
      margin-right: 7px;
    }

    .place-order-btn {
      width: 100%;
      margin-top: 18px;
      padding: 14px;
      border: none;
      border-radius: 9px;
      background: #111;
      color: white;
      font-size: 17px;
      font-weight: 700;
      cursor: pointer;
    }

    .place-order-btn:disabled {
      opacity: .6;
      cursor: not-allowed;
    }

    .order-message {
      margin-top: 12px;
      padding: 10px;
      border-radius: 8px;
      display: none;
    }

    @media (max-width: 500px) {

      .checkout-row {
        grid-template-columns: 1fr;
      }

      .payment-options {
        grid-template-columns: 1fr;
      }

    }

  `;

  document.head.appendChild(style);


  const modal = document.createElement("div");

  modal.id = "checkoutModal";

  modal.className = "checkout-overlay";

  modal.style.display = "none";

  modal.innerHTML = `

    <div class="checkout-box">

      <button
        type="button"
        class="checkout-close"
        onclick="closeCheckout()">
        ×
      </button>

      <h2>Complete Your Order</h2>

      <p>VELUX PREMIUM STORE</p>


      <div
        id="checkoutProduct"
        class="checkout-product">
      </div>


      <form
        id="checkoutForm"
        class="checkout-form">

        <input
          type="hidden"
          id="orderProductNumber"
        >

        <input
          type="hidden"
          id="orderAmount"
        >


        <label>
          Full Name
        </label>

        <input
          type="text"
          id="customerName"
          placeholder="Enter your name"
          required
        >


        <label>
          Mobile Number
        </label>

        <input
          type="tel"
          id="customerMobile"
          placeholder="10 digit mobile number"
          maxlength="10"
          required
        >


        <label>
          Full Address
        </label>

        <textarea
          id="customerAddress"
          placeholder="House No, Street, Area"
          required
        ></textarea>


        <div class="checkout-row">

          <div>

            <label>
              City
            </label>

            <input
              type="text"
              id="customerCity"
              placeholder="City"
              required
            >

          </div>


          <div>

            <label>
              State
            </label>

            <input
              type="text"
              id="customerState"
              placeholder="State"
              required
            >

          </div>

        </div>


        <label>
          Pincode
        </label>

        <input
          type="text"
          id="customerPincode"
          placeholder="6 digit pincode"
          maxlength="6"
          required
        >


        <label>
          Size
        </label>

        <select
          id="customerSize"
          required>

          <option value="">
            Select Size
          </option>

        </select>


        <label>
          Quantity
        </label>

        <input
          type="number"
          id="customerQuantity"
          value="1"
          min="1"
          max="10"
          required
        >


        <label>
          Payment Method
        </label>

        <div class="payment-options">

          <label class="payment-option">

            <input
              type="radio"
              name="paymentMethod"
              value="COD"
              checked
            >

            Cash on Delivery

          </label>


          <label class="payment-option">

            <input
              type="radio"
              name="paymentMethod"
              value="Prepaid"
            >

            Prepaid

          </label>

        </div>


        <h3>
          Total:
          <span id="checkoutTotal">
            ₹0
          </span>
        </h3>


        <button
          type="submit"
          class="place-order-btn"
          id="placeOrderBtn">

          PLACE ORDER

        </button>


        <div
          id="orderMessage"
          class="order-message">
        </div>

      </form>

    </div>

  `;

  document.body.appendChild(modal);


  document
    .getElementById("customerQuantity")
    .addEventListener("input", updateCheckoutTotal);

}


// ===============================
// OPEN CHECKOUT
// ===============================

function orderProduct(id) {

  const product = products.find(p => p.id === id);

  if (!product) {
    return;
  }

  createCheckoutModal();

  const modal =
    document.getElementById("checkoutModal");

  const code =
    productCode(product.id);


  document.getElementById(
    "orderProductNumber"
  ).value = code;


  document.getElementById(
    "orderAmount"
  ).value = product.price;


  document.getElementById(
    "checkoutProduct"
  ).innerHTML = `

    <strong>Product Code:</strong> ${code}
    <br>

    <strong>Category:</strong>
    ${product.type === "shoes" ? "Shoes" : "Fashion"}
    <br>

    <strong>Price:</strong>
    ${formatPrice(product.price)}

  `;


  const sizeSelect =
    document.getElementById("customerSize");

  sizeSelect.innerHTML = `
    <option value="">Select Size</option>
  `;


  const sizes =
    product.type === "shoes"
      ? ["6", "7", "8", "9", "10"]
      : ["S", "M", "L", "XL", "XXL"];


  sizes.forEach(size => {

    const option =
      document.createElement("option");

    option.value = size;
    option.textContent = size;

    sizeSelect.appendChild(option);

  });


  document.getElementById(
    "customerQuantity"
  ).value = 1;


  updateCheckoutTotal();


  document.getElementById(
    "checkoutForm"
  ).reset();


  // Reset hidden values after form reset
  document.getElementById(
    "orderProductNumber"
  ).value = code;

  document.getElementById(
    "orderAmount"
  ).value = product.price;


  document.getElementById(
    "checkoutTotal"
  ).textContent =
    formatPrice(product.price);


  document.getElementById(
    "orderMessage"
  ).style.display = "none";


  modal.style.display = "flex";

  document.body.style.overflow = "hidden";

}


// ===============================
// CLOSE CHECKOUT
// ===============================

function closeCheckout() {

  const modal =
    document.getElementById("checkoutModal");

  if (modal) {
    modal.style.display = "none";
  }

  document.body.style.overflow = "";

}


// ===============================
// TOTAL PRICE
// ===============================

function updateCheckoutTotal() {

  const amount =
    Number(
      document.getElementById("orderAmount")?.value || 0
    );

  const quantity =
    Number(
      document.getElementById("customerQuantity")?.value || 1
    );

  const total =
    amount * quantity;

  const totalElement =
    document.getElementById("checkoutTotal");

  if (totalElement) {

    totalElement.textContent =
      formatPrice(total);

  }

}


// ===============================
// SEND ORDER TO GOOGLE SHEET
// ===============================

async function submitOrder(event) {

  event.preventDefault();


  const button =
    document.getElementById("placeOrderBtn");

  const message =
    document.getElementById("orderMessage");


  const name =
    document.getElementById("customerName").value.trim();

  const mobile =
    document.getElementById("customerMobile").value.trim();

  const address =
    document.getElementById("customerAddress").value.trim();

  const city =
    document.getElementById("customerCity").value.trim();

  const state =
    document.getElementById("customerState").value.trim();

  const pincode =
    document.getElementById("customerPincode").value.trim();

  const productNumber =
    document.getElementById("orderProductNumber").value;

  const size =
    document.getElementById("customerSize").value;

  const quantity =
    Number(
      document.getElementById("customerQuantity").value
    );

  const amount =
    Number(
      document.getElementById("orderAmount").value
    );

  const paymentMethod =
    document.querySelector(
      'input[name="paymentMethod"]:checked'
    )?.value || "COD";


  if (!/^[0-9]{10}$/.test(mobile)) {

    alert("Please enter a valid 10 digit mobile number.");

    return;

  }


  if (!/^[0-9]{6}$/.test(pincode)) {

    alert("Please enter a valid 6 digit pincode.");

    return;

  }


  if (!size) {

    alert("Please select a size.");

    return;

  }


  const totalAmount =
    amount * quantity;


  const orderId =
    "VLX" +
    Date.now();


  const orderData = {

    orderId: orderId,

    name: name,

    mobile: mobile,

    address: address,

    city: city,

    state: state,

    pincode: pincode,

    productNumber: productNumber,

    size: size,

    quantity: quantity,

    amount: totalAmount,

    paymentMethod: paymentMethod,

    paymentStatus: "Pending",

    orderStatus: "New"

  };


  button.disabled = true;

  button.textContent = "PLACING ORDER...";


  try {

    await fetch(SHEET_URL, {

      method: "POST",

      mode: "no-cors",

      headers: {
        "Content-Type":
          "text/plain;charset=utf-8"
      },

      body: JSON.stringify(orderData)

    });


    message.style.display = "block";

    message.textContent =
      "Order request sent successfully. Order ID: " +
      orderId;


    message.style.background =
      "#e7f7e7";

    message.style.color =
      "#176b17";


    button.textContent =
      "ORDER SENT";


    document.getElementById(
      "checkoutForm"
    ).reset();


  } catch (error) {

    console.error(error);


    message.style.display = "block";

    message.textContent =
      "Order send nahi hua. Please try again.";


    message.style.background =
      "#ffe5e5";

    message.style.color =
      "#a00000";


    button.disabled = false;

    button.textContent =
      "PLACE ORDER";

  }

}


// ===============================
// NAVIGATION
// ===============================

document.addEventListener(
  "DOMContentLoaded",
  function () {

    showProducts("all");

    createCheckoutModal();


    const buttons =
      document.querySelectorAll(".nav-btn");


    buttons.forEach(button => {

      button.addEventListener(
        "click",
        function () {

          buttons.forEach(btn => {

            btn.classList.remove("active");

          });


          this.classList.add("active");


          const filter =
            this.dataset.filter || "all";


          showProducts(filter);

        }
      );

    });


    const form =
      document.getElementById("checkoutForm");


    if (form) {

      form.addEventListener(
        "submit",
        submitOrder
      );

    }

  }
);
