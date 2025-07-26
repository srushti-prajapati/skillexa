document.addEventListener("DOMContentLoaded", () => {
  const userData = JSON.parse(localStorage.getItem("skillexa-user"));
  const isPremium = userData?.plan === "premium";

  if (!userData) {
    alert("Please login first.");
    window.location.href = "login.html";
    return;
  }

  // Get skill name from URL or default to example
  const urlParams = new URLSearchParams(window.location.search);
  const skillName = urlParams.get("skill") || "Communication Skills";

  // Set skill name and description dynamically
  document.getElementById("skillName").textContent = skillName;
  document.getElementById("skillDesc").textContent =
    "Learn and master the skill: " + skillName;

  // Handle AI Judge and Certificate buttons
  if (isPremium) {
    document.getElementById("judgeBtn").classList.remove("locked");
    document.getElementById("judgeBtn").onclick = () => {
      location.href = "judge.html";
    };

    document.getElementById("certBtn").classList.remove("locked");
    document.getElementById("certBtn").onclick = () => {
      localStorage.setItem("completedSkill", skillName); // Save skill for certificate
      location.href = "certificate.html";
    };
  } else {
    document.getElementById("judgeBtn").textContent = "AI Judge (Premium)";
    document.getElementById("certBtn").textContent = "Certificate (Premium)";
  }
});

// Go to tutor page
function goToTutor() {
  location.href = "tutor.html";
}

// Logout function
function logout() {
  localStorage.removeItem("skillexa-user");
  window.location.href = "login.html";
}
document.getElementById("assessBtn").onclick = () => {
  const map = {
    "Communication Skills": "communication-assessment.html",
    "Leadership Skills": "leadership-assessment.html",
    "Public Speaking": "publicspeaking-assessment.html",
    "Interview Preparation": "interviewpreparation-assessment.html",
    // Add more if needed
  };

  const targetPage = map[skill];

  if (targetPage) {
    window.location.href = targetPage;
  } else {
    alert("Assessment not available for this skill yet.");
  }
};
