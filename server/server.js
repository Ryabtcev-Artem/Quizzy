const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.post("/api/deepseek", async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "deepseek/deepseek-chat-v3-0324:free",
                messages: [{ role: "user", content: prompt }],
            },
            {
                headers: {
                    Authorization: `Bearer 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`,
                    "Content-Type": "application/json",
                },
            }
        );
        res.json({
            success: true,
            answer: response.data.choices[0].message.content,
        });
    } catch (error) {
        const status = error.response?.status || 500;
        const messageFromAPI =
            error.response?.data?.error?.message ||
            "Не удалось обработать запрос";

        console.error("Ошибка:", {
            status,
            message: messageFromAPI,
        });

        res.status(status).json({
            success: false,
            error: messageFromAPI,
        });
    }
});

app.listen(3000, () => console.log("Сервер запущен на http://localhost:3000"));
