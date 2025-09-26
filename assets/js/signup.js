// signup.js
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"; // ✅ Firestore import

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
const db = getFirestore(app); // ✅ Initialize Firestore

document.getElementById("signupForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;
  const mobile = document.getElementById("mobile").value.trim(); // ✅ Get mobile number
  const agree = document.getElementById("agreeTerms");

  // Validation
  if (!name || !email || !password || !mobile) {
    alert("Please fill all fields.");
    return;
  }

  if (!agree.checked) {
    alert("Please agree to the Terms & Conditions before signing up.");
    return;
  }

  try {
    // 1️⃣ Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2️⃣ Set display name in Auth
    await updateProfile(user, { displayName: name });

    // 3️⃣ Save additional info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      fullName: name,
      email: email,
      TEL: mobile,     // mobile number as string
      plan: "Freemium",
      progress: 0
    });

    // 4️⃣ Save in localStorage
    localStorage.setItem("skillexa-user", JSON.stringify({
      name: name,
      email: email,
      plan: "Freemium",
      TEL: mobile
    }));
    localStorage.setItem("plan", "Freemium");

    alert("Signup successful!");
    window.location.href = "dashboard.html"; // Redirect after signup
  } catch (error) {
    console.error("Signup Error:", error.message);
    alert("Signup failed: " + error.message);
  }
});
