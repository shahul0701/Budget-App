// === Element References ===
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuToggle = document.getElementById('menuToggle');
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');
const datetimeElem = document.getElementById('datetime');
const usernameElem = document.getElementById('username');
const profileCircle = document.getElementById('userInitials');
const logoutBtn = document.getElementById('logoutBtn');
const timeFilter = document.getElementById('timeFilter');
const totalIncomeElem = document.getElementById('totalIncome');
const totalExpensesElem = document.getElementById('totalExpenses');

// === Session Check & Initialization ===
const loggedInUser = localStorage.getItem("username");

if (!loggedInUser) {
  window.location.href = "index.html";
} else {
  // Display username
  if (usernameElem) {
    usernameElem.textContent = loggedInUser;
  }

  // Display initials
  if (profileCircle) {
    const initials = loggedInUser
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
    profileCircle.textContent = initials;
  }
}

// === Sidebar Toggle ===
menuToggle?.addEventListener('click', () => {
  sidebar.classList.add('active');
  overlay.classList.add('active');
});

overlay?.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
  profileDropdown?.classList.remove('show-dropdown');
});

// === Profile Dropdown ===
profileBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  profileDropdown?.classList.toggle('show-dropdown');
});

window.addEventListener('click', () => {
  profileDropdown?.classList.remove('show-dropdown');
});

// === Live Clock ===
function updateTime() {
  const now = new Date();
  if (datetimeElem) {
    datetimeElem.textContent = now.toLocaleString();
  }
}
setInterval(updateTime, 1000);
updateTime();

// === Logout Handler ===
logoutBtn?.addEventListener('click', () => {
  localStorage.removeItem("username");
  window.location.href = "index.html";
});

// === Chart.js Setup ===
let spendingChart;

function renderSpendingChart(filter) {
  const chartCanvas = document.getElementById("spendingChart");
  if (!chartCanvas) return;

  const dummyChartData = {
    today: { labels: ["Food", "Travel", "Utilities"], values: [150, 120, 130] },
    week: { labels: ["Groceries", "Rent", "Transport", "Others"], values: [800, 1000, 300, 200] },
    month: { labels: ["Rent", "Bills", "Shopping", "Subscriptions"], values: [4000, 1500, 2000, 1000] },
    year: { labels: ["Rent", "Education", "Trips", "Gadgets"], values: [50000, 25000, 30000, 15000] },
  };

  const selected = dummyChartData[filter] || dummyChartData.month;

  // Destroy previous chart if exists
  if (spendingChart) {
    spendingChart.destroy();
  }

  spendingChart = new Chart(chartCanvas, {
    type: "doughnut",
    data: {
      labels: selected.labels,
      datasets: [
        {
          label: "Expenses",
          data: selected.values,
          backgroundColor: ["#4caf50", "#f44336", "#2196f3", "#ff9800"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });
}

// === Dummy Income & Expense Summary ===
function fetchSummaryData(filter) {
  const dummyData = {
    today: { income: 1200, expenses: 400 },
    week: { income: 5000, expenses: 1800 },
    month: { income: 22000, expenses: 10500 },
    year: { income: 270000, expenses: 145000 },
  };

  const selected = dummyData[filter] || dummyData.month;

  if (totalIncomeElem) {
    totalIncomeElem.textContent = `₹${selected.income.toLocaleString()}`;
  }

  if (totalExpensesElem) {
    totalExpensesElem.textContent = `₹${selected.expenses.toLocaleString()}`;
  }

  renderSpendingChart(filter); // Update chart too
}

timeFilter?.addEventListener('change', (e) => {
  const filter = e.target.value;
  fetchSummaryData(filter);
});

// === FullCalendar Setup + Chart Initialization ===
document.addEventListener('DOMContentLoaded', () => {
  // Calendar
  const calendarEl = document.getElementById('calendarContainer');
  if (calendarEl) {
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      height: 500,
      events: [
        {
          title: 'Meeting with John',
          start: new Date().toISOString().split('T')[0],
          color: '#2196f3',
        },
        {
          title: 'Birthday - Alex',
          start: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0],
          color: '#ff9800',
        },
        {
          title: 'One-time Payment',
          start: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0],
          color: '#4caf50',
        }
      ]
    });
    calendar.render();
  }

  // Add chart canvas dynamically if not present
  const chartContainer = document.getElementById("chartContainer");
  if (chartContainer && !document.getElementById("spendingChart")) {
    const canvas = document.createElement("canvas");
    canvas.id = "spendingChart";
    chartContainer.appendChild(canvas);
  }

  fetchSummaryData('month'); // Initial load
});
