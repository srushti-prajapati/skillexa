// signup.js
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyDvR9KfczfZEqa792GTXX1eGRGz3ial1Vc",
  authDomain: "skillexa-auth.firebaseapp.com",
  projectId: "skillexa-auth",
  storageBucket: "skillexa-auth.appspot.com",
  messagingSenderId: "560797846224",
  appId: "1:560797846224:web:1a7bd6241fb2a8f7aa2cd5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("signupForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;
  const agree = document.getElementById("agreeTerms");

  if (!name || !email || !password) {
    alert("Please fill all fields.");
    return;
  }

  if (!agree.checked) {
    alert("Please agree to the Terms & Conditions before signing up.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {
      displayName: name
    });

    localStorage.setItem("skillexa-user", JSON.stringify({
      name: name,
      email: email,
      plan: "Freemium"
    }));
    localStorage.setItem("plan", "Freemium");

    alert("Signup successful!");
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error("Signup Error:", error.message);
    alert("Signup failed: " + error.message);
  }
});
