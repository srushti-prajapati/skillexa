export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  const { message } = await req.json();
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const chatResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }]
    })
  });

  const data = await chatResponse.json();
  const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't reply.";

  return new Response(JSON.stringify({ reply }), {
    headers: { "Content-Type": "application/json" },
    status: 200
  });
}
