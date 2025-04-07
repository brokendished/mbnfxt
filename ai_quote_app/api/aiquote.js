export default async function handler(req, res) {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ error: "Missing description" });
  }

  try {
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful home appliance repair assistant. Respond like a helpful technician would."
          },
          {
            role: "user",
            content: `The user says: "${description}". What might be the issue and what should they check or expect to pay?`
          }
        ],
        temperature: 0.7
      })
    });

    const data = await completion.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't figure that one out.";

    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong with OpenAI" });
  }
}
