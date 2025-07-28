import { db } from './firebase-config.js';
import {
  collection,
  query,
  where,
  getDocs
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuToggle = document.getElementById('menuToggle');
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');
const datetimeElem = document.getElementById('datetime');
const calendarContainer = document.getElementById('calendarContainer');
const usernameElem = document.getElementById("username");
const initialsElem = document.getElementById("userInitials");

// User Session
const loggedInUser = localStorage.getItem("username");
if (!loggedInUser) {
  window.location.href = "index.html";
} else {
  usernameElem.textContent = loggedInUser;
  const nameParts = loggedInUser.trim().split(" ");
  const initials = nameParts.length >= 2
    ? nameParts[0][0] + nameParts[1][0]
    : loggedInUser.slice(0, 2);
  initialsElem.textContent = initials.toUpperCase();
}

// Logout
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  localStorage.removeItem("username");
  window.location.href = "index.html";
});

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

// Profile dropdown
profileBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  profileDropdown.classList.toggle('show-dropdown');
});
window.addEventListener('click', () => {
  profileDropdown.classList.remove('show-dropdown');
});

// Clock
function updateTime() {
  const now = new Date();
  datetimeElem.textContent = now.toLocaleString();
}
setInterval(updateTime, 1000);
updateTime();

// Load Reminders from Firestore
async function loadReminders() {
  try {
    const reminderRef = collection(db, "reminders");
    const q = query(reminderRef, where("username", "==", loggedInUser));
    const snapshot = await getDocs(q);
    const events = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      const baseEvent = {
        title: data.title,
        start: data.date,
        allDay: true
      };

      if (data.type === "birthday") {
        baseEvent.title = `🎂 ${data.title}`;
        baseEvent.backgroundColor = "#ffe0e0";
        baseEvent.textColor = "#d12f2f";
      } else if (data.type === "meeting") {
        baseEvent.title = `📅 ${data.title}`;
      } else {
        baseEvent.title = `✅ ${data.title}`;
      }

      events.push(baseEvent);
    });

    renderFullCalendar(events);
  } catch (err) {
    console.error("Error loading reminders:", err);
  }
}

function renderFullCalendar(events) {
  calendarContainer.innerHTML = "";

  const calendar = new FullCalendar.Calendar(calendarContainer, {
    initialView: 'dayGridMonth',
    height: 'auto',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listWeek'
    },
    events: events
  });

  calendar.render();
}

loadReminders();
