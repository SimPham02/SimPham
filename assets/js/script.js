document.addEventListener('DOMContentLoaded', () => {
    // 0. Gate and Global Logic
    const gate = document.getElementById('welcomeGate');
    const enterBtn = document.getElementById('enterBtn');
    const loader = document.getElementById('loaderWrapper');
    const loadText = document.getElementById('loadingText');
    const container = document.getElementById('mainContent');
    const musicPlayer = document.getElementById('musicPlayer');
    const audio = document.getElementById('bgMusic');
    const playBtn = document.getElementById('playBtn');
    const visualizer = document.getElementById('visualizer');

    let isMusicPlaying = false;
    
    // Start everything on Enter click
    enterBtn.addEventListener('click', () => {
        // Prime audio - "Mở khóa" âm thanh bằng cách phát rồi tạm dừng ngay lập tức
        // Điều này đảm bảo trình duyệt cho phép phát nhạc tự động sau khi load xong
        audio.play().then(() => {
            audio.pause();
            audio.currentTime = 0;
        }).catch(e => console.log("Audio primer:", e));

        // Fade Gate
        gate.classList.add('fade-out');
        
        // Start Loader Progress after a small delay
        setTimeout(startLoading, 500);
    });

    function startLoading() {
        let progress = 0;
        const loadInterval = setInterval(() => {
            progress += Math.floor(Math.random() * 15) + 5;
            if (progress > 100) {
                progress = 100;
                clearInterval(loadInterval);
                setTimeout(hideLoader, 500);
            }
            loadText.textContent = progress + '%';
        }, 150);
    }

    function hideLoader() {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            container.classList.remove('hidden');
            musicPlayer.classList.add('show');

            // Phát nhạc sau khi giao diện chính đã hiển thị
            audio.play().then(() => {
                isMusicPlaying = true;
                visualizer.classList.add('active');
                updatePlayIcon(true);
            }).catch(e => {
                console.error("Phát nhạc thất bại sau khi load:", e);
                isMusicPlaying = false;
                visualizer.classList.remove('active');
                updatePlayIcon(false);
            });
        }, 1000);
    }

    // 2. Stardust Canvas Particles
    const canvas = document.getElementById('stardustCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function initCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random();
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < 150; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', initCanvas);
    initCanvas();
    createParticles();
    animate();

    // 4. Music Player Logic
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            visualizer.classList.add('active');
            updatePlayIcon(true);
        } else {
            audio.pause();
            visualizer.classList.remove('active');
            updatePlayIcon(false);
        }
    });

    function updatePlayIcon(isPlaying) {
        if (isPlaying) {
            playBtn.innerHTML = '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width:20px"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
        } else {
            playBtn.innerHTML = '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width:20px"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
        }
    }

    // 6. Vanilla Tilt Initializer
    if (window.VanillaTilt) {
        VanillaTilt.init(document.querySelector(".glass-card"), {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    }
});
