// Element references
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuToggle = document.getElementById('menuToggle');
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');
const datetimeElem = document.getElementById('datetime');
const usernameElem = document.getElementById('username');
const profileCircle = document.getElementById('userInitials'); // Corrected ID
const logoutBtn = document.getElementById('logoutBtn');
const timeFilter = document.getElementById('timeFilter');
const totalIncomeElem = document.getElementById('totalIncome');
const totalExpensesElem = document.getElementById('totalExpenses');

// Session check
const loggedInUser = localStorage.getItem("username");

if (!loggedInUser) {
  window.location.href = "index.html";
} else {
  // Set full username
  if (usernameElem) {
    usernameElem.textContent = loggedInUser;
  }

  // Set initials
  if (profileCircle) {
    const initials = loggedInUser
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
    profileCircle.textContent = initials;
  }
}

// Sidebar toggle
menuToggle.addEventListener('click', () => {
  sidebar.classList.add('active');
  overlay.classList.add('active');
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
  profileDropdown.classList.remove('show-dropdown');
});

// Profile dropdown toggle
profileBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  profileDropdown.classList.toggle('show-dropdown');
});

window.addEventListener('click', () => {
  profileDropdown.classList.remove('show-dropdown');
});

// Live datetime
function updateTime() {
  const now = new Date();
  datetimeElem.textContent = now.toLocaleString();
}
setInterval(updateTime, 1000);
updateTime();

// Logout
logoutBtn?.addEventListener('click', () => {
  localStorage.removeItem("username");
  window.location.href = "index.html";
});

// --- Income & Expense (dummy data fetch function) ---
function fetchSummaryData(filter) {
  // Replace this with Firestore query based on `loggedInUser` and `filter`
  const dummyData = {
    today: { income: 1200, expenses: 400 },
    week: { income: 5000, expenses: 1800 },
    month: { income: 22000, expenses: 10500 },
    year: { income: 270000, expenses: 145000 },
  };

  const selected = dummyData[filter] || dummyData.month;
  totalIncomeElem.textContent = `₹${selected.income.toLocaleString()}`;
  totalExpensesElem.textContent = `₹${selected.expenses.toLocaleString()}`;
}

// Initial load
fetchSummaryData('month');

// Time filter change
timeFilter?.addEventListener('change', (e) => {
  const value = e.target.value;
  fetchSummaryData(value); // Fetch based on selected filter
});

// --- FullCalendar Setup ---
document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendarContainer');

  if (!calendarEl) return;

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    height: 500,
    events: [
      // Replace this array with events fetched from Firestore
      {
        title: 'Meeting with John',
        start: new Date().toISOString().split('T')[0],
        color: '#2196f3'
      },
      {
        title: 'Birthday - Alex',
        start: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0],
        color: '#ff9800'
      },
      {
        title: 'One-time Payment',
        start: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0],
        color: '#4caf50'
      }
    ]
  });

  calendar.render();
});
