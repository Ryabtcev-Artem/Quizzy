const onAnswerClick = (event, context) => {
    context.currAnswer = event.target;
    if (context.submit.classList.contains(context.stateClasses.activated)) {
        return;
    }
    context.submit.classList.add(context.stateClasses.activated);
    context.chooseTitle.classList.add(context.stateClasses.active);
    context.chooseTitle.innerText = "1 / 1";
};
const onSubmitClick = (context) => {
    if (!context.submit.classList.contains(context.stateClasses.activated)) {
        return;
    }
    context.testJson.currentAnswers[
        context.currentQuestionIndex
    ] = [context.questionName.innerText, context.currAnswer.innerText];
    context.currentQuestionIndex++;
    context.testJson.currentQuestionIndex = context.currentQuestionIndex;
    localStorage.setItem(`test${context.testId}Data`, JSON.stringify(context.testJson));
    context.questionElement.classList.add(context.stateClasses.reduceAndBack);
    context.questionElement.addEventListener(
        "animationend",
        () =>
            context.questionElement.classList.remove(
                context.stateClasses.reduceAndBack
            ),
        { once: true }
    );
    for (let wave of context.waves) {
        wave.classList.add(context.stateClasses.raging);
        wave.addEventListener("animationend", () => {
            wave.classList.remove(context.stateClasses.raging);
        });
    }
    context.submit.classList.remove(context.stateClasses.activated);
    context.questionTimeout = setTimeout(() => {
        context.renderQuestion();
        context.chooseTitle.classList.remove(context.stateClasses.active);
        context.chooseTitle.innerText = "0 / 1";
    }, 200);
};
const onStepBackClick = (context) => {
    if (context.currentQuestionIndex === 0) {
        return;
    }
    if (context.currentQuestionIndex === 1) {
        context.stepBack.classList.remove(context.stateClasses.active);
    } else {
        context.stepBack.classList.add(context.stateClasses.active);
    }
    context.currentQuestionIndex--;
    context.testJson.currentQuestionIndex = context.currentQuestionIndex;
    localStorage.setItem(`test${context.testId}Data`, JSON.stringify(context.testJson));
    context.questionElement.classList.add(context.stateClasses.reduceAndBack);
    context.questionElement.addEventListener(
        "animationend",
        () =>
            context.questionElement.classList.remove(
                context.stateClasses.reduceAndBack
            ),
        { once: true }
    );
    for (let wave of context.waves) {
        wave.classList.add(context.stateClasses.raging);
        wave.addEventListener("animationend", () => {
            wave.classList.remove(context.stateClasses.raging);
        });
    }
    context.submit.classList.remove(context.stateClasses.activated);
    context.questionTimeout = setTimeout(() => {
        context.renderQuestion();
        context.chooseTitle.classList.remove(context.stateClasses.active);
        context.chooseTitle.innerText = "0 / 1";
    }, 200);
    context.etap.innerText = `Вопрос ${context.currentQuestionIndex + 1}/${
        context.questionAmount
    }`;
    context.questionTimeout = setTimeout(context.renderQuestion, 460);
};
const onModalNoClick = (context) => {
    context.modal.classList.remove(context.stateClasses.active);
    context.htmlElement.classList.remove(context.stateClasses.stopScroll);
};
const onModalYesClick = (context) => {
    context.modal.classList.remove(context.stateClasses.active);
    if (context.testJson) {
        localStorage.removeItem(`test${context.testId}Data`);
    }
    context.htmlElement.classList.remove(context.stateClasses.stopScroll);
    window.location.href = "../tests-1.html";
};
const onModalClick = (event, context) => {
    if (event.target.closest(context.selectors.modalContent)) {
        return;
    }
    context.modalContent.classList.add(context.stateClasses.shaking);
    context.modalContent.addEventListener("animationend", () => {
        context.modalContent.classList.remove(context.stateClasses.shaking);
    });
};
const onDropClick = (context) => {
    context.modalTitle.innerText = "Предупреждение";
    context.modalDescription.innerText =
        "Вы действительно хотите сбросить весь прогресс прохождения?";
    context.modalYes.innerText = "Да";
    context.modalNo.innerText = "Нет";
    context.modal.classList.add(context.stateClasses.active);
    context.htmlElement.classList.add(context.stateClasses.stopScroll);
    context.modalYes.addEventListener("click", context.onModalYesClick);
    context.modalNo.addEventListener("click", context.onModalNoClick);
    context.modal.addEventListener("click", context.onModalClick);
};
const bindQuestionEvents = (context) => {
    context.allAnswer = context.answers.querySelectorAll(
        context.selectors.answer
    );
    context.chooseTitle = context.answers.querySelector(
        context.selectors.chooseTitle
    );
    for (let answer of context.allAnswer) {
        answer.addEventListener("click", context.onAnswerClick);
    }
    context.submit.addEventListener("click", context.onSubmitClick);
    context.stepBack.addEventListener("click", context.onStepBackClick);
    context.drop.addEventListener("click", context.onDropClick);
};
const renderQuestion = (context) => {
    if (context.currentQuestionIndex >= context.questionAmount) {
        context.preWinTimeout = setTimeout(() => {
            context.finishGame();
        }, 260);
        return;
    }
    if (context.currentQuestionIndex > 0) {
        context.stepBack.classList.add(context.stateClasses.active);
    }
    context.currentQuestion =
        context.randomQuestions[context.currentQuestionIndex];
    context.etap.innerText = `Вопрос ${context.currentQuestionIndex + 1}/${
        context.questionAmount
    }`;

    context.questionName.innerText = context.currentQuestion.name;
    context.questionImage.src = context.currentQuestion.image;
    let allAnswers = "";
    for (let variant of context.currentQuestion.answers) {
        allAnswers += `<div class="question__answer">
        <input id="answer${variant.value}" type="radio" name="ANSWER" value="${variant.value}"/>
        <label class="question__answer__label" data-js-answer for="answer${variant.value}">
        ${variant.text}
        </label>
        </div>`;
    }
    context.answersWrapper.innerHTML = allAnswers;
    context.bindQuestionEvents();
};
export {
    renderQuestion,
    bindQuestionEvents,
    onAnswerClick,
    onDropClick,
    onModalClick,
    onModalNoClick,
    onModalYesClick,
    onStepBackClick,
    onSubmitClick,
};
