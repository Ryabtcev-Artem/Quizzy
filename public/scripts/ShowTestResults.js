import SendUserAnswers from "./SendUserAnswers.js";
class ShowTestResults {
    selectors = {
        rootElement: "body",
        toResultButton: "[data-js-to-result]",
        finishElement: "[data-js-finish]",
        finishContent: "[data-js-finish-content]",
        finishContentLoading: "[data-js-finish-content-loading]",
        finishContentLoadingMessages:
            "[data-js-finish-content-loading-messages]",
        pretestMessage: "[data-js-pretest-message]",
        pageTitle: "title",
        finishContentLoadingLogo: "[data-js-finish-content-loading-logo]",
        finishUserName: '[data-js-finish-user-name]',
        finishUserAvatar: '[data-js-finish-user-avatar]',
    };
    stateClasses = {
        active: "active",
        visuallyHidden: "visually-hidden",
        activated: "activated",
    };
    init = () => {
        this.rootElement = document.querySelector(this.selectors.rootElement);
        this.toResultButton = this.rootElement.querySelector(
            this.selectors.toResultButton
        );
        this.finishElement = this.rootElement.querySelector(
            this.selectors.finishElement
        );
        this.finishContent = this.finishElement.querySelector(
            this.selectors.finishContent
        );
        this.finishContentLoading = this.finishElement.querySelector(
            this.selectors.finishContentLoading
        );
        this.finishContentLoadingMessages = this.finishElement.querySelector(
            this.selectors.finishContentLoadingMessages
        );
        this.pretestMessages = this.rootElement.querySelectorAll(
            this.selectors.pretestMessage
        );
        this.finishContentLoadingLogo = this.finishContentLoading.querySelector(
            this.selectors.finishContentLoadingLogo
        );
        this.finishUserName = this.finishContent.querySelector(this.selectors.finishUserName)
        this.finishUserAvatar = this.finishContent.querySelector(this.selectors.finishUserAvatar)
    };
    showRandomMessage = () => {
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
        this.finishContentLoadingMessages.innerText =
            this.pretestMessages[this.currentMessageIndex].innerText;
    };
    saveResults = () => {
        this.testJson.isTestCompleted = true;
        this.now = new Date();
        this.strDate = `${String(this.now.getDate()).padStart(2, "0")}.${String(
            this.now.getMonth() + 1
        ).padStart(2, "0")}.${this.now.getFullYear()}, ${String(
            this.now.getHours()
        ).padStart(2, "0")}:${String(this.now.getMinutes()).padStart(2, "0")}`;
        this.testJson.testPassDate = this.strDate;        
        for (let testAnswer of Object.keys(this.testJson.allAnswers)) {
            if (this.result.toLowerCase().includes(testAnswer.toLowerCase())) {
                this.resultAnswer = testAnswer;
                this.testJson.resultTitle = this.resultAnswer;
                break;
            }
        }
        this.testJson.resultText = this.result;
        localStorage.setItem(`test${this.testId}Data`, JSON.stringify(this.testJson));
        clearInterval(this.pretestInterval);
        this.finishContentLoadingLogo.classList.remove(
            this.stateClasses.active
        );
        window.location.href = `../passes-${this.testId}.html`;
    }
    onToResultButtonClick = async () => {
        this.finishContent.classList.add(this.stateClasses.visuallyHidden);
        this.finishContentLoading.classList.remove(
            this.stateClasses.visuallyHidden
        );
        this.result = this.testJson.resultText
        this.finishContentLoadingLogo.classList.add(this.stateClasses.active);
        this.allMessageIndexes = [];
        this.showRandomMessage();
        this.pretestInterval = setInterval(this.showRandomMessage, 1700);        
        this.sender = new SendUserAnswers();
        this.setReserveTimeout = setTimeout(() => this.saveResults(this.testJson.resultText), 20000);
        this.result = await this.sender.run();
        clearTimeout(this.setReserveTimeout)
        this.saveResults()
    };
    bindEvents = () => {
        this.toResultButton.addEventListener(
            "click",
            this.onToResultButtonClick
        );
    };
    loadUser = () =>{
        this.testId = this.rootElement.getAttribute('test-id')
        this.testJson = JSON.parse(localStorage.getItem(`test${this.testId}Data`));
        this.finishUserName.innerText = this.testJson.testAuthorName
        this.finishUserAvatar.src = this.testJson.testAuthorAvatar
    }
    constructor() {
        this.init();
        this.loadUser()
        this.bindEvents();
    }
}

export default ShowTestResults;
