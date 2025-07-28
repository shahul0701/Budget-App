const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuToggle = document.getElementById('menuToggle');
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');
const datetimeElem = document.getElementById('datetime');
const usernameElem = document.getElementById('username');      // Displays full name
const profileCircle = document.getElementById('profileCircle'); // Displays initials
const logoutBtn = document.getElementById('logoutBtn');

// Session check
const loggedInUser = localStorage.getItem("username");

if (!loggedInUser) {
  window.location.href = "index.html";
} else {
  // Set full username in greeting
  if (usernameElem) {
    usernameElem.textContent = loggedInUser;
  }

  // Set initials in profile circle
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
