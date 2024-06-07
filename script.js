/* Yakecan */


function login() {
    var loginUsername = document.getElementById("loginUsername").value;
    var loginPassword = document.getElementById("loginPassword").value;
    var found = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].username === loginUsername && users[i].password === loginPassword) {  
            found = true;  
            
            window.location.href = 'shop.html';  
            break;  
        }  
    }  
    if (!found) {  
        alert("Invalid username or password. Please try again.");  
    }  
}

document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const products = document.querySelectorAll('.product');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout');
    const clearCartButton = document.getElementById('clear-cart');

    products.forEach(product => {
        const increaseButton = product.querySelector('.increase-quantity');
        const decreaseButton = product.querySelector('.decrease-quantity');
        const quantityElement = product.querySelector('.quantity');

        increaseButton.addEventListener('click', () => {
            const id = product.getAttribute('data-id');
            const name = product.getAttribute('data-name');
            const price = parseFloat(product.getAttribute('data-price'));

            addToCart(id, name, price);
            quantityElement.textContent = getQuantity(id);
        });

        decreaseButton.addEventListener('click', () => {
            const id = product.getAttribute('data-id');

            updateCartItem(id, getQuantity(id) - 1);
            quantityElement.textContent = getQuantity(id);
        });
    });

    checkoutButton.addEventListener('click', () => {
        alert(`Total price: $${totalPriceElement.textContent}`);
    });

    clearCartButton.addEventListener('click', () => {
        cart.length = 0;
        renderCart();
        products.forEach(product => {
            const quantityElement = product.querySelector('.quantity');
            quantityElement.textContent = 0;
        });
    });

    function addToCart(id, name, price) {
        const existingProduct = cart.find(item => item.id === id);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        renderCart();
    }

    function updateCartItem(id, quantity) {
        const product = cart.find(item => item.id === id);
        if (product) {
            product.quantity = quantity;
            if (product.quantity <= 0) {
                removeFromCart(id);
            }
        }
        renderCart();
    }

    function removeFromCart(id) {
        const index = cart.findIndex(item => item.id === id);
        if (index !== -1) {
            cart.splice(index, 1);
        }
        renderCart();
    }

    function getQuantity(id) {
        const product = cart.find(item => item.id === id);
        return product ? product.quantity : 0;
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name} - $${item.price} x ${item.quantity}</span>
                <div>
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                    <button class="remove-item" data-id="${item.id}">delete</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);

            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);

        cartItemsContainer.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.target.getAttribute('data-id');
                const product = cart.find(item => item.id === id);
                if (product) {
                    updateCartItem(id, product.quantity + 1);
                }
            });
        });

        cartItemsContainer.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.target.getAttribute('data-id');
                const product = cart.find(item => item.id === id);
                if (product) {
                    updateCartItem(id, product.quantity - 1);
                }
            });
        });

        cartItemsContainer.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.target.getAttribute('data-id');
                removeFromCart(id);
            });
        });
    }
});

window.onclick = function(event) {   
    if (!event.target.matches('.dropbtn') && !event.target.matches('.dropdown-content a')) {    

        var dropdowns = document.getElementsByClassName("dropdown-content");    
        var i;    
        for (i = 0; i < dropdowns.length; i++) {    
            var openDropdown = dropdowns[i];    
            if (openDropdown.classList.contains('show')) {    
                openDropdown.classList.remove('show');    
            }    
        }    
    }    
  } 
  document.getElementById('username').textContent = localStorage.getItem('username');

