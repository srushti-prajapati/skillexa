import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDvR9KfczfZEqa792GTXX1eGRGz3ial1Vc",
  authDomain: "skillexa-auth.firebaseapp.com",
  projectId: "skillexa-auth",
  storageBucket: "skillexa-auth.appspot.com",
  messagingSenderId: "560797846224",
  appId: "1:560797846224:web:1a7bd6241fb2a8f7aa2cd5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  try {
    // 1️⃣ Sign in with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2️⃣ Get user data from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    let userData = {};
    if (userDoc.exists()) {
      userData = userDoc.data();
    }

    // 3️⃣ Save all info in localStorage
    localStorage.setItem("skillexa-user", JSON.stringify({
      name: userData.fullName || user.displayName || "User",
      email: user.email,
      plan: userData.plan || "Freemium",
      TEL: userData.TEL || ""
    }));

    localStorage.setItem("plan", userData.plan || "Freemium");

    alert("Login successful!");
    window.location.href = "dashboard.html";

  } catch (error) {
    console.error("Login Error:", error.code, error.message);
    if (error.code === "auth/user-not-found") {
      alert("❌ No user found. Please sign up.");
    } else if (error.code === "auth/wrong-password") {
      alert("❌ Wrong password.");
    } else if (error.code === "auth/invalid-email") {
      alert("❌ Invalid email format.");
    } else {
      alert("❌ Login failed: " + error.message);
    }
  }
});
