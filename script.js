// Tab functionality
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Set default tab to open on load
document.getElementById("defaultOpen").click();

// Data for upcoming and paid bills
const upcomingBills = [
    { service: "Regular Cleaning", date: "2024-11-15", amount: "$150", status: "Unpaid", invoice: "invoice1.pdf" },
    { service: "Major Cleaning", date: "2024-12-01", amount: "$300", status: "Unpaid", invoice: "invoice2.pdf" }
];

const paidBills = [
    { service: "Exterior Cleaning", date: "2024-09-01", amount: "$100", status: "Paid", receipt: "receipt1.pdf" },
    { service: "Window Cleaning", date: "2024-08-01", amount: "$80", status: "Paid", receipt: "receipt2.pdf" }
];

// Populate tables with content
function populateUpcomingBills() {
    const tableBody = document.querySelector("#upcomingBillsTable tbody");
    tableBody.innerHTML = ""; // Clear any existing content

    upcomingBills.forEach(bill => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${bill.service}</td>
      <td>${bill.date}</td>
      <td>${bill.amount}</td>
      <td class="status-unpaid">${bill.status}</td>
      <td><a href="${bill.invoice}" download class="download-link">Download Invoice</a></td>
    `;
        tableBody.appendChild(row);
    });
}

function populatePaidBills() {
    const tableBody = document.querySelector("#paidBillsTable tbody");
    tableBody.innerHTML = ""; // Clear any existing content

    paidBills.forEach(bill => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${bill.service}</td>
      <td>${bill.date}</td>
      <td>${bill.amount}</td>
      <td class="status-paid">${bill.status}</td>
      <td><a href="${bill.receipt}" download class="download-link">Download Receipt</a></td>
    `;
        tableBody.appendChild(row);
    });
}

// Populate the tables on page load
populateUpcomingBills();
populatePaidBills();


