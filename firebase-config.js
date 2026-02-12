<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Panel - Budget App</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Arial', sans-serif;
    }
    
    body {
      background: #f7f7f7;
      color: #333;
      line-height: 1.6;
    }
    
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
    }
    
    header {
      background: linear-gradient(to right, #2c3e50, #3498db);
      color: white;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 30px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo {
      font-size: 24px;
      font-weight: bold;
    }
    
    .logo span {
      background: #e74c3c;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 14px;
      margin-left: 10px;
    }
    
    .nav-links {
      display: flex;
      gap: 20px;
    }
    
    .nav-links a {
      color: white;
      text-decoration: none;
      padding: 8px 16px;
      border-radius: 6px;
      transition: background 0.3s;
    }
    
    .nav-links a:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    
    .nav-links a.active {
      background: rgba(255, 255, 255, 0.3);
    }
    
    /* Dashboard Stats */
    .dashboard-stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .stat-card {
      background: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: transform 0.3s;
    }
    
    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    }
    
    .stat-info h3 {
      font-size: 14px;
      color: #666;
      margin-bottom: 8px;
      text-transform: uppercase;
    }
    
    .stat-number {
      font-size: 32px;
      font-weight: bold;
      color: #2c3e50;
    }
    
    .stat-icon {
      font-size: 40px;
      opacity: 0.6;
    }
    
    /* Loading Overlay */
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.9);
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    
    .loading-overlay.show {
      display: flex;
    }
    
    .loading-content {
      text-align: center;
      background: white;
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
    
    .loading-spinner {
      width: 60px;
      height: 60px;
      border: 6px solid #f3f3f3;
      border-top: 6px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .loading-percentage {
      font-size: 24px;
      font-weight: bold;
      color: #3498db;
      margin-bottom: 10px;
    }
    
    .progress-container {
      width: 300px;
      height: 10px;
      background: #f0f0f0;
      border-radius: 5px;
      margin-top: 20px;
      overflow: hidden;
    }
    
    .progress-bar {
      width: 0%;
      height: 100%;
      background: linear-gradient(to right, #3498db, #2980b9);
      transition: width 0.3s ease;
    }
    
    /* Admin Content Layout */
    .admin-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }
    
    .admin-card {
      background: white;
      border-radius: 10px;
      padding: 25px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      margin-bottom: 30px;
    }
    
    .card-title {
      font-size: 20px;
      margin-bottom: 20px;
      color: #333;
      padding-bottom: 10px;
      border-bottom: 2px solid #f0f0f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    /* Filter Section */
    .filter-section {
      display: flex;
      gap: 15px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    
    .filter-group {
      flex: 1;
      min-width: 200px;
    }
    
    select, input {
      width: 100%;
      padding: 12px 15px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
      transition: border 0.3s;
    }
    
    select:focus, input:focus {
      border-color: #3498db;
      outline: none;
    }
    
    /* Buttons */
    .btn {
      background: #3498db;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .btn:hover {
      background: #2980b9;
      transform: translateY(-2px);
    }
    
    .btn-success {
      background: #27ae60;
    }
    
    .btn-success:hover {
      background: #229954;
    }
    
    .btn-danger {
      background: #e74c3c;
    }
    
    .btn-danger:hover {
      background: #c0392b;
    }
    
    .btn-warning {
      background: #f39c12;
    }
    
    .btn-warning:hover {
      background: #e67e22;
    }
    
    .btn-small {
      padding: 8px 16px;
      font-size: 12px;
    }
    
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
    
    /* Alert Box */
    .alert {
      padding: 15px 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .alert-success {
      background: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }
    
    .alert-error {
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }
    
    .alert-info {
      background: #d1ecf1;
      color: #0c5460;
      border: 1px solid #bee5eb;
    }
    
    /* Tabs */
    .tabs {
      display: flex;
      gap: 5px;
      margin-bottom: 20px;
      border-bottom: 2px solid #eee;
      padding-bottom: 10px;
      flex-wrap: wrap;
    }
    
    .tab {
      padding: 10px 20px;
      cursor: pointer;
      border-radius: 6px 6px 0 0;
      transition: all 0.3s;
      font-weight: 500;
    }
    
    .tab:hover {
      background: #e8f4fd;
    }
    
    .tab.active {
      background: #3498db;
      color: white;
    }
    
    /* Messages Container */
    .messages-container {
      max-height: 700px;
      overflow-y: auto;
      padding-right: 10px;
    }
    
    .message-item {
      background: white;
      border: 1px solid #eee;
      border-radius: 12px;
      padding: 25px;
      margin-bottom: 25px;
      transition: all 0.3s;
    }
    
    .message-item:hover {
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      border-color: #3498db;
    }
    
    .message-item.unread {
      border-left: 6px solid #3498db;
      background: #f0f9ff;
    }
    
    .message-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 20px;
    }
    
    .user-info {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    
    .user-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #3498db, #2c3e50);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 20px;
    }
    
    .user-details {
      font-size: 14px;
    }
    
    .user-name {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 4px;
      color: #2c3e50;
    }
    
    .user-email {
      color: #666;
      font-size: 13px;
    }
    
    .message-badges {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    
    .message-type-badge {
      display: inline-block;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
      color: white;
    }
    
    .badge-suggestion {
      background: #17a2b8;
    }
    
    .badge-query {
      background: #ffc107;
      color: #212529;
    }
    
    .badge-complaint {
      background: #dc3545;
    }
    
    .message-status {
      display: inline-block;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
    }
    
    .status-pending {
      background: #ffc107;
      color: #212529;
    }
    
    .status-review {
      background: #17a2b8;
      color: white;
    }
    
    .status-resolved {
      background: #28a745;
      color: white;
    }
    
    .status-rejected {
      background: #6c757d;
      color: white;
    }
    
    .message-subject {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 15px;
      color: #2c3e50;
    }
    
    .message-content {
      margin-bottom: 20px;
      line-height: 1.8;
      color: #444;
      padding: 20px;
      background: #f9f9f9;
      border-radius: 10px;
      border: 1px solid #eee;
    }
    
    .message-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #666;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
    }
    
    /* Reply Section */
    .reply-section {
      background: #f8f9fa;
      border-radius: 12px;
      padding: 20px;
      margin-top: 20px;
    }
    
    .previous-reply {
      background: #e8f4fd;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
      border-left: 6px solid #3498db;
    }
    
    .previous-reply-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      font-weight: bold;
      color: #2c3e50;
    }
    
    .reply-textarea {
      width: 100%;
      padding: 15px;
      border: 2px solid #ddd;
      border-radius: 10px;
      font-size: 14px;
      resize: vertical;
      min-height: 120px;
      margin-bottom: 15px;
      transition: border 0.3s;
    }
    
    .reply-textarea:focus {
      border-color: #3498db;
      outline: none;
    }
    
    .reply-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      flex-wrap: wrap;
    }
    
    .status-select {
      padding: 10px 15px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 13px;
      min-width: 180px;
      background: white;
    }
    
    .status-select:focus {
      border-color: #3498db;
      outline: none;
    }
    
    /* User List */
    .user-list {
      max-height: 500px;
      overflow-y: auto;
    }
    
    .user-list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid #eee;
      transition: background 0.3s;
    }
    
    .user-list-item:hover {
      background: #f8f9fa;
    }
    
    .user-list-info {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    
    .user-avatar-small {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #3498db;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
    }
    
    .user-stats {
      font-size: 12px;
      color: #666;
      margin-top: 4px;
    }
    
    .badge-admin {
      background: #e74c3c;
      color: white;
      padding: 3px 8px;
      border-radius: 12px;
      font-size: 10px;
      margin-left: 8px;
    }
    
    /* Empty State */
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #666;
      background: #f9f9f9;
      border-radius: 12px;
    }
    
    .empty-state i {
      font-size: 48px;
      color: #ccc;
      margin-bottom: 15px;
      display: block;
    }
    
    /* Debug Panel */
    .debug-info {
      background: #2c3e50;
      color: #fff;
      border-radius: 8px;
      padding: 15px;
      margin-top: 20px;
      font-size: 12px;
      display: none;
      max-height: 200px;
      overflow-y: auto;
      font-family: monospace;
    }
    
    .debug-info.show {
      display: block;
    }
    
    .debug-toggle {
      font-size: 11px;
      color: #666;
      cursor: pointer;
      margin-left: 10px;
      text-decoration: underline;
    }
    
    .debug-toggle:hover {
      color: #3498db;
    }
    
    .debug-content {
      color: #0f0;
    }
    
    footer {
      text-align: center;
      margin-top: 50px;
      padding: 20px;
      color: #666;
      border-top: 1px solid #eee;
    }
  </style>
</head>
<body>
  <!-- Loading Overlay -->
  <div id="loadingOverlay" class="loading-overlay">
    <div class="loading-content">
      <div class="loading-spinner"></div>
      <div class="loading-percentage" id="loadingPercentage">0%</div>
      <div class="loading-text" id="loadingText">Loading admin panel...</div>
      <div class="progress-container">
        <div class="progress-bar" id="progressBar" style="width: 0%;"></div>
      </div>
    </div>
  </div>

  <div class="container">
    <header>
      <div class="header-content">
        <div class="logo">
          Budget App Admin
          <span>Admin</span>
        </div>
        <div class="nav-links">
          <a href="admin.html" class="active">Dashboard</a>
          <a href="#" id="logoutBtn">Logout</a>
        </div>
      </div>
    </header>
    
    <div id="alertBox"></div>
    
    <!-- Stats Dashboard -->
    <div class="dashboard-stats" id="statsDashboard">
      <div class="stat-card">
        <div class="stat-info">
          <h3>Total Messages</h3>
          <div class="stat-number" id="totalMessages">0</div>
        </div>
        <div class="stat-icon">📬</div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <h3>Pending</h3>
          <div class="stat-number" id="pendingMessages">0</div>
        </div>
        <div class="stat-icon">⏳</div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <h3>Review</h3>
          <div class="stat-number" id="reviewMessages">0</div>
        </div>
        <div class="stat-icon">👀</div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <h3>Resolved</h3>
          <div class="stat-number" id="resolvedMessages">0</div>
        </div>
        <div class="stat-icon">✅</div>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="admin-content">
      <!-- Left Column: Messages Management -->
      <div>
        <div class="admin-card">
          <div class="card-title">
            <span>📋 User Messages</span>
            <div>
              <span class="debug-toggle" id="toggleDebug">[Show Debug]</span>
              <button class="btn btn-small" id="refreshMessagesBtn" style="margin-left: 10px;">🔄 Refresh</button>
            </div>
          </div>
          
          <div class="tabs">
            <div class="tab active" data-filter="all">All</div>
            <div class="tab" data-filter="pending">Pending</div>
            <div class="tab" data-filter="review">Review</div>
            <div class="tab" data-filter="resolved">Resolved</div>
            <div class="tab" data-filter="rejected">Rejected</div>
          </div>
          
          <div class="filter-section">
            <div class="filter-group">
              <select id="messageTypeFilter">
                <option value="all">📋 All Types</option>
                <option value="suggestion">💡 Suggestions</option>
                <option value="query">❓ Queries</option>
                <option value="complaint">⚠️ Complaints</option>
              </select>
            </div>
            <div class="filter-group">
              <input type="text" id="searchInput" placeholder="🔍 Search by user, email or subject...">
            </div>
          </div>
          
          <div id="messagesList" class="messages-container">
            <div class="empty-state">
              <i>📭</i>
              <h3>Loading messages...</h3>
              <p>Please wait while we fetch user messages</p>
            </div>
          </div>
          
          <!-- Debug Panel -->
          <div id="debugInfo" class="debug-info">
            <strong style="color: #fff;">🔍 Debug Information:</strong>
            <div id="debugContent" class="debug-content"></div>
          </div>
        </div>
      </div>
      
      <!-- Right Column: User Management & Stats -->
      <div>
        <div class="admin-card">
          <div class="card-title">
            <span>👥 Active Users</span>
            <button class="btn btn-small" id="refreshUsersBtn">🔄 Refresh</button>
          </div>
          
          <div id="usersList" class="user-list">
            <div class="empty-state">
              <i>👤</i>
              <h3>Loading users...</h3>
            </div>
          </div>
        </div>
        
        <div class="admin-card">
          <div class="card-title">
            <span>📊 Message Analytics</span>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center;">
              <div style="font-size: 32px; color: #17a2b8; margin-bottom: 10px;">💡</div>
              <div style="font-size: 14px; color: #666; margin-bottom: 5px;">Suggestions</div>
              <div style="font-size: 28px; font-weight: bold; color: #17a2b8;" id="statsSuggestions">0</div>
            </div>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center;">
              <div style="font-size: 32px; color: #ffc107; margin-bottom: 10px;">❓</div>
              <div style="font-size: 14px; color: #666; margin-bottom: 5px;">Queries</div>
              <div style="font-size: 28px; font-weight: bold; color: #ffc107;" id="statsQueries">0</div>
            </div>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center;">
              <div style="font-size: 32px; color: #dc3545; margin-bottom: 10px;">⚠️</div>
              <div style="font-size: 14px; color: #666; margin-bottom: 5px;">Complaints</div>
              <div style="font-size: 28px; font-weight: bold; color: #dc3545;" id="statsComplaints">0</div>
            </div>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center;">
              <div style="font-size: 32px; color: #28a745; margin-bottom: 10px;">✅</div>
              <div style="font-size: 14px; color: #666; margin-bottom: 5px;">Response Rate</div>
              <div style="font-size: 28px; font-weight: bold; color: #28a745;" id="responseRate">0%</div>
            </div>
          </div>
          
          <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #eee;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <span style="font-weight: bold; color: #2c3e50;">Quick Actions</span>
              </div>
              <div>
                <button class="btn btn-small btn-success" id="exportDataBtn" style="margin-right: 10px;">📊 Export</button>
                <button class="btn btn-small" id="markAllReadBtn">✓ Mark All Read</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <footer>
      Budget App Admin Panel • © 2025 • All rights reserved
    </footer>
  </div>

  <!-- Firebase App and Auth -->
  <script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
    import { 
      getAuth, 
      signOut,
      onAuthStateChanged
    } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
    import { 
      getFirestore, 
      collection, 
      doc, 
      getDoc, 
      getDocs,
      updateDoc,
      query,
      where,
      orderBy,
      limit,
      serverTimestamp,
      writeBatch
    } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

    // ============ FIREBASE CONFIG ============
    const firebaseConfig = {
      apiKey: "AIzaSyBhjgu6vpBRhMVjMs5RgSL4aViJq6GYy1A",
      authDomain: "budget-app-1365f.firebaseapp.com",
      projectId: "budget-app-1365f",
      storageBucket: "budget-app-1365f.appspot.com",
      messagingSenderId: "1036194450411",
      appId: "1:1036194450411:web:78ca39a5a82ab9db6c67ae",
      measurementId: "G-YFFJL2H54X"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    // ============ ADMIN CONFIG ============
    const ADMIN_EMAILS = [
      'shahulsha254@gmail.com',  // Your admin email
      'admin@budgetapp.com'       // Additional admin emails
    ];

    // ============ DOM ELEMENTS ============
    // Loading elements
    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingPercentage = document.getElementById('loadingPercentage');
    const loadingText = document.getElementById('loadingText');
    const progressBar = document.getElementById('progressBar');

    // Alert box
    const alertBox = document.getElementById('alertBox');

    // Stats elements
    const totalMessagesEl = document.getElementById('totalMessages');
    const pendingMessagesEl = document.getElementById('pendingMessages');
    const reviewMessagesEl = document.getElementById('reviewMessages');
    const resolvedMessagesEl = document.getElementById('resolvedMessages');
    const statsSuggestions = document.getElementById('statsSuggestions');
    const statsQueries = document.getElementById('statsQueries');
    const statsComplaints = document.getElementById('statsComplaints');
    const responseRate = document.getElementById('responseRate');

    // Button elements
    const logoutBtn = document.getElementById('logoutBtn');
    const refreshMessagesBtn = document.getElementById('refreshMessagesBtn');
    const refreshUsersBtn = document.getElementById('refreshUsersBtn');
    const exportDataBtn = document.getElementById('exportDataBtn');
    const markAllReadBtn = document.getElementById('markAllReadBtn');
    const toggleDebug = document.getElementById('toggleDebug');

    // Filter elements
    const messagesList = document.getElementById('messagesList');
    const usersList = document.getElementById('usersList');
    const messageTabs = document.querySelectorAll('.tab');
    const messageTypeFilter = document.getElementById('messageTypeFilter');
    const searchInput = document.getElementById('searchInput');
    const debugInfo = document.getElementById('debugInfo');
    const debugContent = document.getElementById('debugContent');

    // ============ STATE VARIABLES ============
    let currentFilter = 'all';
    let currentTypeFilter = 'all';
    let currentSearchTerm = '';
    let allMessages = [];
    let allUsers = [];
    let loadingSteps = 0;
    const totalSteps = 5;

    // ============ LOADING FUNCTIONS ============
    function showLoading(message = 'Loading admin panel...') {
      loadingOverlay.classList.add('show');
      loadingText.textContent = message;
      loadingPercentage.textContent = '0%';
      progressBar.style.width = '0%';
      loadingSteps = 0;
    }

    function updateLoadingProgress(step, message) {
      loadingSteps = Math.min(loadingSteps + 1, totalSteps);
      const percentage = Math.round((loadingSteps / totalSteps) * 100);
      loadingPercentage.textContent = `${percentage}%`;
      progressBar.style.width = `${percentage}%`;
      if (message) loadingText.textContent = message;
    }

    function hideLoading() {
      setTimeout(() => {
        loadingOverlay.classList.remove('show');
      }, 500);
    }

    // ============ UTILITY FUNCTIONS ============
    function showAlert(message, type = 'info', duration = 5000) {
      const alertDiv = document.createElement('div');
      alertDiv.className = `alert alert-${type}`;
      alertDiv.innerHTML = `
        <span>${message}</span>
        <button style="background: none; border: none; color: inherit; cursor: pointer; font-size: 18px;" onclick="this.parentElement.remove()">×</button>
      `;
      alertBox.innerHTML = '';
      alertBox.appendChild(alertDiv);
      
      if (duration > 0) {
        setTimeout(() => {
          if (alertDiv.parentElement) alertDiv.remove();
        }, duration);
      }
    }

    function showDebug(message, data = null) {
      const timestamp = new Date().toLocaleTimeString();
      const dataStr = data ? ' - ' + JSON.stringify(data, null, 2) : '';
      debugContent.innerHTML = `[${timestamp}] ${message}${dataStr}<br>` + debugContent.innerHTML;
      console.log(`[Admin Debug] ${message}`, data || '');
    }

    // Toggle debug panel
    if (toggleDebug) {
      toggleDebug.addEventListener('click', () => {
        debugInfo.classList.toggle('show');
        toggleDebug.textContent = debugInfo.classList.contains('show') ? '[Hide Debug]' : '[Show Debug]';
      });
    }

    // ============ CHECK ADMIN STATUS ============
    function isAdmin(user) {
      if (!user) return false;
      return ADMIN_EMAILS.includes(user.email);
    }

    // ============ MESSAGE FUNCTIONS ============
    async function loadAllMessages() {
      try {
        showDebug('Loading all messages...');
        
        const q = query(
          collection(db, 'adminMessages'),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        allMessages = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          allMessages.push({
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
            repliedAt: data.repliedAt?.toDate ? data.repliedAt.toDate() : null
          });
        });
        
        showDebug('Messages loaded', { count: allMessages.length });
        updateStats();
        filterAndDisplayMessages();
        
      } catch (error) {
        console.error('Error loading messages:', error);
        showDebug('Error loading messages', error.message);
        showAlert('Error loading messages: ' + error.message, 'error');
      }
    }

    function updateStats() {
      // Calculate statistics
      const total = allMessages.length;
      const pending = allMessages.filter(m => m.status === 'pending').length;
      const review = allMessages.filter(m => m.status === 'review').length;
      const resolved = allMessages.filter(m => m.status === 'resolved').length;
      const rejected = allMessages.filter(m => m.status === 'rejected').length;
      
      const suggestions = allMessages.filter(m => m.messageType === 'suggestion').length;
      const queries = allMessages.filter(m => m.messageType === 'query').length;
      const complaints = allMessages.filter(m => m.messageType === 'complaint').length;
      
      const replied = allMessages.filter(m => m.adminReply).length;
      const responseRateValue = total > 0 ? Math.round((replied / total) * 100) : 0;
      
      // Update DOM
      totalMessagesEl.textContent = total;
      pendingMessagesEl.textContent = pending;
      reviewMessagesEl.textContent = review;
      resolvedMessagesEl.textContent = resolved;
      
      statsSuggestions.textContent = suggestions;
      statsQueries.textContent = queries;
      statsComplaints.textContent = complaints;
      responseRate.textContent = `${responseRateValue}%`;
      
      showDebug('Stats updated', { total, pending, review, resolved, rejected });
    }

    function filterAndDisplayMessages() {
      let filtered = [...allMessages];
      
      // Filter by status tab
      if (currentFilter !== 'all') {
        filtered = filtered.filter(m => m.status === currentFilter);
      }
      
      // Filter by message type
      if (currentTypeFilter !== 'all') {
        filtered = filtered.filter(m => m.messageType === currentTypeFilter);
      }
      
      // Filter by search term
      if (currentSearchTerm) {
        const term = currentSearchTerm.toLowerCase();
        filtered = filtered.filter(m => 
          m.subject?.toLowerCase().includes(term) ||
          m.content?.toLowerCase().includes(term) ||
          m.userEmail?.toLowerCase().includes(term) ||
          m.userName?.toLowerCase().includes(term)
        );
      }
      
      displayMessages(filtered);
    }

    function displayMessages(messages) {
      if (messages.length === 0) {
        messagesList.innerHTML = `
          <div class="empty-state">
            <i>📭</i>
            <h3>No messages found</h3>
            <p>There are no messages matching your criteria</p>
          </div>
        `;
        return;
      }
      
      messagesList.innerHTML = '';
      
      messages.forEach(message => {
        const messageElement = createMessageElement(message);
        messagesList.appendChild(messageElement);
      });
    }

    function createMessageElement(message) {
      const div = document.createElement('div');
      div.className = `message-item ${!message.adminReply ? 'unread' : ''}`;
      div.id = `message-${message.id}`;
      
      const createdAt = message.createdAt instanceof Date ? 
        message.createdAt.toLocaleString() : 
        new Date(message.createdAt).toLocaleString();
      
      const userInitial = message.userName ? message.userName.charAt(0).toUpperCase() : 'U';
      
      // Message type badge
      let typeBadge = '';
      let typeIcon = '';
      switch(message.messageType) {
        case 'suggestion':
          typeBadge = '<span class="message-type-badge badge-suggestion">💡 Suggestion</span>';
          typeIcon = '💡';
          break;
        case 'query':
          typeBadge = '<span class="message-type-badge badge-query">❓ Query</span>';
          typeIcon = '❓';
          break;
        case 'complaint':
          typeBadge = '<span class="message-type-badge badge-complaint">⚠️ Complaint</span>';
          typeIcon = '⚠️';
          break;
        default:
          typeBadge = '<span class="message-type-badge badge-suggestion">📝 Message</span>';
          typeIcon = '📝';
      }
      
      // Status badge
      let statusBadge = '';
      switch(message.status) {
        case 'pending':
          statusBadge = '<span class="message-status status-pending">⏳ Pending</span>';
          break;
        case 'review':
          statusBadge = '<span class="message-status status-review">👀 Under Review</span>';
          break;
        case 'resolved':
          statusBadge = '<span class="message-status status-resolved">✅ Resolved</span>';
          break;
        case 'rejected':
          statusBadge = '<span class="message-status status-rejected">❌ Rejected</span>';
          break;
        default:
          statusBadge = '<span class="message-status status-pending">⏳ Pending</span>';
      }
      
      // Previous reply if exists
      let previousReplyHTML = '';
      if (message.adminReply) {
        const repliedAt = message.repliedAt instanceof Date ? 
          message.repliedAt.toLocaleString() : 
          new Date(message.repliedAt).toLocaleString();
        
        previousReplyHTML = `
          <div class="previous-reply">
            <div class="previous-reply-header">
              <span>📨 Previous Response</span>
              <span style="font-size: 12px;">${repliedAt}</span>
            </div>
            <div style="color: #2c3e50; line-height: 1.6;">${message.adminReply}</div>
            <div style="font-size: 11px; color: #666; margin-top: 8px;">
              Replied by: ${message.repliedBy || 'Admin'}
            </div>
          </div>
        `;
      }
      
      // Check if user is admin (for display)
      const isUserAdmin = ADMIN_EMAILS.includes(message.userEmail);
      
      div.innerHTML = `
        <div class="message-header">
          <div class="user-info">
            <div class="user-avatar" style="background: ${isUserAdmin ? 'linear-gradient(135deg, #e74c3c, #c0392b)' : 'linear-gradient(135deg, #3498db, #2c3e50)'}">
              ${userInitial}
            </div>
            <div class="user-details">
              <div class="user-name">
                ${message.userName || 'Unknown User'}
                ${isUserAdmin ? '<span class="badge-admin">Admin</span>' : ''}
              </div>
              <div class="user-email">${message.userEmail || 'No email'}</div>
              <div style="font-size: 11px; color: #999; margin-top: 4px;">
                User ID: ${message.uid?.slice(-8) || 'N/A'}
              </div>
            </div>
          </div>
          <div class="message-badges">
            ${typeBadge}
            ${statusBadge}
          </div>
        </div>
        
        <div class="message-subject">
          ${typeIcon} ${message.subject || 'No Subject'}
        </div>
        
        <div class="message-content">
          ${message.content.replace(/\n/g, '<br>')}
        </div>
        
        <div class="message-meta">
          <span>📅 Sent: ${createdAt}</span>
          <span>🆔 Message ID: #${message.id.slice(-8)}</span>
        </div>
        
        ${previousReplyHTML}
        
        <div class="reply-section">
          <textarea 
            class="reply-textarea" 
            id="reply-${message.id}" 
            placeholder="Type your reply here... (Markdown supported)"
          >${message.adminReply || ''}</textarea>
          
          <div class="reply-actions">
            <select class="status-select" id="status-${message.id}">
              <option value="pending" ${message.status === 'pending' ? 'selected' : ''}>⏳ Pending</option>
              <option value="review" ${message.status === 'review' ? 'selected' : ''}>👀 Under Review</option>
              <option value="resolved" ${message.status === 'resolved' ? 'selected' : ''}>✅ Resolved</option>
              <option value="rejected" ${message.status === 'rejected' ? 'selected' : ''}>❌ Rejected</option>
            </select>
            
            <button class="btn btn-small btn-success" onclick="window.replyToMessage('${message.id}')">
              💬 Send Reply
            </button>
            
            <button class="btn btn-small" onclick="window.updateMessageStatus('${message.id}')">
              🔄 Update Status
            </button>
            
            <button class="btn btn-small btn-danger" onclick="window.deleteMessage('${message.id}')">
              🗑️ Delete
            </button>
          </div>
        </div>
      `;
      
      return div;
    }

    // ============ ADMIN ACTIONS ============
    window.replyToMessage = async function(messageId) {
      try {
        const replyTextarea = document.getElementById(`reply-${messageId}`);
        const statusSelect = document.getElementById(`status-${messageId}`);
        const reply = replyTextarea.value.trim();
        const newStatus = statusSelect.value;
        
        if (!reply) {
          showAlert('Please enter a reply message', 'error');
          return;
        }
        
        showDebug('Sending reply', { messageId, status: newStatus });
        
        const messageRef = doc(db, 'adminMessages', messageId);
        await updateDoc(messageRef, {
          adminReply: reply,
          status: newStatus,
          repliedAt: serverTimestamp(),
          repliedBy: auth.currentUser?.email || 'admin',
          updatedAt: serverTimestamp()
        });
        
        showAlert('✅ Reply sent successfully!', 'success');
        
        // Update user's resolved count if status is resolved
        if (newStatus === 'resolved') {
          const messageDoc = await getDoc(messageRef);
          const messageData = messageDoc.data();
          
          if (messageData && messageData.uid) {
            const userRef = doc(db, 'users', messageData.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
              const userData = userDoc.data();
              await updateDoc(userRef, {
                resolvedMessages: (userData.resolvedMessages || 0) + 1,
                updatedAt: serverTimestamp()
              });
              showDebug('User resolved count updated', { userId: messageData.uid });
            }
          }
        }
        
        // Reload messages
        await loadAllMessages();
        showDebug('Reply sent successfully');
        
      } catch (error) {
        console.error('Error replying:', error);
        showDebug('Error sending reply', error.message);
        showAlert('Error sending reply: ' + error.message, 'error');
      }
    };

    window.updateMessageStatus = async function(messageId) {
      try {
        const statusSelect = document.getElementById(`status-${messageId}`);
        const newStatus = statusSelect.value;
        
        showDebug('Updating status', { messageId, newStatus });
        
        const messageRef = doc(db, 'adminMessages', messageId);
        await updateDoc(messageRef, {
          status: newStatus,
          updatedAt: serverTimestamp()
        });
        
        showAlert(`✅ Status updated to ${newStatus}`, 'success');
        
        // Update user's resolved count if resolved
        if (newStatus === 'resolved') {
          const messageDoc = await getDoc(messageRef);
          const messageData = messageDoc.data();
          
          if (messageData && messageData.uid) {
            const userRef = doc(db, 'users', messageData.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
              const userData = userDoc.data();
              await updateDoc(userRef, {
                resolvedMessages: (userData.resolvedMessages || 0) + 1,
                updatedAt: serverTimestamp()
              });
            }
          }
        }
        
        await loadAllMessages();
        
      } catch (error) {
        console.error('Error updating status:', error);
        showDebug('Error updating status', error.message);
        showAlert('Error updating status: ' + error.message, 'error');
      }
    };

    window.deleteMessage = async function(messageId) {
      if (!confirm('⚠️ Are you sure you want to delete this message? This action cannot be undone.')) {
        return;
      }
      
      try {
        showDebug('Deleting message', { messageId });
        
        const messageRef = doc(db, 'adminMessages', messageId);
        await updateDoc(messageRef, {
          status: 'rejected',
          adminReply: 'Message deleted by admin',
          updatedAt: serverTimestamp()
        });
        
        showAlert('✅ Message marked as rejected', 'success');
        await loadAllMessages();
        
      } catch (error) {
        console.error('Error deleting message:', error);
        showDebug('Error deleting message', error.message);
        showAlert('Error deleting message: ' + error.message, 'error');
      }
    };

    // ============ USER FUNCTIONS ============
    async function loadAllUsers() {
      try {
        showDebug('Loading users...');
        
        const q = query(
          collection(db, 'users'),
          orderBy('lastLogin', 'desc'),
          limit(50)
        );
        
        const querySnapshot = await getDocs(q);
        allUsers = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          allUsers.push({
            id: doc.id,
            ...data,
            lastLogin: data.lastLogin?.toDate ? data.lastLogin.toDate() : null,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : null
          });
        });
        
        displayUsers();
        showDebug('Users loaded', { count: allUsers.length });
        
      } catch (error) {
        console.error('Error loading users:', error);
        showDebug('Error loading users', error.message);
        usersList.innerHTML = '<div class="empty-state"><i>👤</i><h3>Error loading users</h3></div>';
      }
    }

    function displayUsers() {
      if (allUsers.length === 0) {
        usersList.innerHTML = '<div class="empty-state"><i>👤</i><h3>No users found</h3></div>';
        return;
      }
      
      usersList.innerHTML = '';
      
      allUsers.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.className = 'user-list-item';
        
        const lastLogin = user.lastLogin ? 
          user.lastLogin.toLocaleDateString() + ' ' + user.lastLogin.toLocaleTimeString() : 
          'Never';
        
        const userMessages = allMessages.filter(m => m.uid === user.id).length;
        const userResolved = allMessages.filter(m => m.uid === user.id && m.status === 'resolved').length;
        
        const isUserAdmin = ADMIN_EMAILS.includes(user.email);
        
        userDiv.innerHTML = `
          <div class="user-list-info">
            <div class="user-avatar-small" style="background: ${isUserAdmin ? '#e74c3c' : '#3498db'};">
              ${user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <div style="font-weight: bold;">
                ${user.displayName || 'Unknown User'}
                ${isUserAdmin ? '<span class="badge-admin">Admin</span>' : ''}
              </div>
              <div style="font-size: 12px; color: #666;">${user.email || 'No email'}</div>
              <div class="user-stats">
                📬 ${userMessages} messages • 
                ✅ ${userResolved} resolved •
                📱 ${user.totalLogins || 0} logins
              </div>
            </div>
          </div>
          <div style="font-size: 11px; color: #999; text-align: right;">
            <div>Last login:</div>
            <div>${lastLogin}</div>
          </div>
        `;
        
        usersList.appendChild(userDiv);
      });
    }

    // ============ EXPORT DATA ============
    function exportMessages() {
      try {
        const dataStr = JSON.stringify(allMessages, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `messages-export-${new Date().toISOString().slice(0,10)}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        showAlert('✅ Data exported successfully', 'success');
      } catch (error) {
        showAlert('Error exporting data: ' + error.message, 'error');
      }
    }

    // ============ MARK ALL AS READ ============
    async function markAllAsRead() {
      if (!confirm('Mark all unread messages as reviewed?')) return;
      
      try {
        const batch = writeBatch(db);
        const unreadMessages = allMessages.filter(m => !m.adminReply);
        
        unreadMessages.forEach(message => {
          const ref = doc(db, 'adminMessages', message.id);
          batch.update(ref, { 
            status: 'review',
            updatedAt: serverTimestamp() 
          });
        });
        
        await batch.commit();
        showAlert(`✅ ${unreadMessages.length} messages marked as reviewed`, 'success');
        await loadAllMessages();
        
      } catch (error) {
        showAlert('Error marking messages: ' + error.message, 'error');
      }
    }

    // ============ CHECK AUTH AND INIT ============
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        showLoading('Verifying admin access...');
        showDebug('User authenticated', { email: user.email });
        
        if (isAdmin(user)) {
          showDebug('Admin access granted');
          updateLoadingProgress(1, 'Loading messages...');
          await loadAllMessages();
          
          updateLoadingProgress(2, 'Loading users...');
          await loadAllUsers();
          
          updateLoadingProgress(3, 'Calculating statistics...');
          updateStats();
          
          updateLoadingProgress(4, 'Initializing filters...');
          
          updateLoadingProgress(5, 'Ready!');
          hideLoading();
          
          showAlert(`Welcome Admin: ${user.email}`, 'success', 3000);
          
        } else {
          showDebug('Access denied - Not admin');
          showAlert('⛔ Access denied. Admin only area.', 'error', 0);
          setTimeout(() => {
            window.location.href = 'profile.html';
          }, 3000);
        }
      } else {
        showDebug('No user authenticated, redirecting...');
        window.location.href = 'index.html';
      }
    });

    // ============ EVENT LISTENERS ============
    // Logout
    logoutBtn.addEventListener('click', async () => {
      try {
        await signOut(auth);
        window.location.href = 'index.html';
      } catch (error) {
        showAlert('Error logging out: ' + error.message, 'error');
      }
    });

    // Refresh messages
    refreshMessagesBtn.addEventListener('click', async () => {
      await loadAllMessages();
      showAlert('Messages refreshed', 'info');
    });

    // Refresh users
    refreshUsersBtn.addEventListener('click', async () => {
      await loadAllUsers();
      showAlert('Users refreshed', 'info');
    });

    // Export data
    if (exportDataBtn) {
      exportDataBtn.addEventListener('click', exportMessages);
    }

    // Mark all as read
    if (markAllReadBtn) {
      markAllReadBtn.addEventListener('click', markAllAsRead);
    }

    // Message tabs
    messageTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        messageTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentFilter = tab.dataset.filter;
        filterAndDisplayMessages();
        showDebug('Filter changed', { filter: currentFilter });
      });
    });

    // Message type filter
    messageTypeFilter.addEventListener('change', (e) => {
      currentTypeFilter = e.target.value;
      filterAndDisplayMessages();
      showDebug('Type filter changed', { type: currentTypeFilter });
    });

    // Search input with debounce
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        currentSearchTerm = e.target.value;
        filterAndDisplayMessages();
        showDebug('Search term', { term: currentSearchTerm });
      }, 500);
    });

    // Add keyboard shortcut for refresh (Ctrl+R)
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        loadAllMessages();
        loadAllUsers();
        showAlert('Refreshed', 'info');
      }
    });

    showDebug('Admin panel initialized');

  </script>
</body>
</html>