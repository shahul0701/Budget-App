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
    const incomeRef = collection(db, "incomes");
    const expenseRef = collection(db, "expenses");
    const remindersRef = collection(db, "reminders");

    const incomeQuery = query(incomeRef, where("username", "==", loggedInUser));
    const expenseQuery = query(expenseRef, where("username", "==", loggedInUser));
    const reminderQuery = query(remindersRef, where("username", "==", loggedInUser));

    const incomeSnapshot = await getDocs(incomeQuery);
    const expenseSnapshot = await getDocs(expenseQuery);
    const reminderSnapshot = await getDocs(reminderQuery);

    // Calculate and show totals
    let totalIncome = 0;
    incomeSnapshot.forEach(doc => {
      totalIncome += parseFloat(doc.data().amount || 0);
    });
    document.getElementById("totalIncome").textContent = `₹${totalIncome}`;

    let totalExpense = 0;
    expenseSnapshot.forEach(doc => {
      totalExpense += parseFloat(doc.data().amount || 0);
    });
    document.getElementById("totalExpense").textContent = `₹${totalExpense}`;

    // Render reminders (you can improve calendar rendering here)
    const calendarContainer = document.getElementById('calendarContainer');
    calendarContainer.innerHTML = ''; // Clear previous

    reminderSnapshot.forEach(doc => {
      const data = doc.data();
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `<strong>${data.title}</strong><br>${data.date} - ${data.type}`;
      calendarContainer.appendChild(div);
    });

  } catch (error) {
    console.error("Error loading user data:", error);
  }
}
