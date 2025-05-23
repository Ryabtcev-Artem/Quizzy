class Slider {
    selectors = {
        body: "body",
        sliderList: "[data-js-slider-list]",
        sliderItem: "[data-js-slider-item]",
        sliderALinks: "[data-js-test-a-link]",
    };
    init = () => {
        this.rootElement = document.querySelector(this.selectors.body);
        this.sliderList = this.rootElement.querySelector(
            this.selectors.sliderList
        );
        this.sliderItem = this.sliderList.querySelector(
            this.selectors.sliderItem
        );
        this.sliderALinks = this.sliderList.querySelectorAll(
            this.selectors.sliderALinks
        );
    };
    initVariables = () => {
        this.currentX = 0;
        this.prevTranslate = 0;
        this.sliderItemWidth = 0;
        this.isDragging = false;
        this.inertionTime = 0;
        this.framesCounter = 0;
        this.moveFramesCounter = 0;
        this.velocity = 0.95;
        this.vx = 1;
        this.dx = 1;
        this.dt = 1;
        this.nowTimeStamp = 0;
        this.lastTimeStamp = 0;
        this.lastX = 0;
        this.stopSliding = false;
        this.nowX = 0;
        this.saveTimeStamp = 0;
        this.stopInertion = false;
        this.isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
        this.sliderListWidth =
            this.sliderList.scrollWidth - window.innerWidth - 16;
    };
    onLinkClick = (event) => {
        if (this.isDragging) {
            event.preventDefault();
        }
    };
    onWindowMove = (event) => {
        this.moveFramesCounter++;
        if (this.moveFramesCounter % 2 === 0) {
            this.nowTimeStamp = performance.now();
            this.nowX = event.clientX;
            this.dt = this.nowTimeStamp - this.lastTimeStamp;
            this.dx = this.lastX - this.nowX;
            this.vx = this.dx / this.dt;
            this.lastX = event.clientX;
            this.lastTimeStamp = performance.now();
        }
        this.translateX = event.clientX - this.currentX;

        if (this.translateX > 0) {
            this.translateX = this.translateX / 4;
        }
        if (-this.translateX > this.sliderListWidth) {
            this.translateX = -(
                this.sliderListWidth +
                (-this.translateX - this.sliderListWidth) / 4
            );
        }
        if (this.moveFramesCounter > 20) {
            this.isDragging = true;
        }
        this.sliderList.style.transform = `translateX(${this.translateX}px)`;
    };
    moveToFinal = () => {
        if (this.framesCounter >= 31 || this.stopSliding) {
            this.framesCounter = 0;
            window.cancelAnimationFrame(this.moveToFinal);
            return;
        }
        this.prevTranslate = this.prevTranslate - this.difference / 31.25;
        this.translateX = this.prevTranslate;
        this.sliderList.style.transform = `translateX(${this.prevTranslate}px)`;
        this.framesCounter++;
        if (this.framesCounter < 31) {
            window.requestAnimationFrame(this.moveToFinal);
        }
    };
    moveToClosest = () => {
        this.framesCounter = 0;
        this.sliderItemsCount = Math.round(
            this.prevTranslate / this.sliderItemWidth
        );

        if (-this.prevTranslate > this.sliderListWidth) {
            this.sliderItemsCount = -Math.round(
                this.sliderListWidth / this.sliderItemWidth
            );
        }
        this.finalTranslate =
            this.sliderItemsCount * this.sliderItemWidth +
            8 * this.sliderItemsCount;
        if (this.prevTranslate > 0) {
            this.finalTranslate = 0;
        }
        this.difference = this.prevTranslate - this.finalTranslate;
        window.requestAnimationFrame(this.moveToFinal);
    };
    inertionAnimation = () => {
        if (this.isTouchDevice) {
            return;
        }
        this.prevTranslate = this.prevTranslate - this.velocity / 16;
        this.framesCounter++;
        this.velocity -= this.velocityDiff;
        if (
            this.framesCounter > 50 ||
            this.prevTranslate > 0 ||
            -this.prevTranslate > this.sliderListWidth ||
            this.stopSliding ||
            this.stopInertion
        ) {
            window.cancelAnimationFrame(this.inertionAnimation);
            this.moveToClosest();
        } else {
            window.requestAnimationFrame(this.inertionAnimation);
            this.sliderList.style.transform = `translateX(${this.prevTranslate}px)`;
        }
        this.translateX = this.prevTranslate;
    };
    onWindowUp = () => {
        window.removeEventListener("pointermove", this.onWindowMove);
        this.framesCounter = 0;

        this.velocity = Math.round(this.vx * 100);
        this.stopSliding = false;
        this.prevTranslate = this.translateX;
        if (this.isTouchDevice) {
            if (this.prevTranslate > 0) {
                this.finalTranslate = 0;
                this.difference = this.prevTranslate - this.finalTranslate;
                window.requestAnimationFrame(this.moveToFinal);
                return;
            }
            if (Math.abs(this.prevTranslate) > this.sliderListWidth) {
                this.finalTranslate = this.sliderListWidth;
                this.difference = this.prevTranslate + this.finalTranslate;
                window.requestAnimationFrame(this.moveToFinal);
                return;
            }
        }
        this.velocityDiff = this.velocity / 50;
        if (this.saveTimeStamp === this.lastTimeStamp) {
            this.stopInertion = true;
            this.moveToClosest();
            this.saveTimeStamp = this.lastTimeStamp;
            return;
        } else {
            this.stopInertion = false;
        }
        this.inertionAnimation();
        this.saveTimeStamp = this.lastTimeStamp;
    };
    onSliderDown = (event) => {
        this.moveFramesCounter = 0;
        if (this.framesCounter > 0) {
            this.framesCounter = 1000;
        }
        this.stopSliding = true;
        window.cancelAnimationFrame(this.moveToFinal);
        window.cancelAnimationFrame(this.inertionAnimation);

        this.isDragging = false;
        if (this.prevTranslate > 0) {
            this.prevTranslate *= 4;
        }
        if (-this.prevTranslate > this.sliderListWidth) {
            this.prevTranslate = -(
                this.sliderListWidth +
                (-this.prevTranslate - this.sliderListWidth) * 4
            );
        }
        this.currentX = event.clientX - this.prevTranslate;
        this.sliderItemWidth = this.sliderItem.getBoundingClientRect().width;
        for (let link of this.sliderALinks) {
            link.addEventListener("click", this.onLinkClick);
        }
        window.addEventListener("pointermove", this.onWindowMove);
        window.addEventListener("pointerup", this.onWindowUp);
    };
    bindEvents = () => {
        this.sliderList.addEventListener("pointerdown", this.onSliderDown);
    };
    constructor() {
        this.inertionAnimation = this.inertionAnimation.bind(this);
        this.init();
        this.initVariables();
        this.bindEvents();
    }
}
export default Slider;
