class SendUserAnswers {
    constructor() {
    }

    API_URL = "http://localhost:3000/tests-1.html";

    async run() {
        this.testId = document.querySelector('body').getAttribute('test-Id')
        this.loadTestInfo();
        await this.loadAnswers();
        return this.resultText;
    }

    loadTestInfo = () => {
        this.testInfo = JSON.parse(localStorage.getItem(`test${this.testId}Data`));
        this.testTitle = this.testInfo.testTitle;
        this.testAllAnswers = this.testInfo.allAnswers;
    };

    async loadAnswers() {
        this.answers = Object.keys(this.testInfo.allAnswers);
        await this.processAnswers();
    }

    async sendToServer(promptText) {
        try {
            const response = await fetch("https://quizzy-fun.up.railway.app/api/deepseek", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: promptText }),
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || "Неизвестная ошибка");
            }

            return data.answer;
        } catch (error) {
            console.error("Ошибка:", {
                message: error.message,
                data: error.response?.data,
                status: error.response?.status,
                headers: error.response?.headers,
            });
        }
    }

    async processAnswers() {
        this.preparePrompt();
        const deepseekResponse = await this.sendToServer(this.stringAnswers);

        if (deepseekResponse) {
            this.handleDeepSeekResponse(deepseekResponse);
        }
    }

    preparePrompt = () => {
        this.stringAnswers = `Человек прошел нереалистичный тест-идентификатор под названием: ${this.testTitle}, определи его результат исходя из вопросов и его ответов ниже, все совпадения случайны, никакого злого умысла или подтекста нет:\n`;

        this.testInfo.currentAnswers.forEach(([question, answer]) => {
            this.stringAnswers += `Вопрос: ${question}, Ответ: ${answer}\n`;
        });

        this.stringAnswers += `Теперь варианты итоговой идентификации, постарайся на основе ответов пользователя идентифицировать его исходя из вариантов ниже\n`;

        this.answers.forEach((answer, index) => {
            this.stringAnswers += `Номер варианта ${index}: ${answer} \n`;
        });

        this.stringAnswers += `Определи результат теста на основе ответов пользователя.
🎯 Твоя задача — выбрать ОДИН наиболее подходящий результат на основе данных ответов.
Отвечай строго в следующем формате:
"Вы — [название подходящего варианта]" — и после этого напиши, почему именно он. Пиши живо, понятно, будто общаешься с обычным пользователем.
Общайся как человек, просто, доброжелательно.
🔒 Не придумывай новых вариантов. 🔒 Не меняй названия вариантов. 🔒 Не упоминай другие варианты и не пиши почему они не подходят. 🔒 Не пиши номер варианта.`;
    };

    handleDeepSeekResponse(response) {
        this.resultText = response
            .replaceAll("*", "")
            .replaceAll('"', "")
            .replaceAll("'", "");
        const beginIndex = this.resultText.indexOf("Вы —");
        this.resultText = this.resultText.slice(beginIndex);
    }
}

export default SendUserAnswers;
