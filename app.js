/**
 * Aesthetic Birthday Scrapbook for Bhoomi (Gunnu) ❤️
 * Born: 15/11/2004 - Turning 22 Today!
 * From: Jakhar
 * Song: Cinnamon Girl - Lana Del Rey
 */

const state = {
    name: 'Bhoomi',
    nickname: 'Gunnu',
    age: 22,
    dob: '15/11/2004',
    sender: 'Jakhar',
    photos: [
        {
            url: 'photos/sleepy_shoulder.jpg',
            caption: 'Daily nap efficiency: 100% (Sleeping on Jakhar\'s shoulder) 😴🤍'
        },
        {
            url: 'photos/night_skyline.jpg',
            caption: 'Looking over the city lights, but my eyes are on you 🌃✨'
        },
        {
            url: 'photos/matching_jackets.jpg',
            caption: 'Unbeatable drip: matching black leather jackets 🖤🔥'
        },
        {
            url: 'photos/funny_skimask.jpg',
            caption: 'Two partners in crime causing absolute chaos 🥷😂'
        },
        {
            url: 'photos/sunglasses_selfie.jpg',
            caption: 'The 47th selfie until Gunnu approved the angle 📸'
        },
        {
            url: 'photos/bw_corridor_walk.jpg',
            caption: 'Walking through life together, one step at a time 🖤'
        }
    ],
    customAudioUrl: 'cinnamon-girl.mp3',
    letter: `My Dearest Bhoomi (My Gunnu ❤️),

Happy 22nd Birthday! 🎉✨

On 15th November 2004, the world got blessed with the sweetest, prettiest, and most wonderfully chaotic girl, and I am so lucky and grateful that I get to call you mine.

From your infectious smile, to the way you fall asleep peacefully on my shoulder, steal my hoodies, laugh at our silly moments, and light up every single room—having you in my life makes everything 1000x warmer, softer, and so much more meaningful.

You are turning 22 today, and watching you grow, create art, and stay your authentic, breathtaking self is my absolute favorite thing. I hope this year brings you all the peace, endless good food, laughter, and all the sweet moments you deserve.

I love you endlessly, Gunnu. Today, tomorrow, and forever.`,
    redeemedCoupons: new Set()
};

// Custom girlfriend food options for Gunnu
const foodOptions = [
    { text: `"I don't mind, Jakhar you pick."`, sub: `(Proceeds to veto all 5 places Jakhar suggests 😂)` },
    { text: `Momos & Cold Coffee 🥟🥤`, sub: `Gunnu's ultimate comfort treat. Zero debates.` },
    { text: `Fries & Milkshake 🍟🥤`, sub: `22nd Birthday calories are officially 0 by royal decree.` },
    { text: `Cheesy Pizza Night 🍕`, sub: `Extra cheese, extra cozy, watching our comfort show.` },
    { text: `"I'm not hungry" (Eats 60% of Jakhar's food) 🍟`, sub: `Food tastes 100x better when stolen from Jakhar's plate.` },
    { text: `Sweet Dessert / Waffles / Ice Cream 🍨`, sub: `Because Gunnu always has a second stomach for dessert.` }
];

document.addEventListener('DOMContentLoaded', () => {
    loadState();
    bindEvents();
    renderAll();
    probeLocalAssets();
});

function probeLocalAssets() {
    const audio = document.getElementById('bg-music-player');
    const songCandidates = ['cinnamon-girl.mp3', 'cinnamon_girl.mp3', 'Cinnamon Girl.mp3', 'song.mp3', 'cinnamon.mp3'];
    
    songCandidates.forEach(s => {
        const testAudio = new Audio();
        testAudio.src = s;
        testAudio.addEventListener('canplaythrough', () => {
            if (!state.customAudioUrl) {
                state.customAudioUrl = s;
                if (audio) audio.src = s;
                const statusBadge = document.getElementById('song-status-badge');
                if (statusBadge) statusBadge.innerText = '🎵 Cinnamon Girl loaded! Tap vinyl to play';
                const songTitle = document.getElementById('song-title-display');
                if (songTitle) songTitle.innerText = 'Cinnamon Girl — Lana Del Rey';
            }
        });
    });
}

function loadState() {
    const saved = localStorage.getItem('bhoomi_birthday_state');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            Object.assign(state, parsed);
            if (parsed.redeemedCoupons) {
                state.redeemedCoupons = new Set(parsed.redeemedCoupons);
            }
        } catch (e) {
            console.warn(e);
        }
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get('name')) state.name = params.get('name');
    if (params.get('nick')) state.nickname = params.get('nick');
    if (params.get('age')) state.age = params.get('age');
    if (params.get('letter')) state.letter = decodeURIComponent(params.get('letter'));
}

