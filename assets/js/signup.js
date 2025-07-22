document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("Please fill all the fields.");
    return;
  }

  // Send data to Google Sheets via Apps Script Web App
  fetch("https://script.google.com/macros/s/AKfycbwFu3c_73SIevvBTVeuBLkEVrKDj8YrOEb3qDwL8666Udr3I3Z2IYXOxXLScOPY0YLzMQ/exec", {
    method: "POST",
    body: JSON.stringify({
      type: "signup",
      name: name,
      email: email,
      password: password,
      plan: "freemium"
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.text())
  .then(data => {
    alert(data);
    if (data === "Signup successful") {
      window.location.href = "login.html";
    }
  })
  .catch(error => {
    console.error("Error:", error);
    alert("Something went wrong. Please try again later.");
  });
});
