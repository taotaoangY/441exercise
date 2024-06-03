/* Yakecan */
var users = [];

function showPage(pageId) {
    var pages = document.querySelectorAll('.page');
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }
    document.getElementById(pageId).style.display = 'block';
}

function createUser() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    users.push({ username: username, password: password });
    alert("User created successfully!");
    showPage('loginPage');
}

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