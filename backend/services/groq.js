const Groq = require('groq-sdk');
require("dotenv").config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getGroqRes(prompt) {
    const chatCompletion = await getGroqChatCompletion(prompt);
    // Print the completion returned by the LLM.
    const res = chatCompletion.choices[0]?.message?.content;
    return res;
}

async function getGroqChatCompletion(prompt) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: prompt || "Explain the importance of fast language models",
            },
        ],
        model: "llama-3.3-70b-versatile",
    });
}

module.exports = {getGroqRes};