  // logic.js

  // ✅ Prevent logged-in users from seeing login page
  if (localStorage.getItem("name")) {
    window.location.href = "dashboard.html";
  }

  // Then your login/signup logic follows...
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    // ...
  });
  document.getElementById("loginForm").addEventListener("submit", function (e) { 
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const storedUser = JSON.parse(localStorage.getItem("skillexa-user"));

    if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
      alert("Invalid credentials!");
      return;
    }

    // ✅ Set session values properly
    localStorage.setItem("name", storedUser.name);
    localStorage.setItem("email", storedUser.email);
    localStorage.setItem("plan", storedUser.plan || "Free");

    alert("Login successful! Redirecting...");
    window.location.href = "dashboard.html";
  });
