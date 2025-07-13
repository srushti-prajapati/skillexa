document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const userData = {
      name,
      email,
      password,
      plan: "free", // default
    };

    localStorage.setItem("skillexa-user", JSON.stringify(userData));
    alert("Signup successful!");
    window.location.href = "dashboard.html";
  });
});
