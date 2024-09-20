// List of items in the cart
const cartItems = [
  {
    id: 1,
    name: "HP ENVY 17M-CH0013DX",
    image: "./images/HP ENVY 17M-CH0013DX.jpg",
    price: 750000,
    quantity: 1,
    liked: false,
  },
  {
    id: 2,
    name: "HP EliteBook 840 G3",
    image: "./images/HP EliteBook 840 G3.png",
    price: 198195,
    quantity: 1,
    liked: false,
  },
  {
    id: 3,
    name: "Lenovo Ideapad 320 (15)",
    image: "./images/Lenovo Ideapad 320 (15).png",
    price: 137500,
    quantity: 1,
    liked: false,
  },
  {
    id: 4,
    name: "Lenovo IdeaPad 720",
    image: "./images/Lenovo IdeaPad 720.png",
    price: 1500000,
    quantity: 1,
    liked: false,
  },
  {
    id: 5,
    name: "ROG STRIX SCAR Edition Gaming Laptop GL503",
    image: "./images/ROG STRIX SCAR Edition Gaming Laptop GL503.png",
    price: 1785361,
    quantity: 1,
    liked: false,
  },
];

// declare variables
const totalPriceText = document.getElementById("total-price");
const cartCountText = document.getElementById("cart-count-text");
const cartList = document.getElementById("cart-items");

// modals
const thankYouModal = document.getElementById("thank-you-modal");
const modalOverlay = document.getElementById("modal-overlay");
const emptyCartModal = document.getElementById("empty-cart-modal");

// function to render the cart items on the page
function renderCartItems() {
  // Clear the cart list
  cartList.innerHTML = "";
  let totalPrice = 0;

  cartItems.forEach((item, index) => {
    totalPrice += item.price * item.quantity;

    // create a list element
    const cartItem = document.createElement("li");
    cartItem.className = "cart-item";

    // fill up the list elements with the items
    cartItem.innerHTML = `
        <div class="item-box">
            <img
              src="${item.image}"
              alt="${item.name}">

            <article class="item-info">
              <span class="item-name">${item.name}</span>
              <span class="item-price">₦${item.price.toLocaleString()}</span>
              <div>
                <span class="heart-btn ${
                  item.liked ? "liked" : ""
                }" onClick="toggleLike(${index})" aria-label="Like item"><i class="fa-solid fa-heart"></i></span>
                <button class="delete-btn" onClick="deleteItem(${index})"  aria-label="Delete item">Delete</button>
              </div>
            </article>
          </div>

           <div class="item-actions">
            <p class="item-price">₦${(
              item.price * item.quantity
            ).toLocaleString()}</p>
            <div>
              <button id="decrease" onClick="decreaseQuantity(${index})" aria-label="Decrease quantity">-</button>
              <span>${item.quantity}</span>
              <button id="increase" onClick="increaseQuantity(${index})" aria-label="Increase quantity">+</button>
            </div>
          </div>
    `;

    // append the cartList items to the ul
    cartList.appendChild(cartItem);
  });

  totalPriceText.innerText = totalPrice.toFixed(2);
  updateCartCount(); // Update cart item count
}

/****  CART FUNCTIONS  *****/
// Function to delete an item from the cart
function deleteItem(index) {
  cartItems.splice(index, 1); // Remove the item from the cartItems array
  renderCartItems(); // Re-render the cart
}

// Function to increase item quantity
function increaseQuantity(index) {
  cartItems[index].quantity += 1;

  renderCartItems();
}

// Function to decrease item quantity
function decreaseQuantity(index) {
  if (cartItems[index].quantity > 1) {
    cartItems[index].quantity -= 1;
    renderCartItems();
  }
}

// Function to toggle like for an item
function toggleLike(index) {
  cartItems[index].liked = !cartItems[index].liked;
  renderCartItems();
}

// Function to update the cart item count in the header
function updateCartCount() {
  const itemCount = cartItems.length;
  cartCountText.innerText = `My Cart Items (${itemCount})`;
}

// Function to proceed to checkout
function proceedToCheckout() {

  // Check if the cart is empty
   if (cartItems.length === 0) {
    //  alert("Your cart is empty!");
    showEmptyCartModal();
     return;
   }

  alert("Proceeding to checkout with " + cartItems.length + " item(s).");

  // Confirm checkout action
  const proceed = confirm(
    "Are you sure you want to proceed to checkout with " +
      cartItems.length +
      " item(s)?"
  );

  if (proceed) {
    // Empty the cartItems array
    cartItems.length = 0;

    // Re-render the cart (which will now be empty)
    renderCartItems();

    // Display a thank you message
    showThankYouMessage();
  }
}

// Function to show the Thank You message
function showThankYouMessage() {
  

  // Show modal and overlay
  thankYouModal.classList.add("active");
  modalOverlay.classList.add("active");
}

// Function to close the Thank You message
function closeThankYouMessage() {

  // Hide modal and overlay
  thankYouModal.classList.remove("active");
  modalOverlay.classList.remove("active");
}

// Function to show the empty cart modal
function showEmptyCartModal() {

  // Show modal and overlay
  emptyCartModal.classList.add("active");
  modalOverlay.classList.add("active");

  // Close modal when clicking the close button or the overlay
  document.querySelector(".close-btn").addEventListener("click", closeEmptyCartModal);
  modalOverlay.addEventListener("click", closeEmptyCartModal);

  // Add event listener for continue shopping button
  document.getElementById("continue-shopping").addEventListener("click", closeEmptyCartModal);
}

// Function to close the empty cart modal
function closeEmptyCartModal() {

  // Hide modal and overlay
  emptyCartModal.classList.remove("active");
  modalOverlay.classList.remove("active");

}

// Initial render of the cart items
renderCartItems();
