const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore"); // You might need other Firebase services as well

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeOOK-Eo4larA2PjFNPbK1fcbJ7MjQ5HQ",
  authDomain: "pass-41255.firebaseapp.com",
  projectId: "pass-41255",
  storageBucket: "pass-41255.appspot.com",
  messagingSenderId: "547495753227",
  appId: "1:547495753227:web:05e894ee26bb6b19ac390e",
  measurementId: "G-183MJ7TVPR",
};

// Initialize your Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to Firestore (optional)
// const firestore = getFirestore(firebaseApp);

module.exports = firebaseApp;
