// backend server that powers the chatbot feature and API connection to Hugging Face
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 3000;

// set up middleware
app.use(cors());
app.use(express.json());

// simple route that listens for POSTs from the frontend and hits Hugging Face model
app.post('/api/chat', async (req, res) => {
  const userPrompt = req.body.prompt;

  try {
    const hfResponse = await axios.post(
      'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
      { inputs: userPrompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`
        }
      }
    );

    // get the AI's generated text
    const generatedText = hfResponse.data.generated_text || hfResponse.data[0]?.generated_text;
    res.json({ reply: generatedText });

  } catch (err) {
    console.error('Chatbot error:', err.message);
    res.status(500).json({ reply: "Sorry, the travel bot is on a break." });
  }
});

// listen on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
