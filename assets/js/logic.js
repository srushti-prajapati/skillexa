function loginUser(event) {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  const name = email.split("@")[0];
  const user = {
    name: name.charAt(0).toUpperCase() + name.slice(1),
    email: email,
    plan: "free" // Default plan
  };
  localStorage.setItem("skillexa_user", JSON.stringify(user));
  window.location.href = "dashboard.html";
}

function getUser() {
  return JSON.parse(localStorage.getItem("skillexa_user"));
}

function logout() {
  localStorage.removeItem("skillexa_user");
  window.location.href = "login.html";
}
