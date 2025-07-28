import { db } from './firebase-config.js';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuToggle = document.getElementById('menuToggle');
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');
const datetimeElem = document.getElementById('datetime');
const usernameElem = document.getElementById('username');
const profileCircle = document.getElementById('profileCircle');
const logoutBtn = document.getElementById('logoutBtn');

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

  loadUserData();  // ⬅️ Load user-specific data from Firestore
}

// Sidebar toggle
menuToggle.addEventListener('click', () => {
  sidebar.classList.add('active');
  overlay.classList.add('active');
});

// Close sidebar
overlay.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
  profileDropdown.classList.remove('show-dropdown');
});

// Toggle profile dropdown
profileBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  profileDropdown.classList.toggle('show-dropdown');
});

// Hide dropdown on outside click
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

/* 🔥 Load User-Specific Data from Firestore */
async function loadUserData() {
  try {
    const remindersRef = collection(db, "reminders");
    const reminderQuery = query(remindersRef, where("username", "==", loggedInUser));
    const reminderSnapshot = await getDocs(reminderQuery);

    const reminders = [];
    reminderSnapshot.forEach(doc => {
      reminders.push(doc.data());
    });

    renderCalendar(reminders); // Pass reminders to calendar renderer
  } catch (error) {
    console.error("Error loading reminders:", error);
  }
}

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

  // Day labels
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dayNames.forEach(day => {
    const dayElem = document.createElement('div');
    dayElem.className = 'calendar-day';
    dayElem.textContent = day;
    calendarGrid.appendChild(dayElem);
  });

  // Empty slots before 1st
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    empty.className = 'calendar-date';
    calendarGrid.appendChild(empty);
  }

  // Actual days
  for (let date = 1; date <= daysInMonth; date++) {
    const cellDate = new Date(year, month, date);
    const cellDateStr = cellDate.toISOString().split('T')[0];

    const dateElem = document.createElement('div');
    dateElem.className = 'calendar-date';
    if (cellDate.toDateString() === today.toDateString()) {
      dateElem.classList.add('calendar-today');
    }

    dateElem.innerHTML = `<strong>${date}</strong>`;

    // Match reminders for this date
    const dayReminders = reminders.filter(r => r.date === cellDateStr);

    dayReminders.forEach(r => {
      const badge = document.createElement('div');
      badge.style.fontSize = '10px';
      badge.style.marginTop = '3px';
      badge.textContent = r.type === 'birthday' ? '🎂' :
                          r.type === 'meeting' ? '📅' : '✅';
      dateElem.appendChild(badge);
    });

    calendarGrid.appendChild(dateElem);
  }

  calendarContainer.appendChild(calendarGrid);
}
