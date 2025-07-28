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

// Session & Profile
const loggedInUser = localStorage.getItem("username");
if (!loggedInUser) {
  window.location.href = "index.html";
} else {
  document.getElementById("username").textContent = loggedInUser;
  const nameParts = loggedInUser.trim().split(" ");
  const initials = nameParts.length >= 2
    ? nameParts[0][0] + nameParts[1][0]
    : loggedInUser.slice(0, 2);
  document.getElementById("userInitials").textContent = initials.toUpperCase();
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

// Profile dropdown toggle
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

// 🔥 Load reminders and render on FullCalendar
async function loadReminders() {
  try {
    const reminderRef = collection(db, "reminders");
    const q = query(reminderRef, where("username", "==", loggedInUser));
    const snapshot = await getDocs(q);
    const events = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      const event = {
        title: data.title,
        start: data.date,
        allDay: true
      };

      // Set emoji based on type
      if (data.type === "birthday") {
        event.title = `🎂 ${data.title}`;
        event.display = 'background';
        event.backgroundColor = "#ffe0e0";
        event.textColor = "#d12f2f";
        event.rrule = {
          freq: 'yearly',
          dtstart: data.date
        };
      } else if (data.type === "meeting") {
        event.title = `📅 ${data.title}`;
      } else {
        event.title = `✅ ${data.title}`;
      }

      events.push(event);
    });

    renderFullCalendar(events);
  } catch (err) {
    console.error("Error loading reminders:", err);
  }
}

function renderFullCalendar(events) {
  calendarContainer.innerHTML = ""; // Clear previous calendar

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
