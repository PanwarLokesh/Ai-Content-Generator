const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cors(origin='http://localhost:5173'))
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Sentence is required." });
  }
  try {
    const result = await model.generateContent(prompt);
    // console.log(result.response.text());
    res.status(200).json({result:result.response.text()});
  } catch (error) {
    res.status(500).json({
        message:error.message
    })
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
