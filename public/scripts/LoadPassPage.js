class LoadPassPage {
    selectors = {
        body: "body",
        rootElement: "[data-js-test-pass]",
        pageTitle: "title",
        passTitle: "[data-js-test-pass-title]",
        passDate: "[data-js-test-pass-date]",
        passType: "[data-js-test-pass-type]",
        passAuthor: "[data-js-test-pass-author]",
        passResultImage: "[data-js-test-pass-result-image]",
        passResultTitle: "[data-js-test-pass-result-title]",
        passResultDescription: "[data-js-test-pass-result-description]",
        passResultAnswers: "[data-js-test-pass-answers]",
        passToTest: '[data-js-test-pass-to-test]',
        passResults: '[data-js-test-pass-result]',
    };
    init = () => {
        this.body = document.querySelector(this.selectors.body);
        this.rootElement = this.body.querySelector(this.selectors.rootElement);
        this.passTitle = this.rootElement.querySelector(
            this.selectors.passTitle
        );
        this.passDate = this.rootElement.querySelector(this.selectors.passDate);
        this.passType = this.rootElement.querySelector(this.selectors.passType);
        this.passAuthor = this.rootElement.querySelector(
            this.selectors.passAuthor
        );
        this.passResultImage = this.rootElement.querySelector(
            this.selectors.passResultImage
        );
        this.passResultTitle = this.rootElement.querySelector(
            this.selectors.passResultTitle
        );
        this.passResultDescription = this.rootElement.querySelector(
            this.selectors.passResultDescription
        );
        this.passResultAnswers = this.rootElement.querySelector(
            this.selectors.passResultAnswers
        );
        this.passToTest = this.rootElement.querySelector(this.selectors.passToTest)
        this.passResults = this.rootElement.querySelector(this.selectors.passResults)
    };
    setTestValues = () => {
        document.querySelector(
            this.selectors.pageTitle
        ).innerText = `Прохождение ${this.testInfo.testTitle}`;

        this.passTitle.innerText = this.testInfo.testTitle;
        this.passDate.innerText = this.testInfo.testPassDate;
        this.passType.innerText = this.testInfo.testType;
        this.passAuthor.innerText = this.testInfo.testAuthorName;
        this.passResultImage.src =
            this.testInfo.allAnswers[this.testInfo.resultTitle];
        this.passResultTitle.innerText = this.testInfo.resultTitle;
        this.passResultDescription.innerText = this.testInfo.resultText;
        this.allQuestions = "";
        for (let i = 0; i < this.testInfo.currentAnswers.length; i++) {
            this.allQuestions += `
            <div class="test-pass__answer">
            <img
                class="test-pass__answer__image"
                width="260"
                height="260"
                src="./images/tests/test-${this.testId}/question-${
                    this.testInfo.questionIndexes[i] + 1
                }.${this.testImagesFormat}"
                alt=""
            />
            <p class="test-pass__answer__question white">
                <span class="light-gray">Вопрос #${i + 1}: </span>${
                this.testInfo.currentAnswers[i][0]
            }
            </p>
            <p class="test-pass__answer__user-answer white">
                <span class="light-gray">Вы ответили: </span>
                ${this.testInfo.currentAnswers[i][1]}
            </p>
            </div>
        `;
        }
        this.passResults.style.backgroundImage = `url(../../images/tests/test-${this.testId}/answers-bg.webp)`
        this.passToTest.href = `./tests-${this.testId}.html`
        this.passResultAnswers.innerHTML = this.allQuestions;
    };
    loadTestInfo = () => {
        this.testId = this.body.getAttribute('test-id')
        this.testInfo = JSON.parse(localStorage.getItem(`test${this.testId}Data`));
        this.testImagesFormat = this.testInfo.testImagesFormat
        this.allAnswers = this.testInfo.allAnswers;
        this.userAnswers = this.testInfo.currentAnswers;
        this.setTestValues();
    };
    constructor() {
        this.init();
        this.loadTestInfo();
    }
}

export default LoadPassPage;
