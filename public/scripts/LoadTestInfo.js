const loadTestInfo = async (context) => {
    try {
        context.testId = context.rootElement.getAttribute("test-id");        
        const response = await fetch(
            `../tests/test${context.testId}/test${context.testId}Info.json`
        );
        if (!response.ok) throw new Error("HTTP error");
        context.testInfo = await response.json();
        context.questionAmount = context.testInfo["questionsAmount"];
        context.testType = context.testInfo["testType"];
        context.userAvatarPreviewElememt.src = context.testInfo["userAvatar"];
        context.userNamePreviewElememt.innerText = context.testInfo["userName"];
        context.previewGrade.innerText = `${context.testInfo.testGrade} (${context.testInfo.testNumberOfRatings})`
        context.previewRating.innerText = context.testInfo.testRating
        context.previewVisitors.innerText = context.testInfo.testVisitors
        context.previewImage.src = context.testInfo["previewImage"];
        context.previewType.innerText = context.testType;
        context.previewTitle.innerText = context.testInfo["previewTitle"];
        context.headerAltName.innerText = context.testInfo.previewTitle
        context.previewDescription.innerText =
            context.testInfo["previewDescription"];
        context.previewQuestionsAmount.innerText = `${context.questionAmount} вопросов`;
        context.siteTitle.innerText = `Тест ${context.testInfo["previewTitle"]}`;
    } catch (error) {
        console.error("Couldn't load testInfo:", error);
        context.testInfo = [
            {
                id: 0,
                name: "Резервный вопрос",
                image: "./images/default.webp",
                answers: [{ text: "Вариант 1", value: 0 }],
            },
        ];
    }
};
export { loadTestInfo };