function saveState() {
    const toSave = {
        ...state,
        redeemedCoupons: Array.from(state.redeemedCoupons)
    };
    localStorage.setItem('bhoomi_birthday_state', JSON.stringify(toSave));
}

function bindEvents() {
    // Audio Mute Pill
    const muteBtn = document.getElementById('mute-btn');
    if (muteBtn) {
        muteBtn.addEventListener('click', () => {
            const isMuted = aestheticAudio.toggleMute();
            muteBtn.innerHTML = isMuted ? '🔇 Unmute' : '🔊 Sound';
        });
    }

    // Vinyl Lo-Fi Player (Supports uploaded MP3 or custom Cinnamon Girl synth)
    const vinylWidget = document.getElementById('vinyl-player');
    const vinylDisc = document.getElementById('vinyl-disc');
    const playBadge = document.getElementById('vinyl-play-icon');
    const customAudio = document.getElementById('bg-music-player');

    if (vinylWidget && vinylDisc) {
        vinylWidget.addEventListener('click', () => {
            if (state.customAudioUrl && customAudio) {
                if (customAudio.paused) {
                    customAudio.play();
                    vinylDisc.classList.add('playing');
                    if (playBadge) playBadge.innerText = '⏸';
                    aestheticConfetti.burst(window.innerWidth / 2, window.innerHeight * 0.3, 30);
                } else {
                    customAudio.pause();
                    vinylDisc.classList.remove('playing');
                    if (playBadge) playBadge.innerText = '▶';
                }
            } else {
                const isPlaying = aestheticAudio.toggleLofiTrack();
                if (isPlaying) {
                    vinylDisc.classList.add('playing');
                    if (playBadge) playBadge.innerText = '⏸';
                    aestheticConfetti.burst(window.innerWidth / 2, window.innerHeight * 0.3, 30);
                } else {
                    vinylDisc.classList.remove('playing');
                    if (playBadge) playBadge.innerText = '▶';
                }
            }
        });
    }

    // Audio file uploader for Cinnamon Girl
    const songInput = document.getElementById('song-uploader');
    if (songInput && customAudio) {
        songInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const url = URL.createObjectURL(file);
                state.customAudioUrl = url;
                customAudio.src = url;
                document.getElementById('song-title-display').innerText = file.name.replace(/\.[^/.]+$/, "");
                document.getElementById('song-status-badge').innerText = '🎵 Cinnamon Girl loaded! Tap vinyl to play';
                aestheticAudio.playChime();
            }
        });
    }

    // Food Wheel
    const foodBtn = document.getElementById('spin-food-btn');
    if (foodBtn) {
        foodBtn.addEventListener('click', spinFoodDecider);
    }

    // Coupons
    document.querySelectorAll('.aesthetic-coupon').forEach(card => {
        const btn = card.querySelector('.coupon-btn');
        if (btn) {
            btn.addEventListener('click', () => redeemCoupon(card));
        }
    });

    // Sticky Notes interactions
    document.querySelectorAll('.sticky-note').forEach(note => {
        note.addEventListener('click', () => {
            aestheticAudio.playSoftPop();
            aestheticConfetti.burst(window.innerWidth / 2, window.innerHeight * 0.6, 25);
        });
    });

    // Wax seal on letter
    const waxSeal = document.getElementById('letter-wax-seal');
    if (waxSeal) {
        waxSeal.addEventListener('click', () => {
            aestheticAudio.playChime(783.99);
            aestheticConfetti.burst(window.innerWidth / 2, window.innerHeight * 0.7, 50);
        });
    }

    // On-page Setup Panel Toggle
    const toggleSetupBtn = document.getElementById('toggle-setup-btn');
    const setupPanel = document.getElementById('setup-panel');
    const closeSetupBtn = document.getElementById('close-setup-btn');
    const saveSetupBtn = document.getElementById('save-setup-btn');
    const copyLinkBtn = document.getElementById('copy-link-btn');

    if (toggleSetupBtn && setupPanel) {
        toggleSetupBtn.addEventListener('click', () => {
            setupPanel.classList.toggle('collapsed');
            if (!setupPanel.classList.contains('collapsed')) {
                setupPanel.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    if (closeSetupBtn && setupPanel) {
        closeSetupBtn.addEventListener('click', () => setupPanel.classList.add('collapsed'));
    }

    if (saveSetupBtn) {
        saveSetupBtn.addEventListener('click', () => {
            state.name = document.getElementById('input-name').value.trim() || state.name;
            state.nickname = document.getElementById('input-nick').value.trim() || state.nickname;
            state.age = document.getElementById('input-age').value.trim() || state.age;
            state.letter = document.getElementById('input-letter').value.trim() || state.letter;

            saveState();
            renderAll();
            setupPanel.classList.add('collapsed');
            aestheticAudio.playChime();
            aestheticConfetti.burst();
            alert('✨ Scrapbook updated with your personalized details for Gunnu!');
        });
    }

    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', copyShareLink);
    }

    // Photo Upload Handler (Polaroids)
    const photoInput = document.getElementById('photo-uploader');
    if (photoInput) {
        photoInput.addEventListener('change', handlePhotoUpload);
    }
}

function renderAll() {
    // Dynamic text replacements
    document.querySelectorAll('.var-name').forEach(el => el.innerText = state.name);
    document.querySelectorAll('.var-nick').forEach(el => el.innerText = state.nickname);
    document.querySelectorAll('.var-age').forEach(el => el.innerText = state.age);
    document.querySelectorAll('.var-dob').forEach(el => el.innerText = state.dob);
    document.querySelectorAll('.var-sender').forEach(el => el.innerText = state.sender);

    // Inputs in setup panel
    const inName = document.getElementById('input-name');
    if (inName) inName.value = state.name;
    const inNick = document.getElementById('input-nick');
    if (inNick) inNick.value = state.nickname;
    const inAge = document.getElementById('input-age');
    if (inAge) inAge.value = state.age;
    const inLetter = document.getElementById('input-letter');
    if (inLetter) inLetter.value = state.letter;

    const letterBody = document.getElementById('letter-body');
    if (letterBody) {
        letterBody.innerText = state.letter;
    }

    // Polaroids
    renderPolaroids();
    updateShareLink();
}

function renderPolaroids() {
    const grid = document.getElementById('polaroid-grid');
    if (!grid) return;

    grid.innerHTML = '';
    state.photos.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'polaroid-item';
        card.innerHTML = `
            <div class="polaroid-tape"></div>
            <div class="polaroid-photo-frame">
                ${item.url ? `<img src="${item.url}" class="polaroid-img" alt="Memory with Gunnu">` : `<div class="polaroid-placeholder">${item.placeholder}</div>`}
            </div>
            <div class="polaroid-caption">${item.caption}</div>
        `;

        card.addEventListener('click', () => {
            aestheticAudio.playSoftPop();
            aestheticConfetti.burst(window.innerWidth / 2, window.innerHeight * 0.4, 25);
        });

        grid.appendChild(card);
    });
}

