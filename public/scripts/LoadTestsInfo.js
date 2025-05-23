class loadTestInfo {
    selectors = {
        testId: "[test-id]",
        sliderList: "[data-js-slider-list]",
        testImage: "[data-js-test-image]",
        userName: "[data-js-user-name]",
        userAvatar: "[data-js-user-avatar]",
        testTitle: "[data-js-test-title]",
        testDescription: "[data-js-test-description]",
        testGrade: "[data-js-grade]",
        testNumberOfRatings: "[data-js-number-of-ratings]",
        testNumberOfQuestions: "[data-js-number-of-questions]",
        testErotic: "[data-js-erotic]",
        testBadwords: "[data-js-badwords]",
        testVisitors: "[data-js-visitors]",
        testLink: "[data-js-test-a-link]",
    };
    stateClasses = {
        active: "active",
    };
    init = () => {
        this.allTests = this.rootElement.querySelectorAll(
            this.selectors.testId
        );
    };
    async loadCurrentTest(test, currentTestId) {
        try {
            const response = await fetch(
                `../tests/test${currentTestId}/test${currentTestId}Info.json`
            );
            if (!response.ok) throw new Error("HTTP error");
            let testInfo = await response.json();
            let testImage = test.querySelector(this.selectors.testImage);
            let testUserName = test.querySelector(this.selectors.userName);
            let testuserAvatar = test.querySelector(this.selectors.userAvatar);
            let testTitle = test.querySelector(this.selectors.testTitle);
            let testDescription = test.querySelector(
                this.selectors.testDescription
            );
            let testGrade = test.querySelector(this.selectors.testGrade);
            let testNumberOfRatings = test.querySelector(
                this.selectors.testNumberOfRatings
            );
            let testNumberOfQuestions = test.querySelector(
                this.selectors.testNumberOfQuestions
            );
            let testErotic = test.querySelector(this.selectors.testErotic);
            let testBadwords = test.querySelector(this.selectors.testBadwords);
            let testVisitors = test.querySelector(this.selectors.testVisitors);
            let testLinks = test.querySelectorAll(this.selectors.testLink);
            testImage.src = testInfo["previewImage"];
            testUserName.innerText = testInfo["userName"];
            testuserAvatar.src = testInfo["userAvatar"];
            testTitle.innerText = testInfo["previewTitle"];
            testDescription.innerText = testInfo["previewDescription"];
            testGrade.innerText = testInfo["testGrade"];
            testNumberOfRatings.innerText = testInfo["testNumberOfRatings"];
            testNumberOfQuestions.innerText = testInfo["questionsAmount"];
            if (testInfo["hasErotic"]) {
                testErotic.classList.add(this.stateClasses.active);
                testErotic.setAttribute(
                    "data-title",
                    "Тест содержит эротические материалы"
                );
            }
            if (testInfo["hasBadwords"]) {
                testBadwords.classList.add(this.stateClasses.active);
                testBadwords.setAttribute(
                    "data-title",
                    "Тест содержит ненормативную лексику"
                );
            }
            testVisitors.innerText = testInfo["testVisitors"];
            for (let link of testLinks) {
                link.href = `./tests-${testInfo.testId}.html`;
            }
        } catch (error) {
            console.error("Couldn't load testInfo:", error);
            this.testInfo = [
                {
                    id: 0,
                    name: "Резервный вопрос",
                    image: "./images/default.webp",
                    answers: [{ text: "Вариант 1", value: 0 }],
                },
            ];
        }
    }
    loadAllTests = async () => {
        await new Promise((resolve, reject) => {
            const img = new Image();
            img.src = "./images/test/totest/loading.svg";
            img.onload = () => resolve();
            img.onerror = reject;
        });
        for (let test of this.allTests) {
            const currentTestId = test.getAttribute("test-id");
            this.loadCurrentTest(test, currentTestId);
        }
    };
    constructor() {
        this.rootElement = document.querySelector(this.selectors.sliderList);
        if (!this.rootElement) {
            return;
        }
        this.init();
        this.loadAllTests();
    }
}

export default loadTestInfo;
