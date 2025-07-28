// signup.js
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

document.getElementById("signupForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const agree = document.getElementById("agreeTerms");

  if (!name || !email || !password) {
    alert("Please fill all fields.");
    return;
  }

  if (!agree.checked) {
    alert("Please agree to the Terms & Conditions before signing up.");
    return;
  }

  const auth = getAuth();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {
      displayName: name
    });

    // Save extra data to localStorage
    localStorage.setItem("skillexa-user", JSON.stringify({
      name: name,
      email: email,
      plan: "freemium"
    }));

    alert("Signup successful!");
    window.location.href = "login.html";
  } catch (error) {
    console.error("Signup Error:", error.message);
    alert(error.message);
  }
});
