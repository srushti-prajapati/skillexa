import { app } from "./firebase-config.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const auth = getAuth(app);

// ✅ Redirect to dashboard if already logged in
if (localStorage.getItem("name")) {
  window.location.href = "dashboard.html";
}

// ✅ SIGNUP FORM HANDLING
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // ✅ Save session data
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("plan", "Free");

        alert("Signup successful!");
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("Email already in use. Try logging in.");
        } else {
          alert("Signup error: " + error.message);
        }
      });
  });
}

// ✅ LOGIN FORM HANDLING
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // ✅ Set session
        const user = userCredential.user;
        localStorage.setItem("email", user.email);
        localStorage.setItem("name", "User"); // You can replace with Firestore if needed
        localStorage.setItem("plan", "Free");

        alert("Login successful!");
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
          alert("Invalid email or password.");
        } else {
          alert("Login error: " + error.message);
        }
      });
  });
}
