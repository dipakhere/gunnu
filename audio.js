/**
 * Cozy & Aesthetic Web Audio Synthesizer
 * Lana Del Rey - Cinnamon Girl Dreamy Music Box Melody
 */

class AestheticAudio {
    constructor() {
        this.ctx = null;
        this.muted = false;
        this.isPlayingLofi = false;
        this.lofiTimeouts = [];
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        if (this.muted && this.isPlayingLofi) {
            this.stopLofiTrack();
        }
        return this.muted;
    }

    // Soft bubble pop
    playSoftPop() {
        if (this.muted) return;
        this.init();
        const ctx = this.ctx;
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.09);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.09);
    }

    // Cozy music box chime
    playChime(freq = 659.25) {
        if (this.muted) return;
        this.init();
        const ctx = this.ctx;
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, now);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.8);
    }

    // Paper tear / rustle sound
    playPaperTear() {
        if (this.muted) return;
        this.init();
        const ctx = this.ctx;
        const duration = 0.18;
        const bufferSize = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 2200;
        filter.Q.value = 1.8;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start();
    }

    // Spin tick sound for the food wheel
    playTick() {
        if (this.muted) return;
        this.init();
        const ctx = this.ctx;
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.03);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.03);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.03);
    }

    // Lana Del Rey - "Cinnamon Girl" Dreamy Music Box Melody
    toggleLofiTrack() {
        if (this.isPlayingLofi) {
            this.stopLofiTrack();
            return false;
        } else {
            this.playLofiTrack();
            return true;
        }
    }

    playLofiTrack() {
        if (this.muted) return;
        this.init();
        this.stopLofiTrack();
        this.isPlayingLofi = true;

        // "Cinnamon girl, if you hold me without hurting me, you'll be the first who ever did..."
        // Dreamy F#m / A / D music box notes:
        const cinnamonNotes = [
            // "Cin-na-mon girl..."
            { f: 369.99, d: 500, delay: 0 },    // F#4
            { f: 440.00, d: 500, delay: 550 },  // A4
            { f: 493.88, d: 600, delay: 1100 }, // B4
            { f: 440.00, d: 900, delay: 1800 }, // A4

            // "If you hold me without hurting me..."
            { f: 440.00, d: 450, delay: 2900 }, // A4
            { f: 415.30, d: 450, delay: 3400 }, // G#4
            { f: 369.99, d: 450, delay: 3900 }, // F#4
            { f: 329.63, d: 500, delay: 4400 }, // E4
            { f: 369.99, d: 550, delay: 5000 }, // F#4
            { f: 440.00, d: 550, delay: 5600 }, // A4
            { f: 493.88, d: 800, delay: 6200 }, // B4

            // "You'll be the first who ever did..."
            { f: 554.37, d: 600, delay: 7200 }, // C#5
            { f: 493.88, d: 550, delay: 7900 }, // B4
            { f: 440.00, d: 600, delay: 8500 }, // A4
            { f: 369.99, d: 700, delay: 9200 }, // F#4
            { f: 329.63, d: 900, delay: 10000 },// E4
            { f: 369.99, d: 1300, delay: 11000 }// F#4
        ];

        const loopDuration = 13000;

        const scheduleLoop = () => {
            if (!this.isPlayingLofi || this.muted) return;

            cinnamonNotes.forEach(item => {
                const timeout = setTimeout(() => {
                    if (this.isPlayingLofi && !this.muted) {
                        this.playMusicBoxNote(item.f, item.d / 1000);
                    }
                }, item.delay);
                this.lofiTimeouts.push(timeout);
            });

            const loopTimeout = setTimeout(() => {
                if (this.isPlayingLofi) {
                    scheduleLoop();
                }
            }, loopDuration);
            this.lofiTimeouts.push(loopTimeout);
        };

        scheduleLoop();
    }

    playMusicBoxNote(freq, duration) {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1800, now);

        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration + 0.4);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + duration + 0.4);
    }

    stopLofiTrack() {
        this.isPlayingLofi = false;
        this.lofiTimeouts.forEach(t => clearTimeout(t));
        this.lofiTimeouts = [];
    }
}

window.aestheticAudio = new AestheticAudio();
