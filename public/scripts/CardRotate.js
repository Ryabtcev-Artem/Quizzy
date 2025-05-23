class CardRotate {
    selectors = {
        cardElement: "[data-js-slider-item]",
    };

    settings = {
        maxRotation: 6,
        transitionDuration: "0.2s",
    };

    init = () => {
        this.allCards.forEach((card) => {
            card.style.transition = `transform ${this.settings.transitionDuration} ease-out`;
            card.style.transformStyle = "preserve-3d";
        });
    };

    startRotateCard = (event) => {
        const windowInnerWidth = window.innerWidth;
        if (windowInnerWidth < 767.98) {
            return;
        }
        const card = event.currentTarget;
        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const relX = (x - centerX) / centerX;
        const relY = (centerY - y) / centerY;

        const rotateY = relX * this.settings.maxRotation;
        const rotateX = relY * this.settings.maxRotation;
        card.style.zIndex = `20`
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.07)`;
    };

    resetRotateCard = (event) => {
        const card = event.currentTarget;
        card.style.zIndex = `1`
        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    };

    bindEvents = () => {
        for (let card of this.allCards) {
            card.addEventListener("mousemove", this.startRotateCard);
            card.addEventListener("mouseleave", this.resetRotateCard);
        }
    };

    constructor() {
        this.allCards = document.querySelectorAll(this.selectors.cardElement);
        if (this.allCards.length === 0) {
            return;
        }
        this.init();
        this.bindEvents();
    }
}

export default CardRotate;
