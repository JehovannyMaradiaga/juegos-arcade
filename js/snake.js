const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let velocity = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;
let gameInterval;

document.addEventListener('keydown', handleKeyPress);
document.getElementById('restart').addEventListener('click', resetGame);

function handleKeyPress(e) {
  switch (e.key) {
    case 'ArrowUp':
      if (velocity.y === 0) velocity = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (velocity.y === 0) velocity = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (velocity.x === 0) velocity = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (velocity.x === 0) velocity = { x: 1, y: 0 };
      break;
  }
}

function gameLoop() {
  const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };

  // Game over if snake hits walls or itself
  if (
    head.x < 0 || head.y < 0 ||
    head.x >= tileCount || head.y >= tileCount ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(gameInterval);
    alert('¡Fin del juego! Tu puntuación: ' + score);
    return;
  }

  snake.unshift(head);

  // Snake eats food
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById('score').innerText = score;
    placeFood();
  } else {
    snake.pop();
  }

  drawGame();
}

function drawGame() {
  // Fondo
  ctx.fillStyle = '#222';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Comida
  ctx.fillStyle = '#f00';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

  // Serpiente
  ctx.fillStyle = '#0f0';
  snake.forEach(segment => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  };

  // Evitar que aparezca sobre la serpiente
  if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
    placeFood();
  }
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  velocity = { x: 0, y: 0 };
  score = 0;
  document.getElementById('score').innerText = score;
  placeFood();
  clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, 120);
}

// Iniciar el juego
resetGame();
