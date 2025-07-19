document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("Please fill all the fields.");
    return;
  }

  const user = {
    name,
    email,
    password,         // (Optional: you can remove this for security)
    plan: "freemium"  // default plan
  };

  localStorage.setItem("skillexa-user", JSON.stringify(user));
  alert("Signup successful! Redirecting to dashboard...");
  window.location.href = "dashboard.html";
});
