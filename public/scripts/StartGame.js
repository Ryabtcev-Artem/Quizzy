import Fireworks from "./Fireworks.js";
import ShowTestResults from "./ShowTestResults.js";
import { selectors, stateClasses } from "./GameSelectors.js";
import { init } from "./GameInit.js";
import { loadTestInfo } from "./LoadTestInfo.js";
import { restoreTest, removeTest, checkPrevTest } from "./checkPrevTest.js";
import {
    renderQuestion,
    bindQuestionEvents,
    onAnswerClick,
    onDropClick,
    onModalClick,
    onModalNoClick,
    onModalYesClick,
    onStepBackClick,
    onSubmitClick,
} from "./InGameActions.js";
import LoadTestImages from "./LoadTestImages.js";
class StartGame {
    initQuestion = () => {
        this.questionElement = this.rootElement.querySelector(
            this.selectors.questionElement
        );
        this.questionName = this.questionElement.querySelector(
            this.selectors.questionName
        );
        this.questionImage = this.questionElement.querySelector(
            this.selectors.questionImage
        );
        this.answersWrapper = this.questionElement.querySelector(
            this.selectors.answersWrapper
        );
        this.answers = this.rootElement.querySelector(this.selectors.answers);
        this.submit = this.answers.querySelector(this.selectors.submit);
        this.etap = this.headerAlt.querySelector(this.selectors.etap);
        this.waves = this.testWindow.querySelectorAll(this.selectors.waves);
        this.stepBack = this.headerAlt.querySelector(this.selectors.stepBack);
        this.drop = this.headerAlt.querySelector(this.selectors.drop);
        this.finishElement = this.rootElement.querySelector(
            this.selectors.finishElement
        );
    };
    finishGame = () => {
        this.finishElement.classList.add(this.stateClasses.active);
        this.testWindow.classList.add(this.stateClasses.visuallyHidden);
        new ShowTestResults();
        new Fireworks();
    };
    async loadQuestions() {
        try {
            const response = await fetch(
                `../tests/test${this.testId}/test${this.testId}Questions.json`
            );
            if (!response.ok) throw new Error("HTTP error");
            this.questions = await response.json();
            this.randomQuestions = [];
            this.randomIndexes = [];
            while (this.randomQuestions.length !== this.questionAmount) {
                let randomIndex = Math.floor(
                    Math.random() * this.questionAmount
                );
                let randQuestion = this.questions[randomIndex];
                if (this.randomQuestions.includes(randQuestion)) {
                    continue;
                }
                this.randomIndexes.push(randomIndex);
                this.randomQuestions.push(randQuestion);
            }
            if (!this.testInfo.isRandom){
                this.randomIndexes = []
                this.randomQuestions = []
                for (let i = 0; i < this.questionAmount; i++){
                    let question = this.questions[i]
                    this.randomIndexes.push(i)
                    this.randomQuestions.push(question)
                }
            }
            this.testJson.questionIndexes = this.randomIndexes;
            this.testJson.currentQuestions = this.randomQuestions;
            this.renderQuestion();
        } catch (error) {
            console.error("Couldn't load questions:", error);
            this.questions = [
                {
                    id: 0,
                    name: "Резервный вопрос",
                    image: `./images/default.${this.testJson.testImagesFormat}`,
                    answers: [{ text: "Вариант 1", value: 0 }],
                },
            ];
            this.renderQuestion();
        }
    }
    clear = () => {
        clearInterval(this.pretestInterval);
        this.pretestMessages[this.currentMessageIndex].classList.add(
            this.stateClasses.visuallyHidden
        );
        this.pretestLoader.classList.remove(this.stateClasses.active);
        this.header.classList.add(this.stateClasses.visuallyHidden);
        this.headerAlt.classList.remove(this.stateClasses.visuallyHidden);
        this.rootElement.classList.add(this.stateClasses.gameStarted);
        this.testWindow.classList.remove(this.stateClasses.visuallyHidden);
        this.testPreview.classList.add(this.stateClasses.jumpAndHide);
    };
    showRandomMessage = () => {
        if (this.currentMessageIndex !== undefined) {
            this.pretestMessages[this.currentMessageIndex].classList.add(
                this.stateClasses.visuallyHidden
            );
        }
        if (this.allMessageIndexes.length === this.pretestMessages.length) {
            this.allMessageIndexes = [];
        }
        this.currentMessageIndex = Math.floor(
            Math.random() * this.pretestMessages.length
        );
        while (this.allMessageIndexes.includes(this.currentMessageIndex)) {
            this.currentMessageIndex = Math.floor(
                Math.random() * this.pretestMessages.length
            );
        }
        this.allMessageIndexes.push(this.currentMessageIndex);
        this.pretestMessages[this.currentMessageIndex].classList.remove(
            this.stateClasses.visuallyHidden
        );
    };
    pretestLoading = async () => {
        this.pretestInterval = setInterval(this.showRandomMessage, 1100);
        this.loader = new LoadTestImages()
        this.loadedImages = await this.loader.loadImages()
        this.clear()
    };
    pretestInit = () => {
        this.renderQuestion = () => renderQuestion(this);
        this.bindQuestionEvents = () => bindQuestionEvents(this);
        this.onAnswerClick = () => onAnswerClick(event, this);
        this.onDropClick = () => onDropClick(this);
        this.onModalClick = () => onModalClick(event, this);
        this.onModalNoClick = () => onModalNoClick(this);
        this.onModalYesClick = () => onModalYesClick(this);
        this.onStepBackClick = () => onStepBackClick(this);
        this.onSubmitClick = () => onSubmitClick(this);
    };
    setAnswerPictures = () => {
        this.allAnswers = this.testInfo.allAnswers;
        this.allPictureAnswers = {};
        this.testId = this.testInfo.testId;
        this.questionsAmount = this.testInfo.questionsAmount;
        for (let i = 0; i < this.questionsAmount; i++) {
            this.allPictureAnswers[this.allAnswers[i]] = `./images/tests/test-${
                this.testId
            }/answer-${i + 1}.${this.testInfo.imagesFormat}`;
        }
    };
    startPretest = () => {
        this.currentQuestionIndex = 0;
        this.totestElement.classList.add(this.stateClasses.collapse);
        this.shareElement.classList.add(this.stateClasses.collapse);
        this.pretestLoader.classList.add(this.stateClasses.active);
        this.setAnswerPictures();
        this.randomIndex = Math.floor(Math.random() * this.testInfo.questionsAmount)
        this.testJson = {
            currentQuestionIndex: 0,
            currentQuestions: null,
            currentAnswers: [],
            testTitle: this.testInfo.previewTitle,
            testType: this.testInfo.testType,
            testAuthorName: this.testInfo.userName,
            testAuthorAvatar: this.testInfo.userAvatar,
            allAnswers: this.allPictureAnswers,
            testPassDate: 0,
            resultText: this.testInfo.fullAnswers[this.randomIndex],
            resultTitle: this.testInfo.allAnswers[this.randomIndex],
            questionsAmount: this.testInfo.questionsAmount,
            testId: this.testInfo.testId,
            questionIndexes: "",
            isTestCompleted: false,
            testImagesFormat: this.testInfo.imagesFormat,

        };
        this.allMessageIndexes = [];
        this.showRandomMessage();
        this.initQuestion();
        this.pretestLoading();
        this.pretestInit();
        this.loadQuestions();
    };
    bindEvents = () => {
        this.startGameButton.addEventListener("click", this.startPretest);
    };
    constructor() {
        this.selectors = selectors;
        this.stateClasses = stateClasses;
        this.rootElement = document.querySelector(this.selectors.rootElement);
        this.startGameButton = this.rootElement.querySelector(
            this.selectors.startGameButton
        );
        init(this);
        loadTestInfo(this);
        this.checkPrevTest = () => checkPrevTest(this);
        this.restoreTest = () => restoreTest(this);
        this.removeTest = () => removeTest(this);
        this.bindEvents();
        this.checkPrevTest();
    }
}
export default StartGame;
