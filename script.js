// Function to set the username in a cookie

function setUsername() {

    const usernameInput = document.getElementById('usernameInput').value.trim();

    if (usernameInput !== '') {

        setCookie('username', usernameInput, 7); // Set cookie with name "username" lasting 7 days

        alert(`Username "${usernameInput}" has been set in the cookie.`);

    } else {

        alert('Please enter a valid username.');

    }

}

 

// Function to retrieve and display the username from the cookie

function getUsername() {

    const username = getCookie('username');

    if (username !== '') {

        document.getElementById('usernameDisplay').textContent = `Current Username: ${username}`;

    } else {

        alert('Username cookie not found.');

    }

}

 

// Function to delete the username cookie

function deleteUsername() {

    deleteCookie('username');

    document.getElementById('usernameDisplay').textContent = 'Username deleted.';

    alert('Username cookie has been deleted.');

}

function setCookie(cookieName, cookieValue, expirationDays) {

    const d = new Date();

    d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));

    const expires = "expires=" + d.toUTCString();

    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";

}

function getCookie(cookieName) {

    const name = cookieName + "=";

    const decodedCookie = decodeURIComponent(document.cookie);

    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {

        let cookie = cookieArray[i];

        while (cookie.charAt(0) === ' ') {

            cookie = cookie.substring(1);

        }

        if (cookie.indexOf(name) === 0) {

            return cookie.substring(name.length, cookie.length);

        }

    }

    return "";

}




function deleteCookie(cookieName) {

    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

}