// dashboard.js

// Load username from localStorage
const user = localStorage.getItem("username") || "User";
document.getElementById("userName").textContent = user;

// Example skills data (you can later fetch from a real DB or API)
const skills = [
  { title: "Communication", description: "Improve your speaking skills", link: "skill.html?skill=communication" },
  { title: "Python Programming", description: "Learn Python basics to advanced", link: "skill.html?skill=python" },
  { title: "Web Development", description: "Build websites from scratch", link: "skill.html?skill=web" },
  { title: "Problem Solving", description: "Crack logical & aptitude tests", link: "skill.html?skill=problem-solving" },
  { title: "Leadership", description: "Become a great leader", link: "skill.html?skill=leadership" },
  { title: "Emotional Intelligence", description: "Master your emotions", link: "skill.html?skill=emotional" }
];

// Render skill cards
const skillsContainer = document.getElementById("skillsContainer");

skills.forEach(skill => {
  const card = document.createElement("div");
  card.className = "bg-white shadow rounded-xl p-5 hover:shadow-lg transition";

  card.innerHTML = `
    <h3 class="text-lg font-semibold text-indigo-600">${skill.title}</h3>
    <p class="text-sm text-gray-600 my-2">${skill.description}</p>
    <a href="${skill.link}" class="inline-block mt-2 text-sm bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600">
      Explore
    </a>
  `;

  skillsContainer.appendChild(card);
});
let userProgress = {
  username: "Sru",
  skills: {
    "Communication Skills": {
      progress: 70,
      certified: false
    },
    "Decision Making": {
      progress: 100,
      certified: true
    }
  }
};
localStorage.setItem("userProgress", JSON.stringify(userProgress));

// Logout function
function logout() {
  localStorage.removeItem("username");
  window.location.href = "login.html";
}
