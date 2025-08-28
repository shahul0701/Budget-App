// === Firebase Configuration and Initialization ===
apiKey: "AIzaSyBhjgu6vpBRhMVjMs5RgSL4aViJq6GYy1A",
  authDomain: "budget-app-1365f.firebaseapp.com",
  projectId: "budget-app-1365f",
  storageBucket: "budget-app-1365f.firebasestorage.app",
  messagingSenderId: "1036194450411",
  appId: "1:1036194450411:web:78ca39a5a82ab9db6c67ae",
  measurementId: "G-YFFJL2H54X"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const auth = firebase.auth();

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
const dashboardContent = document.getElementById('dashboardContent');
const addReminderBtn = document.getElementById("addReminderBtn");
const reminderModal = document.getElementById("reminderModal");
const closeModalBtn = document.getElementById("closeModal");
const saveReminderBtn = document.getElementById("saveReminder");
const reminderTypeSelect = document.getElementById("reminderType");
const formFieldsContainer = document.getElementById("formFields");
const chartOfAccountsBtn = document.getElementById("chartOfAccountsBtn");
const expenseTrackerBtn = document.getElementById("ExpenseTrackerBtn");
const expenseModal = document.getElementById("expenseModal");
const closeExpenseModal = document.getElementById("closeExpenseModal");
const ReportsBtn = document.getElementById("ReportsBtn");

// === Global Variables ===
let spendingChart;
let calendar;
let currentEvents = [];
let currentUser = null;
let currentUserId = null;

// === Authentication and Session Management ===
function checkAuthState() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      currentUser = user;
      currentUserId = user.uid;
      
      // Set user info in UI
      if (usernameElem) {
        usernameElem.textContent = user.displayName || user.email;
      }
      if (profileCircle) {
        const name = user.displayName || user.email;
        const initials = name
          .split(" ")
          .filter(part => part.length > 0)
          .map(part => part[0])
          .join("")
          .toUpperCase();
        profileCircle.textContent = initials;
      }
      
      // Show dashboard content
      if (dashboardContent) {
        dashboardContent.style.display = "block";
      }
      
      // Load user data
      loadUserData();
    } else {
      // No user signed in, redirect to login
      window.location.href = "index.html";
    }
  });
}

// === Load User Data from Firebase ===
function loadUserData() {
  fetchSummaryData('month');
  loadCalendarEvents();
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

// Close profile dropdown on clicking outside
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
  auth.signOut().then(() => {
    window.location.href = "index.html";
  }).catch((error) => {
    console.error("Logout error:", error);
  });
});

// === Chart.js Setup ===
function renderSpendingChart(labels, values) {
  const chartCanvas = document.getElementById("spendingChart");
  if (!chartCanvas) return;

  if (spendingChart) {
    spendingChart.destroy();
  }

  spendingChart = new Chart(chartCanvas, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [{
        label: "Expenses",
        data: values,
        backgroundColor: ["#4caf50", "#f44336", "#2196f3", "#ff9800", "#9c27b0", "#009688"],
        borderWidth: 1,
      }],
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

// === Fetch Income & Expense Summary from Firebase ===
async function fetchSummaryData(filter) {
  if (!currentUserId) return;
  
  try {
    // Calculate date range based on filter
    const now = new Date();
    let startDate, endDate;
    
    switch(filter) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        break;
      case 'week':
        const dayOfWeek = now.getDay();
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek);
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - dayOfWeek) + 1);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear() + 1, 0, 1);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    }
    
    // Fetch transactions for the period
    const transactionsRef = db.collection("users").doc(currentUserId).collection("transactions");
    const snapshot = await transactionsRef
      .where("date", ">=", startDate)
      .where("date", "<", endDate)
      .get();
    
    let totalIncome = 0;
    let totalExpenses = 0;
    const categoryExpenses = {};
    
    snapshot.forEach(doc => {
      const transaction = doc.data();
      if (transaction.type === "income") {
        totalIncome += transaction.amount;
      } else {
        totalExpenses += transaction.amount;
        
        // Aggregate expenses by category
        if (categoryExpenses[transaction.category]) {
          categoryExpenses[transaction.category] += transaction.amount;
        } else {
          categoryExpenses[transaction.category] = transaction.amount;
        }
      }
    });
    
    // Update UI
    if (totalIncomeElem) totalIncomeElem.textContent = `₹${totalIncome.toLocaleString()}`;
    if (totalExpensesElem) totalExpensesElem.textContent = `₹${totalExpenses.toLocaleString()}`;
    
    // Prepare data for chart
    const labels = Object.keys(categoryExpenses);
    const values = Object.values(categoryExpenses);
    
    renderSpendingChart(labels, values);
    
  } catch (error) {
    console.error("Error fetching summary data:", error);
  }
}

timeFilter?.addEventListener('change', (e) => {
  fetchSummaryData(e.target.value);
});

