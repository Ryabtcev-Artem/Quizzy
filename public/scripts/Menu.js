class Menu {
    selectors = {
        htmlElement: "html",
        rootElement: "[data-js-header-element]",
        burgerButton: "[data-js-mobile-menu]",
        menuList: "[data-js-menu-list]",
        overlay: "[data-js-overlay]",
    };
    stateClasses = {
        active: "active",
    };
    isMenuActive = false;
    onBurgerButtonClick = () => {
        this.burgerButton.classList.toggle(this.stateClasses.active);
        this.menuList.classList.toggle(this.stateClasses.active);
        this.overlay.classList.toggle(this.stateClasses.active);
        this.htmlElement.classList.toggle('stopScroll')
    };
    onOverlayClick = () => {
        this.burgerButton.classList.toggle(this.stateClasses.active);
        this.menuList.classList.toggle(this.stateClasses.active);
        this.overlay.classList.toggle(this.stateClasses.active);
        this.htmlElement.classList.toggle('stopScroll')
    };
    bindEvents() {
        this.burgerButton.addEventListener("click", this.onBurgerButtonClick);
        this.overlay.addEventListener("click", this.onOverlayClick);
    }
    init = () => {
        this.htmlElement = document.querySelector(this.selectors.htmlElement)
        this.rootElement = document.querySelector(this.selectors.rootElement);
        this.burgerButton = this.rootElement.querySelector(
            this.selectors.burgerButton
        );
        this.menuList = this.rootElement.querySelector(this.selectors.menuList);
        this.overlay = this.rootElement.querySelector(this.selectors.overlay);
    };
    constructor() {
        this.init();
        this.bindEvents();
    }
}
export default Menu;
