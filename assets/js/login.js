// login.js
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  const auth = getAuth();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    localStorage.setItem("skillexa-user", JSON.stringify({
      name: user.displayName || "User",
      email: user.email,
      plan: "freemium"
    }));

    alert("Login successful!");
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error("Login Error:", error.message);
    alert("Invalid email or password.");
  }
});
