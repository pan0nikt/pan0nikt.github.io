const countdownElement = document.getElementById('countdown');
const earthElement = document.getElementById('earth');
const gameContainer = document.getElementById('game-container');
const gameCanvas = document.getElementById('game-canvas');
let clickCount = 0;
const clicksNeeded = 10;

// Paths to image assets
const snakeHeadImgSrc = 'snake-head.png'; // Replace with actual path or URL
const appleImgSrc = 'apple.png';   // Replace with actual path or URL

let snakeHeadImg, appleImg;

// Check if end date is already in localStorage
let endDate = localStorage.getItem('endDate');

if (!endDate) {
  // If not, set end date to 7 days from now and store it in localStorage
  endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);
  localStorage.setItem('endDate', endDate.toISOString());
} else {
  // If end date exists in localStorage, parse it
  endDate = new Date(endDate);
}

function updateCountdown() {
  const now = new Date();
  const timeLeft = endDate - now;
  
  if (timeLeft < 0) {
    // Countdown has ended
    countdownElement.innerHTML = "Countdown ended!";
    localStorage.removeItem('endDate'); // Remove endDate from localStorage
    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
  countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Update the countdown every second
const interval = setInterval(updateCountdown, 1000);

// Initial call to display the countdown immediately
updateCountdown();

// Handle clicks on the Earth
earthElement.addEventListener('click', () => {
  clickCount++;
  if (clickCount >= clicksNeeded) {
    showGame();
  }
});

function showGame() {
  // Show the game container
  gameContainer.classList.remove('hidden');
  // Initialize the game
  initGame();
}

function initGame() {
  const ctx = gameCanvas.getContext('2d');
  const scale = 20;
  const rows = gameCanvas.height / scale;
  const columns = gameCanvas.width / scale;
  
  let snake = [];
  let snakeLength = 0;
  let food = {};
  let dx = scale;
  let dy = 0;
  
  // Load images
  snakeHeadImg = new Image();
  snakeHeadImg.src = snakeHeadImgSrc;

  appleImg = new Image();
  appleImg.src = appleImgSrc;

  // Wait for images to load
  snakeHeadImg.onload = () => {
    appleImg.onload = () => {
      init();
    };
  };

  function init() {
    snake = [];
    snakeLength = 0;
    for (let i = 0; i < 5; i++) {
      snake.push({ x: i * scale, y: 0 });
    }
    food = {
      x: Math.floor(Math.random() * columns) * scale,
      y: Math.floor(Math.random() * rows) * scale
    };
    dx = scale;
    dy = 0;
    document.addEventListener('keydown', changeDirection);
    gameLoop();
  }

  function gameLoop() {
    setTimeout(() => {
      clearCanvas();
      drawFood();
      moveSnake();
      drawSnake();
      checkCollision();
      gameLoop();
    }, 100);
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  }

  function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
      ctx.drawImage(snakeHeadImg, snake[i].x, snake[i].y, scale, scale);
    }
  }

  function drawFood() {
    ctx.drawImage(appleImg, food.x, food.y, scale, scale);
  }

  function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      food = {
        x: Math.floor(Math.random() * columns) * scale,
        y: Math.floor(Math.random() * rows) * scale
      };
    } else {
      snake.pop();
    }
  }

  function changeDirection(event) {
    switch (event.keyCode) {
      case 37: // Left arrow
        if (dx === 0) {
          dx = -scale;
          dy = 0;
        }
        break;
      case 38: // Up arrow
        if (dy === 0) {
          dx = 0;
          dy = -scale;
        }
        break;
      case 39: // Right arrow
        if (dx === 0) {
          dx = scale;
          dy = 0;
        }
        break;
      case 40: // Down arrow
        if (dy === 0) {
          dx = 0;
          dy = scale;
        }
        break;
    }
  }

  function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= gameCanvas.width || head.y < 0 || head.y >= gameCanvas.height) {
      alert('Game Over');
      document.location.reload();
    }
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        alert('Game Over');
        document.location.reload();
      }
    }
  }
}
