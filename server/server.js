app.post('/api/chat', async (req, res) => {
  const userPrompt = req.body.prompt;

  try {
    const response = await axios({
      method: 'post',
      url: 'https://api-inference.huggingface.co/models/gpt2',
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        'Content-Type': 'application/json'
      },
      data: {
        inputs: userPrompt
      }
    });

    const reply = response.data[0]?.generated_text || "The bot didn't say anything.";
    res.json({ reply });

  } catch (err) {
    console.error("Chatbot error:", err.response?.status, err.response?.data || err.message);
    res.status(500).json({ reply: "Sorry, the travel bot is on a break." });
  }
});
