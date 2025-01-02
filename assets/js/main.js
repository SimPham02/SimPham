function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    const animationDuration = Math.random() * 5 + 5; // 5-10 giây
    particle.style.animationDuration = animationDuration + 's';
    
    document.querySelector('.particles-container').appendChild(particle);
    setTimeout(() => {
        particle.remove();
    }, animationDuration * 1000);
}
setInterval(createParticle, 300);

document.addEventListener('DOMContentLoaded', function() {
    const text = document.title;
    let index = 1;
    
    function typeWriter() {
        if (index < text.length) {
            document.title = text.charAt(0) + text.slice(1, index + 1);
            index++;
            setTimeout(typeWriter, 150);
        } 
        else {
            setTimeout(() => {
                let deleteText = () => {
                    if (document.title.length > 1) {
                        document.title = document.title.slice(0, -1);
                        setTimeout(deleteText, 100);
                    } else {
                        index = 1;
                        setTimeout(typeWriter, 500);
                    }
                };
                deleteText();
            }, 5000);
        }
    }
    
    document.title = text.charAt(0);
    typeWriter();
});

document.querySelector('.click-me-btn').addEventListener('click', () => {
    document.getElementById('landingPage').style.display = 'none';
    document.getElementById('profileHeader').classList.remove('hidden');
    const audio = document.getElementById('bgMusic');
    audio.play();
});

document.querySelector('.profile-header').addEventListener('animationend', function(e) {
    this.classList.remove('scale-animation');
});

