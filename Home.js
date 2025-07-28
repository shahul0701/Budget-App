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
  if (usernameElem) {
    usernameElem.textContent = loggedInUser;
  }
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

  if (spendingChart) spendingChart.destroy();

  spendingChart = new Chart(chartCanvas, {
    type: "doughnut",
    data: {
      labels: selected.labels,
      datasets: [{
        label: "Expenses",
        data: selected.values,
        backgroundColor: ["#4caf50", "#f44336", "#2196f3", "#ff9800"],
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "bottom" } },
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

  totalIncomeElem.textContent = `₹${selected.income.toLocaleString()}`;
  totalExpensesElem.textContent = `₹${selected.expenses.toLocaleString()}`;

  renderSpendingChart(filter);
}

timeFilter?.addEventListener('change', (e) => {
  fetchSummaryData(e.target.value);
});

// === FullCalendar Setup ===
let calendar;
let currentEvents = [];

async function fetchRemindersFromFirestore() {
  const db = firebase.firestore();
  const snapshot = await db.collection("reminders")
    .where("user", "==", loggedInUser).get();

  const events = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    let event = {
      id: doc.id,
      title: data.title,
      start: data.start,
      color: data.color,
      extendedProps: {
        ...data.extendedProps,
        time: data.extendedProps?.time || '',
        notes: data.extendedProps?.notes || '',
        type: data.extendedProps?.type || '',
      },
    };

    if (data.extendedProps?.type === "birthday") {
      event.display = "background";
      event.backgroundColor = "#ff9800";
      event.start = new Date(data.start).toISOString().split("T")[0];
      event.rrule = {
        freq: "yearly",
        dtstart: data.start,
      };
    }

    events.push(event);
  });

  return events;
}

document.addEventListener('DOMContentLoaded', async () => {
  const calendarEl = document.getElementById('calendarContainer');
  const chartContainer = document.getElementById("chartContainer");
  if (chartContainer && !document.getElementById("spendingChart")) {
    const canvas = document.createElement("canvas");
    canvas.id = "spendingChart";
    chartContainer.appendChild(canvas);
  }

  if (calendarEl) {
    const events = await fetchRemindersFromFirestore();
    calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      height: 'auto',
      events,
      eventClick: handleEventClick,
    });
    calendar.render();
  }

  fetchSummaryData('month');
});

// === Reminder Modal Logic ===
const addReminderBtn = document.getElementById("addReminderBtn");
const reminderModal = document.getElementById("reminderModal");
const closeModalBtn = document.getElementById("closeModal");
const saveReminderBtn = document.getElementById("saveReminder");
const reminderTypeSelect = document.getElementById("reminderType");
const formFieldsContainer = document.getElementById("formFields");

function openReminderModal() {
  reminderModal.style.display = "flex";
  renderReminderForm(reminderTypeSelect.value);
}

function closeReminderModal() {
  reminderModal.style.display = "none";
  formFieldsContainer.innerHTML = "";
}

addReminderBtn?.addEventListener("click", openReminderModal);
closeModalBtn?.addEventListener("click", closeReminderModal);
reminderTypeSelect?.addEventListener("change", () => {
  renderReminderForm(reminderTypeSelect.value);
});

function renderReminderForm(type) {
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
  const title = document.getElementById("reminderTitle")?.value;
  const date = document.getElementById("reminderDate")?.value;
  const time = document.getElementById("reminderTime")?.value;
  const notes = document.getElementById("reminderNotes")?.value;
  const type = reminderTypeSelect?.value;

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
    color: colorMap[type],
    extendedProps: { time, notes, type },
    user: loggedInUser,
    createdAt: new Date().toISOString(),
  };

  try {
    const db = firebase.firestore();
    const docRef = await db.collection("reminders").add(newEvent);
    newEvent.id = docRef.id;

    if (calendar) {
      calendar.addEvent({
        ...newEvent,
        id: docRef.id,
      });
    }

    closeReminderModal();
  } catch (error) {
    console.error("Error saving reminder to Firebase:", error);
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

  document.getElementById("closePopupBtn").addEventListener("click", () => {
    popup.remove();
  });

  document.getElementById("deleteEventBtn").addEventListener("click", async () => {
    if (confirm("Are you sure you want to delete this reminder?")) {
      try {
        const db = firebase.firestore();
        await db.collection("reminders").doc(event.id).delete();
        event.remove();
        popup.remove();
      } catch (err) {
        console.error("Failed to delete:", err);
        alert("Failed to delete the reminder.");
      }
    }
  });
}
