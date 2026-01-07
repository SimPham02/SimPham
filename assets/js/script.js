// Create particles
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 70; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.width = (Math.random() * 3 + 1) + 'px';
    particle.style.height = particle.style.width;
    particle.style.animationDuration = (Math.random() * 5 + 3) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.opacity = Math.random();
    particlesContainer.appendChild(particle);
}

// Cyber Glitch Effect for symbols
function hackerEffect(event) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
    let iterations = 0;
    const originalText = event.target.dataset.value || event.target.innerText;
    
    // Clear existing interval if any to prevent jitter
    if (event.target.hackerInterval) {
        clearInterval(event.target.hackerInterval);
    }

    // Store original if not already stored
    if (!event.target.dataset.value) event.target.dataset.value = originalText;

    event.target.hackerInterval = setInterval(() => {
        event.target.innerText = event.target.innerText.split("")
            .map((letter, index) => {
                if (index < iterations) {
                    return originalText[index];
                }
                return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("");

        if (iterations >= originalText.length) {
            clearInterval(event.target.hackerInterval);
            event.target.hackerInterval = null;
        }
        iterations += 1 / 3;
    }, 30);
}

// Add effect to name and badges
document.addEventListener('DOMContentLoaded', () => {
    // Cinematic Intro Sequence
    const loaderLogs = document.getElementById('loaderLogs');
    const loaderBar = document.getElementById('loaderBar');
    const loaderPercent = document.getElementById('loaderPercent');
    const systemLoader = document.querySelector('.system-loader');
    const btnContainer = document.getElementById('btnContainer');

    const logs = [
        "[INFO] Initializing SimPham OS v2.0...",
        "[OK] Kernel loaded successfully.",
        "[INFO] Establishing neural link...",
        "[WARN] Interference detected. Re-routing...",
        "[OK] Connection stable.",
        "[INFO] Loading bio-metrics database...",
        "[INFO] Accessing encrypted repositories...",
        "[OK] Identity verified: Sim Pham",
        "[INFO] Finalizing system modules...",
        "WELCOME AGENT."
    ];

    let currentLog = 0;
    let progress = 0;

    function runIntro() {
        const interval = setInterval(() => {
            progress += Math.random() * 5;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Show button after a small delay
                setTimeout(() => {
                    systemLoader.style.display = 'none';
                    btnContainer.style.display = 'block';
                    btnContainer.style.animation = 'glitch-flash 0.5s ease-out';
                }, 800);
            }
            
            loaderBar.style.width = progress + '%';
            loaderPercent.innerText = Math.floor(progress) + '%';
            
            // Add logs periodically
            if (progress > (currentLog + 1) * (100 / logs.length) && currentLog < logs.length) {
                const logEntry = document.createElement('div');
                logEntry.innerText = logs[currentLog];
                logEntry.style.animation = 'text-slide-up 0.3s ease-out';
                loaderLogs.prepend(logEntry);
                currentLog++;
            }
        }, 80);
    }

    runIntro();

    const nameElement = document.querySelector('.name');
    nameElement.addEventListener('mouseover', hackerEffect);
    
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => badge.addEventListener('mouseover', hackerEffect));
});

// Typing effect for title
const titles = ["ANALYZING...", "BIOMETRICS OK", "SYSTEM ONLINE", "SIM PHAM OS"];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let currentTitle = 0;

function typeTitle() {
    const fullText = titles[currentTitle];
    
    if (!isDeleting && charIndex < fullText.length) {
        document.title = fullText.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeTitle, 100);
    } else if (isDeleting && charIndex > 0) {
        document.title = fullText.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeTitle, 50);
    } else if (charIndex === fullText.length) {
        setTimeout(() => {
            isDeleting = true;
            typeTitle();
        }, 2000);
    } else if (charIndex === 0) {
        isDeleting = false;
        currentTitle = (currentTitle + 1) % titles.length;
        setTimeout(typeTitle, 500);
    }
}

typeTitle();

// Enter button
const enterBtn = document.getElementById('enterBtn');
const landingPage = document.getElementById('landingPage');
const bgMusic = document.getElementById('bgMusic');
const screenWipe = document.getElementById('screenWipe');
const allCards = document.querySelectorAll('.profile-card');

// Audio Controls
const playPauseBtn = document.getElementById('playPauseBtn');
const volumeSlider = document.getElementById('volumeSlider');
const volPercent = document.getElementById('volPercent');
const audioStatus = document.getElementById('audioStatus');
const vBars = document.querySelectorAll('.v-bar');

function updateAudioUI() {
    if (bgMusic.paused) {
        playPauseBtn.querySelector('.btn-text').innerText = "PLAY";
        playPauseBtn.querySelector('.btn-glitch').innerText = "START";
        audioStatus.innerText = "HALTED";
        vBars.forEach(bar => bar.style.animationPlayState = 'paused');
    } else {
        playPauseBtn.querySelector('.btn-text').innerText = "PAUSE";
        playPauseBtn.querySelector('.btn-glitch').innerText = "STOP";
        audioStatus.innerText = "TRANSMITTING";
        vBars.forEach(bar => bar.style.animationPlayState = 'running');
    }
}

playPauseBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
    } else {
        bgMusic.pause();
    }
    updateAudioUI();
});

volumeSlider.addEventListener('input', (e) => {
    const val = e.target.value;
    bgMusic.volume = val;
    volPercent.innerText = Math.floor(val * 100) + '%';
});

enterBtn.addEventListener('click', () => {
    // Stage 1: Screen Wipe
    screenWipe.classList.add('active');
    
    setTimeout(() => {
        landingPage.classList.add('hidden');
        
        // Stage 2: Staggered entrance for all cards
        allCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.classList.add('access-granted', 'show');
                
                // Allow interactions after entrance finish
                card.addEventListener('animationend', () => {
                    card.classList.remove('access-granted');
                    // We don't reset transform here, tilt will handle it on next move
                }, { once: true });
            }, index * 150); 
        });
        
        // Stage 3: Audio playback
        bgMusic.play().then(() => {
            updateAudioUI();
        }).catch(e => console.log('Audio playback failed:', e));
    }, 700); 
});

// VanillaTilt Initialization
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('[data-tilt]');
    const mobileBreakpoint = 768;

    function initTilt() {
        if (typeof VanillaTilt === 'undefined') return;
        cards.forEach(el => {
            if (window.innerWidth > mobileBreakpoint) {
                if (!el.vanillaTilt) {
                    const isProfile = el.id === 'profileCard';
                    VanillaTilt.init(el, {
                        max: isProfile ? 10 : 20,
                        speed: 1000,
                        glare: true,
                        "max-glare": isProfile ? 0.3 : 0.15,
                        scale: isProfile ? 1.05 : 1.02,
                        perspective: 1500,
                        easing: "cubic-bezier(.03,.98,.52,.99)"
                    });
                }
            } else {
                if (el.vanillaTilt && typeof el.vanillaTilt.destroy === 'function') {
                    el.vanillaTilt.destroy();
                }
            }
        });
    }

    // init once and on resize (debounced)
    initTilt();
    let rTimer;
    window.addEventListener('resize', () => {
        clearTimeout(rTimer);
        rTimer = setTimeout(initTilt, 200);
    });

    // touch feedback: thêm/xóa class để tạm dừng float animation trên mobile
    cards.forEach(card => {
        card.addEventListener('touchstart', () => card.classList.add('touch-pressed'), {passive: true});
        card.addEventListener('touchend', () => card.classList.remove('touch-pressed'), {passive: true});
        card.addEventListener('touchcancel', () => card.classList.remove('touch-pressed'), {passive: true});
    });
});