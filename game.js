const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Load images
const birdImg = new Image();
const saladImg = new Image();
birdImg.src = '/pan0nikt.github.io/Cycu.jpg'; // Make sure to provide the correct path
saladImg.src = '/pan0nikt.github.io/Sałatka.png'; // Use a URL to a salad image or a local path

// Game variables
let bird = { x: 50, y: 150, width: 40, height: 40, gravity: 1.5, lift: -25, velocity: 0 };
let pipes = [];
let frame = 0;
const pipeWidth = 50;
const pipeGap = 120;

document.addEventListener('keydown', () => {
    bird.velocity = bird.lift;
});

function drawBird() {
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
    pipes.forEach(pipe => {
        context.drawImage(saladImg, pipe.x, pipe.y, pipeWidth, pipe.height);
        context.drawImage(saladImg, pipe.x, pipe.y + pipe.height + pipeGap, pipeWidth, canvas.height - pipe.height - pipeGap);
    });
}

function update() {
    // Bird physics
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    // Add new pipes
    if (frame % 90 === 0) {
        let pipeHeight = Math.floor(Math.random() * canvas.height / 3) + 20;
        pipes.push({ x: canvas.width, y: 0, height: pipeHeight });
    }

    // Move pipes
    pipes = pipes.map(pipe => ({ ...pipe, x: pipe.x - 2 })).filter(pipe => pipe.x + pipeWidth > 0);

    // Check collisions
    pipes.forEach(pipe => {
        if (
            bird.x < pipe.x + pipeWidth &&
            bird.x + bird.width > pipe.x &&
            (bird.y < pipe.y + pipe.height || bird.y + bird.height > pipe.y + pipe.height + pipeGap)
        ) {
            location.reload(); // Restart game on collision
        }
    });

    // Draw everything
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBird();
    drawPipes();

    // Loop
    frame++;
    requestAnimationFrame(update);
}

// Start game
update();
