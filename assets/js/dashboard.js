document.addEventListener("DOMContentLoaded", function () {
  const plan = localStorage.getItem("userPlan"); // freemium or premium
  const skillCards = document.querySelectorAll(".skill-card");

  skillCards.forEach((card, index) => {
    const skillName = card.getAttribute("data-skill");

    if (plan === "premium" || plan === "all") {
      // All skills unlocked
      card.addEventListener("click", () => {
        localStorage.setItem("completedSkill", skillName);
        window.location.href = "skill.html";
      });
    } else {
      // Freemium: only first skill is clickable
      if (index === 0) {
        card.addEventListener("click", () => {
          localStorage.setItem("completedSkill", skillName);
          window.location.href = "skill.html";
        });
      } else {
        // Lock all other skills
        const lockOverlay = document.createElement("div");
        lockOverlay.classList.add("lock-overlay");
        lockOverlay.innerHTML = `<div class="locked">🔒 Locked</div>`;
        card.classList.add("locked-skill");
        card.appendChild(lockOverlay);

        card.addEventListener("click", () => {
          alert("This skill is available only in the premium plan!");
        });
      }
    }
  });
});
