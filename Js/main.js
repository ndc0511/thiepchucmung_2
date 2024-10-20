const card = document.querySelector('.card');

let isDown = false;
let startY;

card.addEventListener('touchstart', (e) => {
    isDown = true;
    startY = e.touches[0].clientY;
});

card.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const y = e.touches[0].clientY;
    const moveY = startY - y;
    card.scrollTop += moveY;
    startY = y;
});

card.addEventListener('touchend', () => {
    isDown = false;
});

function shareFacebook() {
            const url = window.location.href;
            const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            window.open(shareUrl, '_blank');
        }
function shareTwitter() {
            const text = "Chúc mừng ngày Phụ nữ Việt Nam 20-10! Cùng lan tỏa yêu thương.";
            const url = window.location.href;
            const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            window.open(shareUrl, '_blank');
        }
        
function shareMessenger() {
    const url = window.location.href;
    const shareUrl = `https://www.messenger.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank');
}


function toggleMessage() {
    const message = document.getElementById('message');
    const button = document.querySelector('.open-letter');
    
    if (message.style.display === 'none' || message.style.display === '') {
        message.style.display = 'block';
        message.style.opacity = '1';
        message.style.transition = 'opacity 0.5s ease';
        button.style.display = 'none'; 
    } else {
        message.style.opacity = '0';
        setTimeout(() => {
            message.style.display = 'none';
            button.style.display = 'block'; 
        }, 500);
    }
}

document.getElementById('message').style.display = 'none';

function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'flex'; 
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'none'; 
    document.querySelector('.card').style.display = 'block'; 
}

showLoadingScreen();

window.addEventListener('load', hideLoadingScreen);
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];
let particles = [];

const fireworkSound = document.getElementById('firework-sound');

function toggleMessage() {
    const message = document.getElementById('message');
    const button = document.querySelector('.open-letter');
    const letterSound = document.getElementById('letter-sound');

    letterSound.volume = 0.5;

    if (message.style.display === 'none' || message.style.display === '') {
        message.style.display = 'block';
        message.style.opacity = '1';
        message.style.transition = 'opacity 0.5s ease';
        button.style.display = 'none';

        setTimeout(() => {
            letterSound.play();
            setInterval(createRandomFirework, 500); 
        }, 2000);
    } else {
        message.style.opacity = '0';
        setTimeout(() => {
            message.style.display = 'none';
            button.style.display = 'block'; 
        }, 500);
    }
}

function createRandomFirework() {
    createFirework(); 
    fireworkSound.currentTime = 0; 
    fireworkSound.play(); 
}

function createFirework() {
    const firework = {
        x: Math.random() * canvas.width,
        y: canvas.height,
        radius: Math.random() * 3 + 1,
        color: 'hsl(' + Math.random() * 360 + ', 100%, 50%)',
        velocity: {
            x: (Math.random() - 0.5) * 4,
            y: -(Math.random() * 3 + 8)
        }
    };
    fireworks.push(firework);
}

function updateFireworks() {
    for (let i = fireworks.length - 1; i >= 0; i--) {
        const firework = fireworks[i];
        firework.x += firework.velocity.x;
        firework.y += firework.velocity.y;

        if (firework.y <= canvas.height / 2) {
            createParticles(firework.x, firework.y);
            fireworks.splice(i, 1);
        }
    }
}

function createParticles(x, y) {
    const particleCount = 100; 
    for (let i = 0; i < particleCount; i++) {
        const particle = {
            x: x,
            y: y,
            radius: Math.random() * 3 + 1,
            color: 'hsl(' + Math.random() * 360 + ', 100%, 50%)',
            velocity: {
                x: (Math.random() - 0.5) * 6,
                y: (Math.random() - 0.5) * 6
            },
            life: 100
        };
        particles.push(particle);
    }
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        particle.life--;

        if (particle.life <= 0) {
            particles.splice(i, 1);
        }
    }
}

let animationId; 

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach(firework => {
        ctx.beginPath();
        ctx.arc(firework.x, firework.y, firework.radius, 0, Math.PI * 2);
        ctx.fillStyle = firework.color;
        ctx.fill();
    });

    particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
    });

    updateFireworks();
    updateParticles();

    animationId = requestAnimationFrame(draw);
}

document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        cancelAnimationFrame(animationId); 
    } else {
        draw(); 
    }
});

draw();