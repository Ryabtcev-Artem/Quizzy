class Tabs {
    selectors = {
        rootElement: "[data-js-welcome-news]",
        newsTabs: "[data-js-news-tabs]",
        newsTab1: "[data-js-news-tab1]",
        newsTab2: "[data-js-news-tab2]",
        newsTab3: "[data-js-news-tab3]",
        newsCard1: "[data-js-news-card1]",
        newsCard2: "[data-js-news-card2]",
        newsCard3: "[data-js-news-card3]",
    };
    currentIndexTab = 1;
    maxTabs = 3;
    stateClasses = {
        active: "is-active",
        slick: "slick",
        stable: "stable",
    };
    init = () => {
        this.newsTabs = this.rootElement.querySelector(this.selectors.newsTabs);
        this.newsTab1 = this.rootElement.querySelector(this.selectors.newsTab1);
        this.newsTab2 = this.rootElement.querySelector(this.selectors.newsTab2);
        this.newsTab3 = this.rootElement.querySelector(this.selectors.newsTab3);
        this.newsCard1 = this.rootElement.querySelector(
            this.selectors.newsCard1
        );
        this.newsCard2 = this.rootElement.querySelector(
            this.selectors.newsCard2
        );
        this.newsCard3 = this.rootElement.querySelector(
            this.selectors.newsCard3
        );
    };
    setCurrentTab = () => {
        this.currentTab = this[`newsTab${this.currentIndexTab}`];
        this.currentCard = this[`newsCard${this.currentIndexTab}`];
    };
    clearAllTabs = () => {
        for (let i = 1; i <= this.maxTabs; i++) {
            this.currentTab = this[`newsTab${i}`].classList.remove(
                this.stateClasses.slick
            );
            this.currentCard = this[`newsCard${i}`].classList.remove(
                this.stateClasses.active,
                this.stateClasses.stable
            );
        }
    };
    removeClasses = () => {
        this.setCurrentTab();

        this.currentTab?.classList?.remove(this.stateClasses.slick);
        this.currentCard?.classList?.remove(this.stateClasses.active);
    };
    activeTabs = () => {
        this.clearAllTabs();
        if (this.currentIndexTab > this.maxTabs) {
            this.currentIndexTab = 1;
        }
        this.setCurrentTab();
        this.currentTab.classList.add(this.stateClasses.slick);
        this.currentCard.classList.add(this.stateClasses.active);
        this.currentCard.addEventListener(
            "animationend",
            () => {
                this.removeClasses();
            },
            { once: true }
        );
        this.currentIndexTab++;
    };
    startInterval = () => {
        this.activeTabs();
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(this.activeTabs, 4100);
    };
    destroy = () => {
        clearInterval(this.interval);
    };
    activeClickTabs = (event) => {
        const target = event.target;
        if (!target.classList.contains("news__tab")) {
            return;
        }
        this.destroy();
        this.clearAllTabs();
        this.currentIndexTab = target.className.at(-1);
        this.setCurrentTab();
        this.currentTab.classList.add(this.stateClasses.slick);
        this.currentCard.classList.add(
            this.stateClasses.active,
            this.stateClasses.stable
        );
    };
    bindEvents = () => {
        this.newsTabs.addEventListener("click", this.activeClickTabs);
    };
    constructor() {
        this.rootElement = document.querySelector(this.selectors.rootElement);
        if (!this.rootElement) {
            return;
        }
        this.init();
        this.startInterval();
        this.bindEvents();
    }
}
export default Tabs;
