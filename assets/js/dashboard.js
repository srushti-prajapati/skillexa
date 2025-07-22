document.addEventListener("DOMContentLoaded", function () {
  const plan = localStorage.getItem("userPlan"); // freemium or premium
  const skillCards = document.querySelectorAll(".skill-card");

  skillCards.forEach((card, index) => {
    const lockOverlay = document.createElement("div");
    lockOverlay.classList.add("lock-overlay");

    if (plan === "premium") {
      // Premium user: all skills unlocked
      return; // skip locking
    } else {
      // Freemium: only first skill unlocked
      if (index !== 0) {
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
