// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";

// Firebase config
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
const analytics = getAnalytics(app);
