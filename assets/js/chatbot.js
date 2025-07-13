// assets/js/chatbot.js
document.getElementById("sendBtn").addEventListener("click", async () => {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("You", message, "user");
  input.value = "";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY || "sk-REPLACEME"}`, // fallback for local dev
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, something went wrong!";
    appendMessage("Skillexa", reply, "bot");
  } catch (err) {
    appendMessage("Skillexa", "Error connecting to chatbot.", "bot");
    console.error(err);
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
