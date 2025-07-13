// assets/js/chatbot.js
document.getElementById("sendBtn").addEventListener("click", async () => {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("You", message, "user");
  input.value = "";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    const reply = data.reply || "No response";
    appendMessage("Skillexa", reply, "bot");
  } catch (error) {
    appendMessage("Skillexa", "Failed to connect to chatbot.", "bot");
  }
});

function appendMessage(sender, text, cls) {
  const chatlog = document.getElementById("chatlog");
  const div = document.createElement("div");
  div.className = `message ${cls}`;
  div.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatlog.appendChild(div);
  chatlog.scrollTop = chatlog.scrollHeight;
}
