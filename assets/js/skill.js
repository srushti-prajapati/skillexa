document.addEventListener("DOMContentLoaded", () => {
  const userData = JSON.parse(localStorage.getItem("skillexa-user"));
  const isPremium = userData?.plan === "premium";

  if (!userData) {
    alert("Please login first.");
    window.location.href = "login.html";
    return;
  }

  // Set default skill content (if needed)
  document.getElementById("skillName").textContent = "Communication Skills";
  document.getElementById("skillDesc").textContent = "Learn how to communicate clearly and confidently.";

  // Button access control for AI Judge & Certificate
  if (isPremium) {
    document.getElementById("judgeBtn")?.classList.remove("locked");
    document.getElementById("judgeBtn")?.addEventListener("click", () => {
      location.href = "judge.html";
    });

    document.getElementById("certBtn")?.classList.remove("locked");
    document.getElementById("certBtn")?.addEventListener("click", () => {
      location.href = "certificate.html";
    });
  } else {
    document.getElementById("judgeBtn")?.textContent = "AI Judge (Premium)";
    document.getElementById("certBtn")?.textContent = "Certificate (Premium)";
  }

  // Lock premium skill cards if not premium
  document.querySelectorAll(".premium-skill").forEach(skill => {
    if (!isPremium) {
      skill.classList.add("locked");
      skill.innerHTML += `<div class="lock-overlay">🔒 Premium</div>`;
      skill.addEventListener("click", () => {
        alert("This skill is only available to Premium users. Please upgrade.");
        window.location.href = "payment.html";
      });
    }
  });
});

// Go to Tutor
function goToTutor() {
  location.href = "tutor.html";
}

// Logout function
function logout() {
  localStorage.removeItem("skillexa-user");
  window.location.href = "login.html";
}
