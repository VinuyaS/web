let isLoggedIn = false; // Set to true if the user is logged in

/*
function login() {
    isLoggedIn = true;
    alert("You are now logged in.");
}

function showAlert(message) {
    login(); // Simulating login action
    alert(message);
}
*/
function addToCart() {
    // Check if the user is logged in
    if (!isLoggedIn) {
        alert("Please Sign up or Log In to book a service.");
        return;
    }

    const selectedServices = document.querySelectorAll('input[type="checkbox"]:checked');
    const date = document.getElementById('date').value;

    if (selectedServices.length === 0 || !date) {
        alert("Please select at least one service and a date.");
        return;
    }

    const cartList = document.getElementById('cart-items');

    selectedServices.forEach(service => {
        const listItem = document.createElement('li');
        listItem.textContent = `${service.value} - Date: ${new Date(date).toDateString()}`;
        cartList.appendChild(listItem);

        service.checked = false;
    });

    document.getElementById('date').value = '';
}

