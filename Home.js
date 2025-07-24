const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuToggle = document.getElementById('menuToggle');
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');
const datetimeElem = document.getElementById('datetime');

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
