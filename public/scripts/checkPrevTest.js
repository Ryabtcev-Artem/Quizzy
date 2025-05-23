import { onModalClick } from "./InGameActions.js";
const restoreTest = (context) => {
    if (context.modalTitle.innerText !== "Неоконченное прохождение") {
        return;
    }
    if (context.testJson.isTestCompleted){
        window.location.href = `../passes-${context.testId}.html`;
        return
    }
    context.modal.classList.remove(context.stateClasses.active);
    context.header.classList.add(context.stateClasses.visuallyHidden);
    context.headerAlt.classList.remove(context.stateClasses.visuallyHidden);
    context.rootElement.classList.add(context.stateClasses.gameStarted);
    context.testWindow.classList.remove(context.stateClasses.visuallyHidden);
    context.card.classList.add(context.stateClasses.visuallyHidden);
    context.randomQuestions = context.testJson.currentQuestions;
    context.currentQuestionIndex = context.testJson.currentQuestionIndex;
    context.testPreview.classList.add(context.stateClasses.visuallyHidden);
    context.initQuestion();
    context.pretestInit();
    if (context.currentQuestionIndex >= context.questionAmount) {
        context.finishGame();
        return;
    }
    context.renderQuestion();
};
const removeTest = (context) => {
    if (context.modalTitle.innerText !== "Неоконченное прохождение") {
        return;
    }
    localStorage.removeItem(`test${context.testId}Data`);
    context.modal.classList.remove(context.stateClasses.active);
};
const checkPrevTest = (context) => {
    context.testJson = localStorage.getItem(`test${context.testId}Data`);
    if (context.testJson) {
        context.testJson = JSON.parse(context.testJson);
        context.modalTitle.innerText = "Неоконченное прохождение";
        context.modalDescription.innerText =
            "Хотите возобновить прохождение этого теста?";
        context.modalYes.innerText = "Возобновить";
        context.modalNo.innerText = "Начать заново";
        context.modalYes.addEventListener("click", context.restoreTest, {
            once: true,
        });
        context.modalNo.addEventListener("click", context.removeTest, {
            once: true,
        });
        context.modal.classList.add(context.stateClasses.active);
        context.onModalClick = () => onModalClick(event, context);
        context.modal.addEventListener("click", context.onModalClick);
    }
};

export { restoreTest, removeTest, checkPrevTest };