let cart = {  
    items: {},  
    totalItems: 0,  
    totalPrice: 0  
  };  
    
  function addToCart(itemId, itemName, price) {  
    if (!cart.items[itemId]) {  
      cart.items[itemId] = {  
        name: itemName,  
        price: price,  
        quantity: 1  
      };  
    } else {  
      cart.items[itemId].quantity++;  
    }  
    updateCart();  
  }  
    
  function removeFromCart(itemId) {  
     
      delete cart.items[itemId];  
     
    updateCart();  
  }  
    
  function updateQuantity(itemId, quantity) {  
    if (cart.items[itemId]) {  
      cart.items[itemId].quantity = quantity;  
      updateCart();  
    }  
  }  
    
  function updateCart() {  
    let cartHtml = '';  
    cart.totalItems = 0;  
    cart.totalPrice = 0;  
    for (let itemId in cart.items) {  
      let item = cart.items[itemId];
      let itemTotalPrice = item.price * item.quantity;  
      cartHtml += `<div class="cart-item">  
        <span>${item.name}</span>  
        <div class="cart-item-quantity-wrapper">  
          <button onclick="updateQuantity('${itemId}', ${item.quantity - 1})" class="cart-item-quantity-button">-</button>  
          <input type="number" class="cart-item-quantity-input" value="${item.quantity}" min="1" onchange="updateQuantity('${itemId}', this.value)">  
          <button onclick="updateQuantity('${itemId}', ${item.quantity + 1})" class="cart-item-quantity-button">+</button>  
        </div>
        <span class="cart-item-price">Price:A$${item.price}</span>   
        <span class="cart-item-price">Total:A$${itemTotalPrice}</span>  
        <button onclick="removeFromCart('${itemId}')">remove</button>  
      </div>`;  
      cart.totalItems += item.quantity;    
      cart.totalPrice += itemTotalPrice; 
    }  
    document.getElementById('cart-items').innerHTML = cartHtml;  
    document.getElementById('cart-total-items').textContent = cart.totalItems;  
    document.getElementById('cart-total-price').textContent = 'A$' + cart.totalPrice.toFixed(2);  
  }  
    
  // Initialize shopping cart display (if there are products passed through URL parameters)  
  window.onload = function() {  
    updateCart();  
  }; 
  function clearCart() {  
    cart.items = {}; // Clear items from shopping cart  
    cart.totalItems = 0; // Reset total product quantity  
    cart.totalPrice = 0; // Reset total price  
    updateCart(); // Update shopping cart display
  }
  function checkout() {  
    alert(
      'You bought ' + cart.totalItems +' products'+"\n"+
      'Your total price is A$ ' + cart.totalPrice
    );
    clearCart()  
};
// Simple storage of user information
function registerUser() {  
  var username = document.getElementById('username').value;  
  var password = document.getElementById('password').value;  
  var email = document.getElementById('email').value;
  var Gender = document.getElementById('Gender').value;
  var Grade = document.getElementById('Grade').value;
  var Country = document.getElementById('Country').value;  

  //Here, we simply store user information in localStorage  
  localStorage.setItem('username', username);  
  localStorage.setItem('password', password);  
  localStorage.setItem('email', email);
  localStorage.setItem('Gender', Gender);
  localStorage.setItem('Grade', Grade);
  localStorage.setItem('Countryl', Country);  

  //Jump to login page  
  window.location.href = 'login.html';  
}

function setLoginStatus(isLoggedIn) {  
  // Using LocalStorage to Store Login Status  
  localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');  
}

// validate logon Form Validation 
function loginUser() {  
  var username = document.getElementById('username').value;  
  var password = document.getElementById('password').value; 

  //Check if there is a corresponding username and password in localStorage  
  if (localStorage.getItem('username') === username && localStorage.getItem('password') === password)  {  
      // Login successful, redirect to shopping page
      setLoginStatus(true); 
      window.location.href = 'courseware2.html';  
  } else {  
      alert('Login failed. Please register.');  
      window.location.href = 'register.html';  
  }  
}

 
function toggleDropdown() {  
  document.getElementById("myDropdown").classList.toggle("show");  
} 

function checkLoginStatus() {  
  var isLoggedIn = localStorage.getItem('isLoggedIn');  

  if (isLoggedIn && isLoggedIn === 'true') {    
      console.log('User is logged in.');   
  } else {  
      console.log('User is not logged in. Redirecting to login page.');
      alert('You haven t logged in yet, please check after logging in');  
      window.location.href = 'login.html';   
  }  
}  
 
function setSessionTimeout(minutes) {  
  
  var sessionEndTime = new Date().getTime() + minutes * 60 * 1000;  
    
   
  setInterval(function() {  
    var now = new Date().getTime();  
    if (now >= sessionEndTime) {  
      
      localStorage.setItem('isLoggedIn', 'false');  
      alert('Session timed out. Please log in again.');  
       
      window.location.href = 'login.html';  
    }  
  }, 1000 * 60); 
}   