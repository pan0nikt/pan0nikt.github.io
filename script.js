const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let score = 0;
let timeLeft = 15 * 60; 
let isGameOver = false;

document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('leaderboard-button').addEventListener('click', showLeaderboard);
document.getElementById('back-button').addEventListener('click', backToMenu);

function startGame() {
    document.querySelector('.menu').style.display = 'none';
    document.querySelector('.game-container').style.display = 'block';
    score = 0;
    timeLeft = 15 * 60;
    isGameOver = false;
    gameLoop();
}

function showLeaderboard() {
    document.querySelector('.menu').style.display = 'none';
    document.querySelector('.leaderboard').style.display = 'block';
    updateLeaderboard();
}

function backToMenu() {
    document.querySelector('.leaderboard').style.display = 'none';
    document.querySelector('.menu').style.display = 'block';
}

function gameLoop() {
    if (isGameOver) return;

    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    updateGame();

    
    drawGame();

    
    document.getElementById('score').innerText = `Score: ${score}`;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('time').innerText = `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;

    if (timeLeft > 0) {
        timeLeft--;
        requestAnimationFrame(gameLoop);
    } else {
        endGame();
    }
}

function updateGame() {
    
}

function drawGame() {
    
}

function endGame() {
    isGameOver = true;
    alert(`Game Over! Your score: ${score}`);
    saveScore(score);
    showLeaderboard();
}

function saveScore(score) {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push(score);
    leaderboard.sort((a, b) => b - a);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard.slice(0, 10))); 
}

function updateLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = leaderboard.map(score => `<li>${score}</li>`).join('');
}
