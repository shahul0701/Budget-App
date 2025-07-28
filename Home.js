import { db } from './firebase-config.js';
import {
  collection,
  query,
  where,
  getDocs
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// DOM elements
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuToggle = document.getElementById('menuToggle');
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');
const datetimeElem = document.getElementById('datetime');
const usernameElem = document.getElementById('username');
const profileCircle = document.getElementById('userInitials'); // was 'profileCircle'
const logoutBtn = document.getElementById('logoutBtn');

// Check session
const loggedInUser = localStorage.getItem("username");
if (!loggedInUser) {
  window.location.href = "index.html";
} else {
  // Set full name
  usernameElem.textContent = loggedInUser;

  // Set initials
  const nameParts = loggedInUser.trim().split(" ");
  const initials = nameParts.length >= 2
    ? nameParts[0][0] + nameParts[1][0]
    : loggedInUser.slice(0, 2);
  profileCircle.textContent = initials.toUpperCase();

  // Load data
  loadUserData();
}

// Sidebar toggle
menuToggle?.addEventListener('click', () => {
  sidebar.classList.add('active');
  overlay.classList.add('active');
});

overlay?.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
  profileDropdown.classList.remove('show-dropdown');
});

// Profile dropdown toggle
profileBtn?.addEventListener('click', (e) => {
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

/* 🔥 Load User-Specific Reminders from Firestore */
async function loadUserData() {
  try {
    const remindersRef = collection(db, "reminders");
    const reminderQuery = query(remindersRef, where("username", "==", loggedInUser));
    const snapshot = await getDocs(reminderQuery);

    const reminders = [];
    snapshot.forEach(doc => {
      reminders.push(doc.data());
    });

    renderCalendar(reminders);
  } catch (err) {
    console.error("Error fetching reminders:", err);
  }
}

/* 🗓 Render Calendar with Reminders */
function renderCalendar(reminders) {
  const calendarContainer = document.getElementById('calendarContainer');
  calendarContainer.innerHTML = '';

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarGrid = document.createElement('div');
  calendarGrid.className = 'calendar-grid';

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dayNames.forEach(day => {
    const dayElem = document.createElement('div');
    dayElem.className = 'calendar-day';
    dayElem.textContent = day;
    calendarGrid.appendChild(dayElem);
  });

  // Padding before 1st day
  for (let i = 0; i < firstDay; i++) {
    const pad = document.createElement('div');
    pad.className = 'calendar-date empty';
    calendarGrid.appendChild(pad);
  }

  for (let date = 1; date <= daysInMonth; date++) {
    const cellDate = new Date(year, month, date);
    const cellDateStr = cellDate.toISOString().split('T')[0];

    const dateElem = document.createElement('div');
    dateElem.className = 'calendar-date';
    if (cellDate.toDateString() === today.toDateString()) {
      dateElem.classList.add('calendar-today');
    }

    dateElem.innerHTML = `<strong>${date}</strong>`;

    const todaysReminders = reminders.filter(r => r.date === cellDateStr);

    todaysReminders.forEach(r => {
      const badge = document.createElement('div');
      badge.className = 'reminder-badge';
      badge.title = r.title;

      badge.textContent = r.type === 'birthday' ? '🎂'
                        : r.type === 'meeting' ? '📅'
                        : '✅';
      dateElem.appendChild(badge);
    });

    calendarGrid.appendChild(dateElem);
  }

  calendarContainer.appendChild(calendarGrid);
}
