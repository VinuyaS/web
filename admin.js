let serviceCounter = 0; 
//Hardcode done here: pre-chosen password and username to have access to the admin dashboard
const validCredentials = { username: 'admin', password: 'admin123' }; 

// Admin login function
function adminLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  //If the user enters the right pre-chosen password
  //Compare the entered username and password to the values in "validCredentials"
  if (username === validCredentials.username && password === validCredentials.password) {
    //when credentials match, loginSection is hidden and the adminPanel is displayed
    document.getElementById('loginSection').classList.add('hidden');
    document.getElementById('adminPanel').classList.remove('hidden');
    //Saves the login status so that when the user refresh the page, the user remains logged in. 
    localStorage.setItem('adminLoggedIn', 'true');
  } else {
    //When credentials are incorrect, it displays an error message found in the html file
    document.getElementById('loginError').classList.remove('hidden');
  }
}

// Admin logout function
function adminLogout() {
  //Function that will logout the website by hiding the adminPanel and showing the loginSection
  document.getElementById('adminPanel').classList.add('hidden');
  document.getElementById('loginSection').classList.remove('hidden');
  /*It removes the adminLoggedIn item from localStorage, which means that when the page is 
  refreshed, the code will not recognize the user as "logged in"*/
  localStorage.removeItem('adminLoggedIn');
}

// Check if already logged in by verifying that the adminLoggedIn key in localStorage is set to "true"
//If yes that means that the user already logged in and therefore the loginsection stays hidden and the adminPanel should be displaying
if (localStorage.getItem('adminLoggedIn') === 'true') {
  document.getElementById('loginSection').classList.add('hidden');
  document.getElementById('adminPanel').classList.remove('hidden');
}

// Function to update and save business information
function updateBusinessInfo() {
  //Create constants for those HTML elements values: businessName, businessAdress, businessLogo, and businessPhone
  //Those constants will be stored on a localStorage
  const businessName = document.getElementById('businessName').value;
  const businessAddress = document.getElementById('businessAddress').value;
  const businessLogo = document.getElementById('businessLogo').value;
  const businessPhone = document.getElementById('businessPhone').value;

  // Save business information in localStorage
  localStorage.setItem('businessName', businessName);
  localStorage.setItem('businessAddress', businessAddress);
  localStorage.setItem('businessLogo', businessLogo);
  localStorage.setItem('businessPhone', businessPhone);

  //We get a message that tells us that the information were successfully updated
  alert('Business information updated successfully!');
}

// Add new service and update confirmation table
function addService() {
  //Create a constant called "serviceName" that will get the value from an HTML with the id="newService"
  const serviceName = document.getElementById('newService').value;
  //Create a constant called "servicePrice" that will get the value from an HTML with the id="servicePrice"
  const servicePrice = document.getElementById('servicePrice').value;
  //Reference to the HTML element with id "servicesList" where the list of services will be displayed
  const servicesList = document.getElementById('servicesList');
  //Reference to the HTML element with id "confirmationTableBody", where new rows for services are added in the table 
  const confirmationTableBody = document.getElementById('confirmationTableBody');

  //Check is both fields are filled with a values 
  if (serviceName && servicePrice) {
    //We create a unique identifier using "serviceCounter", which is assumed to be a global variable that increments each time 
    const serviceId = `service-${serviceCounter++}`; // Unique ID for each service

    // Add service to the Manage Services list
    //We create a new list item (li) that will display the service in the Manage Services list
    const li = document.createElement('li');
    //We set the text of the list item to display the service name and price 
    li.textContent = `${serviceName} - $${servicePrice}`;
    li.setAttribute("data-id", serviceId); // Add unique ID to the list item for reference
    //Create a delete button that will allows the user to remove the service that was added
    const deleteBtn = document.createElement('button');
    //Set the delete button's text content to "Delete"
    deleteBtn.textContent = "Delete";
    //We define here the behavior of the delete button
    deleteBtn.onclick = function () {
      //Remove the list item (li) from the "servicesList" when the delete button is clicked
      li.remove();
      //Call a function to remove the service from the confirmation table using the unique serviceId
      removeServiceFromConfirmation(serviceId);
    };
    //Append the delete button as a child of the list item, allowing it to displayed beside the service name and price 
    li.appendChild(deleteBtn);
    //Add the completed list item (with service details and delete button) to the "servicesList" in the document
    servicesList.appendChild(li);

    // Add service as a row in the Confirmation of Services table
    const row = document.createElement('tr');
    row.setAttribute("data-id", serviceId); // Add unique ID to the row for reference
    //Use innerHTML to populate the row with three table cells (columns)
    // The first cell shows the service name
    // The second cell shows the service price
    //The third cell will contains the confirm button 
    row.innerHTML = `
      <td>${serviceName}</td>
      <td>$${servicePrice}</td>
      <td><button onclick="confirmService('${serviceName}', this)">Confirm</button></td>
    `;
    //Add a row to the "confirmationTableBody" element, making it visible in the table
    confirmationTableBody.appendChild(row);
  }
}

// Remove service from the Confirmation of Services table
function removeServiceFromConfirmation(serviceId) {
  const confirmationTableBody = document.getElementById('confirmationTableBody');
  //This line finds the row in the table that has the same data-id as the serviceId, so it can later be removed (or manipulated) as needed
  const rowToRemove = confirmationTableBody.querySelector(`tr[data-id="${serviceId}"]`);
  //If the row is found, remove it from the table
  if (rowToRemove) {
    rowToRemove.remove();
  }
}

// Confirm service execution
function confirmService(serviceName, button) {
  //Show an alert confirming that the specified service is completed
  alert(`Service "${serviceName}" has been confirmed as completed.`);
  button.closest('tr').remove(); // Remove the row from the table after confirmation
}

// Function to show/hide sections based on navigation clicks
function showSection(sectionId) {
  //Take the section ID as input and shows only the section with this ID while hiding others 
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    //Loops through all elements with section class, making the matching one visible and hiding the others 
    if (section.id === sectionId) {
      section.classList.remove('hidden');
    } else {
      section.classList.add('hidden');
    }
  });
}