import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDKqOdfbVgw-jYxr92D1JiL8URgpPlp9MI",
  authDomain: "musicplayer-f71a2.firebaseapp.com",
  projectId: "musicplayer-f71a2",
  storageBucket: "musicplayer-f71a2.appspot.com",
  messagingSenderId: "613878986587",
  appId: "1:613878986587:web:5c07e11ef4a1ff12c0cc7e",
  measurementId: "G-ZV5WGWRC4T"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);