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
 

function registerUser() {  
  var username = document.getElementById('username').value;  
  var password = document.getElementById('password').value;  
  var email = document.getElementById('email').value;
  var Gender = document.getElementById('Gender').value;
  var Grade = document.getElementById('Grade').value;
  var Country = document.getElementById('Country').value;  

 
  localStorage.setItem('username', username);  
  localStorage.setItem('password', password);  
  localStorage.setItem('email', email);
  localStorage.setItem('Gender', Gender);
  localStorage.setItem('Grade', Grade);
  localStorage.setItem('Countryl', Country);  

 
  window.location.href = 'login.html';  
}

function setLoginStatus(isLoggedIn) {  
 
  localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');  
}


function loginUser() {  
  var username = document.getElementById('username').value;  
  var password = document.getElementById('password').value; 

  
  if (localStorage.getItem('username') === username && localStorage.getItem('password') === password)  {  
      setLoginStatus(true); 
      window.location.href = 'shop.html';  
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
  }, 10 * 60); 
}   