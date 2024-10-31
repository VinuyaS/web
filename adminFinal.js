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
// Tab functionality 
function openTab(evt, tabName) {
    console.log(`Switching to tab: ${tabName}`); // Log when function is triggered

    // Hide all tab contents
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }

    // Remove active class from all tabs
    const tabLinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    // Show the selected tab content and mark the tab as active
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Set default tab to open on load
window.onload = function() {
    document.getElementById("defaultOpen").click();
};

// Sample data for paid and unpaid bills
const paidBills = [
    { client: "Jane Smith", service: "Window Cleaning", date: "2024-08-15", amount: "$100", status: "Paid" },
    { client: "Sam Doe", service: "Exterior Cleaning", date: "2024-09-10", amount: "$200", status: "Paid" }
];

const unpaidBills = [
    { client: "John Doe", service: "Regular Cleaning", date: "2024-10-15", amount: "$150", status: "Unpaid" },
    { client: "Lisa Brown", service: "Major Cleaning", date: "2024-10-18", amount: "$300", status: "Unpaid" }
];

// Function to calculate days since service date
function calculateDaysOverdue(date) {
    const today = new Date();
    const serviceDate = new Date(date);
    const differenceInTime = today - serviceDate;
    return Math.floor(differenceInTime / (1000 * 3600 * 24));
}

// Function to populate the paid billings table
function populatePaidBillingsTable() {
    const tableBody = document.querySelector("#paidBillingsTable tbody");
    tableBody.innerHTML = ""; // Clear existing content

    paidBills.forEach(bill => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${bill.client}</td>
          <td>${bill.service}</td>
          <td>${bill.date}</td>
          <td>${bill.amount}</td>
          <td class="status-paid">${bill.status}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to populate the unpaid notices table
function populateUnpaidNoticesTable() {
    const tableBody = document.querySelector("#unpaidNoticesTable tbody");
    tableBody.innerHTML = ""; // Clear existing content

    unpaidBills.forEach(bill => {
        const daysOverdue = calculateDaysOverdue(bill.date);
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${bill.client}</td>
          <td>${bill.service}</td>
          <td>${bill.date}</td>
          <td>${bill.amount}</td>
          <td>${daysOverdue} days</td>
          <td>${daysOverdue >= 7 ? '<a href="#" class="action-link">Send Reminder</a>' : 'Not Yet Due'}</td>
        `;
        tableBody.appendChild(row);

        // Automatically send reminder if overdue by a week
        if (daysOverdue >= 7) {
            sendLateNotice(bill.client, bill.amount);
        }
    });
}

// Function to send a late notice (mock function)
function sendLateNotice(client, amount) {
    console.log(`Late notice sent to ${client} for unpaid bill of ${amount}.`);
}

// Hard-coded sample data for updating client status
const updateStatusData = [
    { client: "John Doe", service: "Regular Cleaning", currentStatus: "Unpaid"},
    { client: "Jane Smith", service: "Window Cleaning", currentStatus: "Paid"},
    { client: "Lisa Brown", service: "Major Cleaning", currentStatus: "Unpaid" }
];

// Function to populate the update status table
function populateUpdateStatusTable() {
    const tableBody = document.querySelector("#updateStatusTable tbody");
    tableBody.innerHTML = ""; // Clear any existing content

    updateStatusData.forEach((record, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${record.client}</td>
          <td>${record.service}</td>
          <td class="${record.currentStatus === 'Paid' ? 'status-paid' : 'status-unpaid'}">${record.currentStatus}</td>
          <td>
            <button onclick="updateStatus(${index}, 'Paid')" class="button-paid">Paid</button>
            <button onclick="updateStatus(${index}, 'Unpaid')" class="button-unpaid">Unpaid</button>
            <span id="updateMsg${index}">
            </span>
            </td>
    `;
        tableBody.appendChild(row);
    });
}

// Function to update status
function updateStatus(index, newStatus) {
    updateStatusData[index].currentStatus = newStatus;
    document.getElementById(`updateMsg${index}`).textContent = `Status updated to ${newStatus}`;
    populateUpdateStatusTable(); // Refresh the table to reflect the new status
}

// Populate tables on page load
populatePaidBillingsTable();
populateUnpaidNoticesTable();
populateUpdateStatusTable();

// Sample hardcoded services
const hardcodedServices = [
  { name: "Regular Cleaning", price: "150$" },
  { name: "Major Cleaning", price: "200$" },
  { name: "Exterior Cleaning", price: "100$" }
];

// Function to populate the services table
function populateServiceTable() {
  const servicesTableBody = document.querySelector("#servicesTable tbody");
  servicesTableBody.innerHTML = ""; // Clear any existing content

  hardcodedServices.forEach((service, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${service.name}</td>
          <td>${service.price}</td>
          <td><button onclick="modifyService(${index})">Modify</button></td>
          <td><button onclick="deleteService(${index})" class="delete-button">Delete</button></td>
      `;
      servicesTableBody.appendChild(row);
  });
}

// Modify service functionality (optional)
function modifyService(index) {
  alert(`Modify feature coming soon for: ${hardcodedServices[index].name}`);
}

// Delete service functionality
function deleteService(index) {
  hardcodedServices.splice(index, 1); // Remove the selected service from the array
  populateServiceTable(); // Refresh table to reflect the changes
}

// Call the function to populate the table on page load
populateServiceTable();

