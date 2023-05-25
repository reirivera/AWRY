// Add event listener after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Add event listener for "Add to Cart" button
    var addToCartBtn = document.getElementById("add-to-cart");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", addToCart);
    }
  
    // Retrieve cart data from local storage
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    updateCartCount(cartItems.length);
  
    // Display cart items on the Checkout page
    if (window.location.pathname.includes("checkout.html")) {
      displayCartItems(cartItems);
    }
  });
  
  function addToCart() {
    var selectedSize = document.getElementById("size").value;
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
    cartItems.push({
      size: selectedSize,
      price: 19.99
    });
  
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  
    updateCartCount(cartItems.length);
  }
  
  function updateCartCount(count) {
    var cartCount = document.getElementById("cart-count");
    if (cartCount) {
      cartCount.textContent = count.toString();
    }
  }
  
  function displayCartItems(cartItems) {
    var cartItemsContainer = document.getElementById("cart-items");
  
    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = "<p>The cart is empty.</p>";
    } else {
      var totalPrice = 0;
  
      cartItems.forEach(function(item) {
        cartItemsContainer.innerHTML += `
          <div class="cart-item">
            <p>Size: ${item.size}</p>
            <p>Price: $${(item.price || 0).toFixed(2)}</p>
          </div>
          <button class="remove-btn">Remove</button>
          <button class="add-btn">Add</button>
        `;
  
        totalPrice += item.price || 0;
      });
  
      cartItemsContainer.innerHTML += `<p>Total Price: $${totalPrice.toFixed(2)}</p>`;
  
      // Add event listeners to remove and add buttons
      var removeButtons = document.getElementsByClassName("remove-btn");
      var addButtons = document.getElementsByClassName("add-btn");
  
      for (let i = 0; i < removeButtons.length; i++) {
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
  