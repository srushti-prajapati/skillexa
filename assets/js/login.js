document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  // Google Apps Script Web App URL (Your deployed endpoint)
  const scriptURL = "https://script.google.com/macros/s/AKfycbwFu3c_73SIevvBTVeuBLkEVrKDj8YrOEb3qDwL8666Udr3I3Z2IYXOxXLScOPY0YLzMQ/exec";

  fetch(scriptURL)
    .then(res => res.json())
    .then(data => {
      const user = data.find(u => u.email === email && u.password === password);

      if (user) {
        // Save to localStorage
        localStorage.setItem("skillexa-user", JSON.stringify(user));
        alert("Login successful! Redirecting to dashboard...");
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid email or password. Please try again.");
      }
    })
    .catch(err => {
      console.error("Error during login:", err);
      alert("Error connecting to server. Please try again later.");
    });
});
