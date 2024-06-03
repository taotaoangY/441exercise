/* Yakecan */
// An empty array to store user information  
var users = [];  
  
// Function to show a specific page by its ID  
function showPage(pageId) {  
    // Get all elements with the class 'page'  
    var pages = document.querySelectorAll('.page');  
  
    // Hide all pages  
    for (var i = 0; i < pages.length; i++) {  
        pages[i].style.display = 'none';  
    }  
  
    // Show the page with the specified ID  
    document.getElementById(pageId).style.display = 'block';  
}  
  
// Function to create a new user  
function createUser() {  
    // Get the username and password from the input fields  
    var username = document.getElementById("username").value;  
    var password = document.getElementById("password").value;  
  
    // Add the user to the users array  
    users.push({ username: username, password: password });  
  
    // Display a success message  
    alert("User created successfully!");  
  
    // Show the login page  
    showPage('loginPage');  
}  
  
// Function to handle user login  
function login() {  
    // Get the username and password from the login input fields  
    var loginUsername = document.getElementById("loginUsername").value;  
    var loginPassword = document.getElementById("loginPassword").value;  
  
    var found = false;  
  
    // Check if the username and password match any existing user  
    for (var i = 0; i < users.length; i++) {  
        if (users[i].username === loginUsername && users[i].password === loginPassword) {    
            // If a match is found  
            found = true;  
  
            // Redirect to the shop page  
            window.location.href = 'shop.html';  
  
            // Break out of the loop  
            break;  
        }  
    }  
  
    // If no match is found  
    if (!found) {    
        // Display an error message  
        alert("Invalid username or password. Please try again.");  
    }  
}

document.addEventListener('DOMContentLoaded', () => {  
    // Initialize an empty array to store cart items  
    const cart = [];  
  
    // Get all the product elements from the DOM  
    const products = document.querySelectorAll('.product');  
  
    // Get the container where cart items will be displayed  
    const cartItemsContainer = document.getElementById('cart-items');  
  
    // Get the element that displays the total price  
    const totalPriceElement = document.getElementById('total-price');  
  
    // Get the checkout button  
    const checkoutButton = document.getElementById('checkout');  
  
    // Get the clear cart button  
    const clearCartButton = document.getElementById('clear-cart');  
  
    // Loop through all the product elements  
    products.forEach(product => {  
        // Get the increase quantity button for each product  
        const increaseButton = product.querySelector('.increase-quantity');  
  
        // Get the decrease quantity button for each product  
        const decreaseButton = product.querySelector('.decrease-quantity');  
  
        // Get the quantity display element for each product  
        const quantityElement = product.querySelector('.quantity');  
  
        // Add a click event listener to the increase button  
        increaseButton.addEventListener('click', () => {  
            // Get the id, name, and price of the product  
            const id = product.getAttribute('data-id');  
            const name = product.getAttribute('data-name');  
            const price = parseFloat(product.getAttribute('data-price'));  
  
            // Add the product to the cart  
            addToCart(id, name, price);  
  
            // Update the quantity display for the product  
            quantityElement.textContent = getQuantity(id);  
        });  
  
        // Add a click event listener to the decrease button  
        decreaseButton.addEventListener('click', () => {  
            // Get the id of the product  
            const id = product.getAttribute('data-id');  
  
            // Update the quantity of the product in the cart  
            updateCartItem(id, getQuantity(id) - 1);  
  
            // Update the quantity display for the product  
            quantityElement.textContent = getQuantity(id);  
        });  
    });  
  
    // Add a click event listener to the checkout button  
    checkoutButton.addEventListener('click', () => {  
        // Display an alert with the total price  
        alert(`Total price: 
$$
{totalPriceElement.textContent}`);  
    });  
  
    // Add a click event listener to the clear cart button  
    clearCartButton.addEventListener('click', () => {  
        // Clear the cart  
        cart.length = 0;  
  
        // Render the cart (assuming there's a renderCart function to update the cart display)  
        renderCart();  
  
        // Reset the quantity display for all products to 0  
        products.forEach(product => {  
            const quantityElement = product.querySelector('.quantity');  
            quantityElement.textContent = 0;  
        });  
    });  
  
    // Note: The addToCart, getQuantity, updateCartItem, and renderCart functions are not included in the given code snippet  
    // You would need to define these functions to make the code work as expected  
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