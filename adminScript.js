// Tab functionality with console logging for debugging
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
    { client: "John Doe", service: "Regular Cleaning", currentStatus: "Unpaid" },
    { client: "Jane Smith", service: "Window Cleaning", currentStatus: "Paid" },
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
          </td>
      <td>
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
