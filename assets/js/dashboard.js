document.addEventListener("DOMContentLoaded", () => {
  const userData = JSON.parse(localStorage.getItem("skillexa-user"));
  const userName = document.getElementById("userName");

  if (!userData) {
    alert("Please login first.");
    window.location.href = "login.html";
  } else {
    userName.textContent = userData.name.split(" ")[0];
  }
});

function logout() {
  localStorage.removeItem("skillexa-user");
  alert("Logged out successfully!");
  window.location.href = "login.html";
}
