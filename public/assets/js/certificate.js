document.addEventListener("DOMContentLoaded", () => {
  const userData = JSON.parse(localStorage.getItem("skillexa-user"));
  const canvas = document.getElementById("certificateCanvas");
  const ctx = canvas.getContext("2d");

  const bgImage = new Image();
  bgImage.src = "assets/images/Skillexa_Certificate.jpg"; // ✅ Your certificate image

  bgImage.onload = () => {
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#1f2937";
    ctx.font = "bold 32px Poppins";
    ctx.textAlign = "center";

    // 🧑 User name
    const name = userData?.name || "Skillexa Learner";
    ctx.fillText(name, canvas.width / 2, 260);

    // 🧠 Skill name
    const skillName = localStorage.getItem("completedSkill") || "a skill";
    ctx.font = "bold 24px Poppins";
    ctx.fillText(`For successfully completing ${skillName}`, canvas.width / 2, 320);
  };

  document.getElementById("downloadBtn").addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "Skillexa_Certificate.jpg";
    link.href = canvas.toDataURL("image/jpeg");
    link.click();
  });
});