// === FullCalendar Setup with Firebase Events ===
async function loadCalendarEvents() {
  const calendarEl = document.getElementById('calendarContainer');
  const chartContainer = document.getElementById("chartContainer");

  if (chartContainer && !document.getElementById("spendingChart")) {
    const canvas = document.createElement("canvas");
    canvas.id = "spendingChart";
    chartContainer.appendChild(canvas);
  }

  if (calendarEl) {
    // Fetch reminders from Firebase
    const reminders = await getReminderEvents();
    
    calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      height: 'auto',
      events: reminders,
      eventClick: handleEventClick
    });
    calendar.render();
  }
}

async function getReminderEvents() {
  if (!currentUserId) return [];
  
  try {
    const remindersRef = db.collection("reminders");
    const snapshot = await remindersRef
      .where("user", "==", currentUserId)
      .get();
    
    const events = [];
    snapshot.forEach(doc => {
      const reminder = doc.data();
      events.push({
        id: doc.id,
        title: reminder.title,
        start: reminder.start,
        color: reminder.color,
        extendedProps: reminder.extendedProps
      });
    });
    
    return events;
  } catch (error) {
    console.error("Error fetching reminders:", error);
    return [];
  }
}

// === Reminder Modal Logic ===
function openReminderModal() {
  if(reminderModal) {
    reminderModal.style.display = "flex";
    renderReminderForm(reminderTypeSelect?.value || 'reminder');
  }
}

function closeReminderModal() {
  if(reminderModal) {
    reminderModal.style.display = "none";
  }
  if(formFieldsContainer) {
    formFieldsContainer.innerHTML = "";
  }
}

addReminderBtn?.addEventListener("click", openReminderModal);
closeModalBtn?.addEventListener("click", closeReminderModal);

reminderTypeSelect?.addEventListener("change", () => {
  renderReminderForm(reminderTypeSelect.value);
});

function renderReminderForm(type) {
  if (!formFieldsContainer) return;
  formFieldsContainer.innerHTML = `
    <label>Title</label>
    <input type="text" id="reminderTitle" required />
    <label>Date</label>
    <input type="date" id="reminderDate" required />
    <label>Time</label>
    <input type="time" id="reminderTime" />
    <label>Notes</label>
    <textarea id="reminderNotes"></textarea>
  `;
}

saveReminderBtn?.addEventListener("click", async () => {
  const title = document.getElementById("reminderTitle")?.value.trim();
  const date = document.getElementById("reminderDate")?.value;
  const time = document.getElementById("reminderTime")?.value;
  const notes = document.getElementById("reminderNotes")?.value;
  const type = reminderTypeSelect?.value || 'reminder';

  if (!title || !date) {
    alert("Please fill in required fields.");
    return;
  }

  const colorMap = {
    reminder: "#4caf50",
    birthday: "#ff9800",
    meeting: "#2196f3",
  };

  const newEvent = {
    title,
    start: date,
    color: colorMap[type] || "#4caf50",
    extendedProps: { time, notes, type },
    user: currentUserId
  };

  try {
    // Save reminder in Firebase Firestore
    await db.collection("reminders").add(newEvent);
    
    if(calendar) {
      calendar.addEvent(newEvent);
    }
    currentEvents.push(newEvent);
    closeReminderModal();
  } catch (error) {
    console.error("Error saving reminder to Firebase:", error);
    alert("Error saving reminder. Please try again.");
  }
});

// === Popup Detail + Delete Handler ===
function handleEventClick(info) {
  const event = info.event;
  const props = event.extendedProps;

  const popup = document.createElement("div");
  popup.className = "popup-modal";
  popup.innerHTML = `
    <div class="popup-content">
      <span class="close-popup" id="closePopupBtn">&times;</span>
      <h3>${event.title}</h3>
      <p><strong>Date:</strong> ${event.start.toLocaleDateString()}</p>
      <p><strong>Time:</strong> ${props.time || '—'}</p>
      <p><strong>Notes:</strong> ${props.notes || '—'}</p>
      <button id="deleteEventBtn">Delete</button>
    </div>
  `;
  document.body.appendChild(popup);

  document.getElementById("closePopupBtn")?.addEventListener("click", () => {
    popup.remove();
  });

  document.getElementById("deleteEventBtn")?.addEventListener("click", async () => {
    if (confirm("Are you sure you want to delete this reminder?")) {
      try {
        // Remove from Firestore
        await db.collection("reminders").doc(event.id).delete();
        
        // Remove event from calendar UI
        event.remove();
        popup.remove();
      } catch (error) {
        console.error("Error deleting reminder from Firebase:", error);
        alert("Error deleting reminder. Please try again.");
      }
    }
  });
}

// === Navigation to Chart of Accounts ===
chartOfAccountsBtn?.addEventListener("click", () => {
  window.location.href = "coa.html";
});

// === Expense Tracker View Popup ===
expenseTrackerBtn?.addEventListener("click", () => {
  if (expenseModal) {
    expenseModal.style.display = "flex";
  }
});

closeExpenseModal?.addEventListener("click", () => {
  if (expenseModal) {
    expenseModal.style.display = "none";
  }
});

// === Navigation to Report Section ===
ReportsBtn?.addEventListener("click", () => {
  window.location.href = "Section.html";
});

// === Initialize Application ===
document.addEventListener('DOMContentLoaded', () => {
  checkAuthState();
});