/**
 * Aesthetic Pastel Petals & Heart Confetti
 * Soft, gentle pastel tones (blush pink, cream, soft peach, sage green, gold)
 */

class AestheticConfetti {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.id = 'confetti-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100vw';
        this.canvas.style.height = '100vh';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9999';
        document.body.appendChild(this.canvas);

        this.particles = [];
        this.running = false;
        // Aesthetic Pinterest palette: soft blush, dusty rose, champagne gold, soft sage, cream
        this.colors = [
            '#F9C5D1', '#F6ABB6', '#E78F9B', '#FFE4E1',
            '#F8D7DA', '#D4E2D4', '#FFF3CD', '#ECC5C0',
            '#E4BAD4', '#F4B9B8'
        ];

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.dpr = window.devicePixelRatio || 1;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width * this.dpr;
        this.canvas.height = this.height * this.dpr;
        this.ctx.scale(this.dpr, this.dpr);
    }

    burst(x = this.width / 2, y = this.height / 2, count = 45) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = 3 + Math.random() * 8;
            const isHeart = Math.random() > 0.4;

            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity - 2,
                size: 7 + Math.random() * 9,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 8,
                gravity: 0.18 + Math.random() * 0.1,
                drag: 0.96,
                life: 1,
                decay: 0.009 + Math.random() * 0.008,
                isHeart: isHeart
            });
        }

        if (!this.running) {
            this.running = true;
            this.loop();
        }
    }

    loop() {
        if (!this.running) return;

        this.ctx.clearRect(0, 0, this.width, this.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            p.vx *= p.drag;
            p.vy *= p.drag;
            p.vy += p.gravity;
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.rotationSpeed;
            p.life -= p.decay;

            if (p.life <= 0 || p.y > this.height + 50) {
                this.particles.splice(i, 1);
                continue;
            }

            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate((p.rotation * Math.PI) / 180);
            this.ctx.globalAlpha = Math.max(0, p.life);
            this.ctx.fillStyle = p.color;

            if (p.isHeart) {
                const s = p.size * 0.7;
                this.ctx.beginPath();
                this.ctx.moveTo(0, s * 0.3);
                this.ctx.bezierCurveTo(-s * 0.6, -s * 0.3, -s, s * 0.3, 0, s);
                this.ctx.bezierCurveTo(s, s * 0.3, s * 0.6, -s * 0.3, 0, s * 0.3);
                this.ctx.fill();
            } else {
                // Soft oval petal
                this.ctx.beginPath();
                this.ctx.ellipse(0, 0, p.size / 2, p.size / 3.5, 0, 0, Math.PI * 2);
                this.ctx.fill();
            }

            this.ctx.restore();
        }

        if (this.particles.length > 0) {
            requestAnimationFrame(() => this.loop());
        } else {
            this.running = false;
            this.ctx.clearRect(0, 0, this.width, this.height);
        }
    }
}

// Gentle Floating Sparkle Trail on Pointer
class GentleSparkleTrail {
    constructor() {
        this.emojis = ['✨', '🌸', '🤍', '🎀', '🧸'];
        this.lastSpawn = 0;

        window.addEventListener('mousemove', (e) => this.spawn(e.clientX, e.clientY));
        window.addEventListener('touchmove', (e) => {
            if (e.touches && e.touches[0]) {
                this.spawn(e.touches[0].clientX, e.touches[0].clientY);
            }
        });
    }

    spawn(x, y) {
        const now = Date.now();
        if (now - this.lastSpawn < 60) return;
        this.lastSpawn = now;

        const el = document.createElement('span');
        el.className = 'aesthetic-sparkle';
        el.innerText = this.emojis[Math.floor(Math.random() * this.emojis.length)];
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        document.body.appendChild(el);

        setTimeout(() => el.remove(), 700);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.aestheticConfetti = new AestheticConfetti();
    window.sparkleTrail = new GentleSparkleTrail();
});
