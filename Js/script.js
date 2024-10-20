document.addEventListener('click', function(event) {
    const flowers = [
        'img/flower/fl1.png',
        'img/flower/fl2.png',
        'img/flower/fl3.png'
    ];
    const flower = document.createElement('img');
    flower.src = flowers[Math.floor(Math.random() * flowers.length)];
    flower.classList.add('flower');

    flower.style.left = `${event.clientX - 25}px`;
    flower.style.top = `${event.clientY - 25}px`;
    flower.style.opacity = '0';

    document.getElementById('flowers').appendChild(flower);

    setTimeout(() => {
        flower.style.opacity = '1';
        flower.style.animation = 'fall 2s forwards';
    }, 10);

    flower.addEventListener('animationend', function() {
        flower.remove();
    });
});

function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    const size = Math.random() * 50 + 20;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    bubble.style.left = `${Math.random() * 100}vw`;
    bubble.style.bottom = '0';
    bubble.style.opacity = '0';

    document.getElementById('bubbles').appendChild(bubble);

    setTimeout(() => {
        bubble.style.opacity = '1';
        bubble.style.animation = 'rise 7s forwards';
    }, 10);

    bubble.addEventListener('animationend', function() {
        bubble.remove();
    });
}

setInterval(createBubble, 500);

