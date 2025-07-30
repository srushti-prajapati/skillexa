
document.addEventListener("DOMContentLoaded", () => {
  // 🔐 Redirect if user is not logged in
if (!localStorage.getItem("name")) {
  alert("Please log in first!");
  window.location.href = "signup-login.html"; // or "login.html"
}
  // Get user data from localStorage
  const userName = localStorage.getItem("name") || "User";
  const userPlan = localStorage.getItem("plan") || "Free";

  // Show name and plan on dashboard
  const nameElement = document.getElementById("userName");
  const planElement = document.getElementById("userPlan");

  if (nameElement) nameElement.textContent = userName;
  if (planElement) planElement.textContent = userPlan;

  // Sample progress for each skill
  const skills = [
    { name: "Leadership", progress: 80 },
    { name: "Data Science", progress: 40 },
    { name: "Programming", progress: 65 },
    { name: "Business Communication", progress: 100 },
    { name: "Creative Writing", progress: 50 },
    { name: "Public Speaking", progress: 30 }
  ];

  const skillList = document.getElementById("skillList");

  if (skillList) {
    skills.forEach(skill => {
      const card = document.createElement("div");
      card.className = "bg-white bg-opacity-10 p-4 rounded-xl shadow-md";

      card.innerHTML = `
        <h3 class="text-lg font-bold mb-2">${skill.name}</h3>
        <div class="w-full bg-gray-300 rounded-full h-4 mb-2 overflow-hidden">
          <div class="bg-green-500 h-4 rounded-full transition-all duration-500" style="width: ${skill.progress}%"></div>
        </div>
        <p>${skill.progress}% completed</p>
        ${
          skill.progress === 100
            ? `<a href="certificate.html?skill=${encodeURIComponent(skill.name)}" class="text-sm text-blue-300 underline mt-2 block">View Certificate</a>`
            : ""
        }
      `;
      skillList.appendChild(card);
    });
  }

  // Logout function
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("plan");
      window.location.href = "signup-login.html";
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const visitedSkills = JSON.parse(localStorage.getItem("visitedSkills")) || [];

  const totalSkillCount = 45; // Adjust as needed
  const percent = Math.round((visitedSkills.length / totalSkillCount) * 100);
  document.getElementById("progressFill").style.width = `${percent}%`;
  document.getElementById("progressText").textContent = `${percent}%`;

  const list = document.getElementById("visitedSkillsList");
  if (visitedSkills.length === 0) {
    list.innerHTML = `<li class="text-gray-400">No skills started yet.</li>`;
  } else {
    visitedSkills.forEach(skill => {
      const li = document.createElement("li");
      li.textContent = skill.charAt(0).toUpperCase() + skill.slice(1);
      list.appendChild(li);
    });
  }

  // Also update header stats if IDs exist
  const enrolledCount = document.getElementById("enrolled-count");
  const completedCount = document.getElementById("completed-count");
  const hoursSpent = document.getElementById("hours-spent");

  if (enrolledCount) enrolledCount.textContent = visitedSkills.length;
  if (completedCount) completedCount.textContent = visitedSkills.length;
  if (hoursSpent) hoursSpent.textContent = (visitedSkills.length * 0.5).toFixed(1);
});
