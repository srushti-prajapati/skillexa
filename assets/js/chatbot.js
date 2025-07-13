document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chatForm");
  const userInput = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");

  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage("You", message);
    userInput.value = "";

    appendMessage("Skillexa", "Typing...");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      const botReply = data.reply || "No response";
      updateLastMessage("Skillexa", botReply);
    } catch (err) {
      updateLastMessage("Skillexa", "Error getting response.");
    }
  });

  function appendMessage(sender, text) {
    const msg = document.createElement("div");
    msg.className = "mb-2";
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function updateLastMessage(sender, text) {
    const msgs = chatBox.querySelectorAll("div");
    if (msgs.length > 0) msgs[msgs.length - 1].innerHTML = `<strong>${sender}:</strong> ${text}`;
  }
});
