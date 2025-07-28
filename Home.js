const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuToggle = document.getElementById('menuToggle');
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');
const datetimeElem = document.getElementById('datetime');
const profileUsername = document.getElementById('profile-username'); // Make sure this exists in your HTML

// Check session
const loggedInUser = localStorage.getItem("username");
if (!loggedInUser) {
  // If no session, redirect to login page
  window.location.href = "index.html";
} else {
  // Set username in profile
  if (profileUsername) {
    profileUsername.textContent = loggedInUser;
  }
}

// Toggle sidebar
menuToggle.addEventListener('click', () => {
  sidebar.classList.add('active');
  overlay.classList.add('active');
});

// Close sidebar when overlay clicked
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

// Close dropdown on click outside
window.addEventListener('click', () => {
  profileDropdown.classList.remove('show-dropdown');
});

// Update time
function updateTime() {
  const now = new Date();
  datetimeElem.textContent = now.toLocaleString();
}
setInterval(updateTime, 1000);
updateTime();

// Optional: Logout functionality
document.getElementById('logoutBtn')?.addEventListener('click', () => {
  localStorage.removeItem('username');
  window.location.href = 'index.html';
});
