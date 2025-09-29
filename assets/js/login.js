// login.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  getDoc 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔑 Firebase config (same as signup.js)
const firebaseConfig = {
  apiKey: "AIzaSyDvR9KfczfZEqa792GTXX1eGRGz3ial1Vc",
  authDomain: "skillexa-auth.firebaseapp.com",
  projectId: "skillexa-auth",
  storageBucket: "skillexa-auth.appspot.com",
  messagingSenderId: "560797846224",
  appId: "1:560797846224:web:1a7bd6241fb2a8f7aa2cd5"
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Login form handler
document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  try {
    // 1️⃣ Login user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2️⃣ Fetch user details from Firestore
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();

      // Save in localStorage
      localStorage.setItem("skillexa-user", JSON.stringify(userData));

      alert("Login successful!");
      window.location.href = "dashboard.html";
    } else {
      alert("User logged in but no details found in Firestore.");
    }
  } catch (error) {
    console.error("Login Error:", error.message);
    alert("Login failed: " + error.message);
  }
});
