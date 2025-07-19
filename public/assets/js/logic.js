document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const storedUser = JSON.parse(localStorage.getItem("skillexa-user"));

  if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
    alert("Invalid credentials!");
    return;
  }

  localStorage.setItem("skillexa-user", JSON.stringify(storedUser));
  alert("Login successful! Redirecting...");
  window.location.href = "dashboard.html";
});
