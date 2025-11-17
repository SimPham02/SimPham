// Create particles
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    particlesContainer.appendChild(particle);
}

// Typing effect for title
const originalTitle = document.title;
let titleIndex = 0;
let isDeleting = false;

function typeTitle() {
    if (!isDeleting && titleIndex < originalTitle.length) {
        document.title = originalTitle.substring(0, titleIndex + 1);
        titleIndex++;
        setTimeout(typeTitle, 150);
    } else if (isDeleting && titleIndex > 0) {
        document.title = originalTitle.substring(0, titleIndex - 1);
        titleIndex--;
        setTimeout(typeTitle, 100);
    } else if (titleIndex === originalTitle.length) {
        setTimeout(() => {
            isDeleting = true;
            typeTitle();
        }, 3000);
    } else if (titleIndex === 0) {
        isDeleting = false;
        setTimeout(typeTitle, 500);
    }
}

typeTitle();

// Enter button
const enterBtn = document.getElementById('enterBtn');
const landingPage = document.getElementById('landingPage');
const profileCard = document.getElementById('profileCard');
const bgMusic = document.getElementById('bgMusic');

enterBtn.addEventListener('click', () => {
    landingPage.classList.add('hidden');
    setTimeout(() => {
        profileCard.classList.add('show');
    }, 300);
    
    // Try to play music (might be blocked by browser)
    bgMusic.play().catch(e => console.log('Audio playback failed:', e));
});

// Nếu file này đã có logic khác, thay phần init VanillaTilt bằng đoạn sau
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('[data-tilt]');
    const mobileBreakpoint = 768;

    function initTilt() {
        if (typeof VanillaTilt === 'undefined') return;
        cards.forEach(el => {
            if (window.innerWidth > mobileBreakpoint) {
                if (!el.vanillaTilt) {
                    VanillaTilt.init(el, {
                        max: 15,
                        speed: 400,
                        glare: true,
                        "max-glare": 0.2
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