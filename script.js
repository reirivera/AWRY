// Add event listener after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Add event listener for "Add to Cart" button
    var addToCartBtns = document.getElementsByClassName("add-to-cart");
    for (var i = 0; i < addToCartBtns.length; i++) {
      addToCartBtns[i].addEventListener("click", addToCart);
    }
  
    // Retrieve cart data from local storage
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    updateCartCount(cartItems.length);
  
    // Display cart items on the Checkout page
    if (window.location.pathname.includes("checkout.html")) {
      displayCartItems(cartItems);
    }
  
    // Add event listeners to size buttons
    var sizeButtons = document.getElementsByClassName("size-btn");
    for (var i = 0; i < sizeButtons.length; i++) {
      sizeButtons[i].addEventListener("click", function(event) {
        selectSize(event.target.textContent);
      });
    }
  });
  
  function selectSize(size) {
    var sizeButtons = document.getElementsByClassName("size-btn");
    for (var i = 0; i < sizeButtons.length; i++) {
      if (sizeButtons[i].textContent === size) {
        sizeButtons[i].classList.add("selected");
      } else {
        sizeButtons[i].classList.remove("selected");
      }
    }
  }
  
  function addToCart() {
    var selectedSize = "";
    var sizeButtons = document.getElementsByClassName("size-btn");
    for (var i = 0; i < sizeButtons.length; i++) {
      if (sizeButtons[i].classList.contains("selected")) {
        selectedSize = sizeButtons[i].textContent;
        break;
      }
    }
  
    if (selectedSize !== "") {
      var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
      cartItems.push({
        size: selectedSize,
        price: 19.99,
        item: "Madonna Tee"
      });
  
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
  
      updateCartCount(cartItems.length);
      if (window.location.pathname.includes("checkout.html")) {
        displayCartItems(cartItems);
      }
    }
  }
  
  function updateCartCount(count) {
    var cartCount = document.getElementById("cart-count");
    cartCount.textContent = count.toString();
  }
  
  function displayCartItems(cartItems) {
    var cartItemsContainer = document.getElementById("cart-items");
  
    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = "<p>The cart is empty.</p>";
    } else {
      var totalPrice = 0;
  
      cartItemsContainer.innerHTML = ""; // Clear the container before updating
  
      cartItems.forEach(function(item, index) {
        cartItemsContainer.innerHTML += `
          <div class="cart-item">
            <p>Size: ${item.size}</p>
            <p>Price: $${(item.price || 0).toFixed(2)}</p>
          </div>
          <button class="remove-btn" onclick="removeCartItem(${index})">Remove</button>
          <button class="add-btn" onclick="addCartItem(${index})">Add</button>
        `;
  
        totalPrice += item.price || 0;
      });
  
      cartItemsContainer.innerHTML += `<p>Total Price: $${totalPrice.toFixed(2)}</p>`;
  
      // Add event listeners to remove and add buttons
      var removeButtons = document.getElementsByClassName("remove-btn");
      var addButtons = document.getElementsByClassName("add-btn");
  
      for (var i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener("click", function() {
          removeCartItem(i);
        });
        addButtons[i].addEventListener("click", function() {
          addCartItem(i);
        });
      }
    }
  }
  
  function removeCartItem(index) {
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
    if (index >= 0 && index < cartItems.length) {
      cartItems.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
  
      var cartItemsContainer = document.getElementById("cart-items");
      cartItemsContainer.innerHTML = "";
  
      displayCartItems(cartItems);
  
      updateCartCount(cartItems.length);
    }
  }
  
  function addCartItem(index) {
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
    if (index >= 0 && index < cartItems.length) {
      cartItems[index].price += 19.99;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
  
      var cartItemsContainer = document.getElementById("cart-items");
      cartItemsContainer.innerHTML = "";
  
      displayCartItems(cartItems);
    }
  }
  