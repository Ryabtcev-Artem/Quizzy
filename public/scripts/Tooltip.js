class Tooltip {
    selectors = {
        rootElement: "body",
    };
    init = () => {
        this.rootElement = document.querySelector(this.selectors.rootElement);
        this.allTitleElements =
            this.rootElement.querySelectorAll("[data-title]");
    };
    moveToolTip = (event) => {
        const mouseX = event.pageX;
        const mouseY = event.pageY;
        this.newTooltip.style.left = mouseX - 12 + "px";
        this.newTooltip.style.top = mouseY + 34 + "px";
    };
    addTooltip = (event) => {
        const target = event.target;
        const tooltipText = target.getAttribute("data-title");
        this.newTooltip = document.createElement("div");
        this.newTooltip.classList.add("tooltip");
        this.newTooltip.innerText = tooltipText;
        document.documentElement.appendChild(this.newTooltip);
        target.addEventListener("mousemove", this.moveToolTip);
        target.addEventListener(
            "mouseleave",
            () => {
                this.newTooltip.remove();
                target.removeEventListener("mousemove", this.moveToolTip);
            },
            { once: true }
        );
    };
    bindEvents = () => {
        for (let titleElement of this.allTitleElements) {
            titleElement.addEventListener("mouseenter", this.addTooltip);
        }
    };
    constructor() {
        this.init();
        this.bindEvents();
    }
}

export default Tooltip;
