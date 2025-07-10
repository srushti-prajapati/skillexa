document.addEventListener("DOMContentLoaded", () => {
  const userData = JSON.parse(localStorage.getItem("skillexa-user"));
  const isPremium = userData?.plan === "premium";

  if (!userData) {
    alert("Please login first.");
    window.location.href = "login.html";
  }

  document.getElementById("skillName").textContent = "Communication Skills";
  document.getElementById("skillDesc").textContent = "Learn how to communicate clearly and confidently.";

  if (isPremium) {
    document.getElementById("judgeBtn").classList.remove("locked");
    document.getElementById("judgeBtn").onclick = () => location.href = "judge.html";

    document.getElementById("certBtn").classList.remove("locked");
    document.getElementById("certBtn").onclick = () => location.href = "certificate.html";
  } else {
    document.getElementById("judgeBtn").textContent = "AI Judge (Premium)";
    document.getElementById("certBtn").textContent = "Certificate (Premium)";
  }
});

function goToTutor() {
  location.href = "tutor.html";
}

function logout() {
  localStorage.removeItem("skillexa-user");
  window.location.href = "login.html";
}