function handlePhotoUpload(e) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).slice(0, 6).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            if (state.photos[index]) {
                state.photos[index].url = event.target.result;
            }
            saveState();
            renderPolaroids();
            aestheticAudio.playChime();
        };
        reader.readAsDataURL(file);
    });
}

let isSpinning = false;
function spinFoodDecider() {
    if (isSpinning) return;
    isSpinning = true;

    const answerEl = document.getElementById('food-answer');
    const subtextEl = document.getElementById('food-subtext');
    let ticks = 0;
    const maxTicks = 12;

    const interval = setInterval(() => {
        const randomOpt = foodOptions[Math.floor(Math.random() * foodOptions.length)];
        answerEl.innerText = randomOpt.text;
        subtextEl.innerText = randomOpt.sub;
        aestheticAudio.playTick();
        ticks++;

        if (ticks >= maxTicks) {
            clearInterval(interval);
            isSpinning = false;
            aestheticAudio.playChime(659.25);
            aestheticConfetti.burst(window.innerWidth / 2, window.innerHeight * 0.5, 40);
        }
    }, 110);
}

function redeemCoupon(card) {
    if (card.classList.contains('redeemed')) return;

    card.classList.add('redeemed');
    const title = card.querySelector('.coupon-title').innerText;
    state.redeemedCoupons.add(title);
    saveState();

    aestheticAudio.playPaperTear();
    aestheticConfetti.burst(window.innerWidth / 2, window.innerHeight * 0.5, 45);

    const btn = card.querySelector('.coupon-btn');
    if (btn) {
        btn.innerText = 'Claimed by Gunnu! (Jakhar must fulfill) 🤍';
    }
}

function updateShareLink() {
    const name = encodeURIComponent(state.name);
    const nick = encodeURIComponent(state.nickname);
    const age = encodeURIComponent(state.age);
    const letter = encodeURIComponent(state.letter);

    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}?name=${name}&nick=${nick}&age=${age}&letter=${letter}`;

    const display = document.getElementById('share-url-text');
    if (display) {
        display.innerText = shareUrl;
    }
}

function copyShareLink() {
    updateShareLink();
    const display = document.getElementById('share-url-text');
    const url = display ? display.innerText : window.location.href;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            alert('💌 Custom link copied! Text it to Gunnu so she can open her 22nd birthday scrapbook!');
        }).catch(() => fallbackCopy(url));
    } else {
        fallbackCopy(url);
    }
}

function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    alert('💌 Custom link copied! Text it to Gunnu!');
}
