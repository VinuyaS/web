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

    // Retrieve selected date 
    const date = document.getElementById('date').value;

    // Retrieve selected services from dropdowns
    const selectedServices = [
        document.getElementById('residential-services').value,
        document.getElementById('carwash-services').value,
        document.getElementById('petgrooming-services').value
    ].filter(service => service !== ""); // Filter out unselected options

    // Check if at least one service is selected and a date is provided
    if (selectedServices.length === 0 || !date) {
        alert("Please select at least one service and a date.");
        return;
    }

    // Add selected services to the cart
    const cartList = document.getElementById('cart-items');
    selectedServices.forEach(service => {
        const listItem = document.createElement('li');
        listItem.textContent = `${service} - Date: ${new Date(date).toDateString()}`;
        cartList.appendChild(listItem);
    });

    // Clear selections after adding to the cart
    document.getElementById('date').value = '';
    document.getElementById('residential-services').value = '';
    document.getElementById('carwash-services').value = '';
    document.getElementById('petgrooming-services').value = '';
}
