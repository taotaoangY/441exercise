document.addEventListener('DOMContentLoaded', (event) => {  
    checkLoginStatus();  
});  

function checkLoginStatus() {  
    // Assuming we check the login status in localStorage here
    var isLoggedIn = localStorage.getItem('isLoggedIn');  

    if (isLoggedIn && isLoggedIn === 'true') {  
        //User logged in, displaying page content or performing other operations   
        console.log('User is logged in.');   
    } else {  
        // User not logged in, redirected to login page or displayed login form 
        console.log('User is not logged in. Redirecting to login page.');
        alert('You haven t logged in yet, please check after logging in');  
        window.location.href = 'login.html';   
    }  
}  