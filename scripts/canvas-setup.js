// canvas-setup.js
import { Ball } from './ball-class.js';

const canvasSetup = () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;

    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const randomRGB = () => {
        return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
    };

    const balls = [];

    while (balls.length < 15) {
        const size = random(10, 20);
        const ball = new Ball(
            random(0 + size, width - size),
            random(0 + size, height - size),
            random(-7, 7),
            random(-7, 7),
            size
        );

        balls.push(ball);
    }

    const loop = () => {
        ctx.fillStyle = `rgba(0, 0, 0, 0.25)`;
        ctx.fillRect(0, 0, width, height);

        for (const ball of balls){
            ball.draw(ctx);
            ball.update(width, height);
            for (const otherBall of balls) {
                if (ball !== otherBall) {
                    ball.collisionDetect(otherBall);
                }
            }
        }

        requestAnimationFrame(loop);
    };

    loop();
};

export { canvasSetup };