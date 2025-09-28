// signup.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  RecaptchaVerifier,
  PhoneAuthProvider,
  linkWithCredential
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔹 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDvR9KfczfZEqa792GTXX1eGRGz3ial1Vc",
  authDomain: "skillexa-auth.firebaseapp.com",
  projectId: "skillexa-auth",
  storageBucket: "skillexa-auth.appspot.com",
  messagingSenderId: "560797846224",
  appId: "1:560797846224:web:1a7bd6241fb2a8f7aa2cd5"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔹 Setup invisible Recaptcha
window.recaptchaVerifier = new RecaptchaVerifier(
  'recaptcha-container', 
  { size: 'invisible' }, 
  auth
);

// 🔹 Signup form submit
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;
  const mobile = document.getElementById("mobile").value.trim();
  const agree = document.getElementById("agreeTerms");

  // Validation
  if (!name || !email || !password || !mobile) {
    alert("Please fill all fields.");
    return;
  }
  if (!agree.checked) {
    alert("Please agree to the Terms & Conditions.");
    return;
  }

  try {
    // 1️⃣ Create user with email & password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2️⃣ Set display name
    await updateProfile(user, { displayName: name });

    // 3️⃣ Link phone number with OTP verification
    const phoneProvider = new PhoneAuthProvider(auth);
    const verificationId = await phoneProvider.verifyPhoneNumber(
      "+91" + mobile, 
      window.recaptchaVerifier
    );

    const otp = prompt("Enter OTP sent to your mobile:");
    if (!otp) throw new Error("OTP verification cancelled");

    const phoneCredential = PhoneAuthProvider.credential(verificationId, otp);
    await linkWithCredential(user, phoneCredential);

    // 4️⃣ Save extra info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      fullName: name,
      email: email,
      mobile: mobile,
      plan: "Freemium",
      progress: 0
    });

    // 5️⃣ Save info in localStorage
    localStorage.setItem("skillexa-user", JSON.stringify({
      name: name,
      email: email,
      plan: "Freemium",
      mobile: mobile
    }));
    localStorage.setItem("plan", "Freemium");

    alert("Signup successful! ✅");
    window.location.href = "dashboard.html";

  } catch (error) {
    console.error("Signup Error:", error);
    alert("Signup failed: " + error.message);
  }
});
