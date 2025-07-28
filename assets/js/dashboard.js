document.addEventListener("DOMContentLoaded", () => {
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
      window.location.href = "login.html";
    });
  }
});
