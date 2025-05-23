class Fireworks {
    selectors = {
        fireworksCanvas: '[data-js-fireworks-canvas]',
    }
    stateClasses = {
        visuallyHidden: 'visually-hidden'
    }
    init = () => {
        this.fireworksCanvas = document.querySelector(this.selectors.fireworksCanvas)
    }
    constructor(canvasSelector = "[data-js-fireworks-canvas]") {
        this.init()
        this.canvas = document.querySelector(canvasSelector);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.fireworks = [];
        this.particlesPerFirework = 60;
        this.animationFrame = null;

        this._createFirework = this._createFirework.bind(this);
        this._drawFireworks = this._drawFireworks.bind(this);

        this.interval = setInterval(this._createFirework, 1000);
        this._drawFireworks();
        this._removeFireworks = setTimeout(() => this.stop(), 60000);
    }

    _random(min, max) {
        return Math.random() * (max - min) + min;
    }

    _createFirework() {
        const x = this._random(200, this.canvas.width - 200);
        const y = this._random(100, this.canvas.height);
        const color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 60%)`;

        for (let i = 0; i < this.particlesPerFirework; i++) {
            const angle = this._random(0, Math.PI * 2); // случайный угол
            const speed = this._random(3, 5); // случайная скорость
            const velocityX = Math.cos(angle) * speed;
            const velocityY = Math.sin(angle) * speed;
            const length = this._random(20, 100); // длина полета
            const radius = this._random(1, 3); // изменяем радиус частиц
            this.fireworks.push({
                x,
                y,
                radius,
                color,
                velocityX,
                velocityY,
                alpha: 1,
                decay: this._random(0.005, 0.01),
                lifetime: 0,
                isExploding: false,
                length, // длина пути
            });
        }
    }

    _drawFireworks() {
        this.ctx.fillStyle = "#333333"; // изменено на #262626
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.fireworks.forEach((p, i) => {
            if (!p.isExploding) {
                // Частицы летят под случайным углом
                p.x += p.velocityX;
                p.y += p.velocityY;
                p.lifetime++;

                // Когда частица достигает максимальной высоты, она начинает взрываться
                if (p.lifetime > p.length) {
                    // длина полета
                    p.isExploding = true;
                }
            } else {
                // Взрыв: частицы разлетаются в разные стороны
                const vx = Math.cos(p.velocityX) * 2;
                const vy = Math.sin(p.velocityY) * 2;

                p.x += vx;
                p.y += vy;
            }

            // Уменьшаем прозрачность частицы
            p.alpha -= p.decay;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color
                .replace("hsl", "hsla")
                .replace("%)", `%, ${p.alpha})`);
            this.ctx.fill();
        });

        // Убираем частицы, которые исчезли
        this.fireworks = this.fireworks.filter((p) => p.alpha > 0);
        this.animationFrame = requestAnimationFrame(this._drawFireworks);
    }

    stop() {
        clearInterval(this.interval); // Останавливаем запуск фейерверков
        cancelAnimationFrame(this.animationFrame); // Останавливаем отрисовку
        clearTimeout(this._removeFireworks); // Если нужно — отменяем отложенный вызов
        this.fireworksCanvas.classList.add(this.stateClasses.visuallyHidden)
    }
}

export default Fireworks;
