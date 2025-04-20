// Obtener referencias a las pantallas
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const gameOverScreen = document.getElementById("game-over-screen");
const levelCompleteScreen = document.getElementById("level-complete-screen");

// Botones
const startButton = document.getElementById("start-button");
const retryButton = document.getElementById("retry-button");
const nextLevelButton = document.getElementById("next-level-button");

// Canvas y contexto
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// HUD
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const levelDisplay = document.getElementById("level");

// Variables del juego
let mario = {
  x: 50,
  y: canvas.height - 70,
  width: 40,
  height: 40,
  speed: 5,
};

let score = "Puntos: 0";
let lives = "Vidas: 3";
let level = "Nivel: 1";
let keys = {};

// Inicializar juego
startButton.addEventListener("click", () => {
  startScreen.classList.remove("active");
  gameScreen.classList.add("active");
  initGame();
});

retryButton.addEventListener("click", () => {
  gameOverScreen.classList.remove("active");
  gameScreen.classList.add("active");
  resetGame();
});

nextLevelButton.addEventListener("click", () => {
  levelCompleteScreen.classList.remove("active");
  gameScreen.classList.add("active");
  level++;
  resetGame();
});

// Movimiento con teclado
document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});
document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// Iniciar y actualizar juego
function initGame() {
  updateHUD();
  requestAnimationFrame(updateGame);
}

function updateGame() {
  clearCanvas();
  moveMario();
  drawMario();

  requestAnimationFrame(updateGame);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawMario() {
  ctx.fillStyle = "red";
  ctx.fillRect(mario.x, mario.y, mario.width, mario.height);
}

function moveMario() {
  if (keys["ArrowRight"] && mario.x + mario.width < canvas.width) {
    mario.x += mario.speed;
  }
  if (keys["ArrowLeft"] && mario.x > 0) {
    mario.x -= mario.speed;
  }
  if (keys["ArrowUp"] && mario.y > 0) {
    mario.y -= mario.speed;
  }
  if (keys["ArrowDown"] && mario.y + mario.height < canvas.height) {
    mario.y += mario.speed;
  }
}

// Reiniciar juego
function resetGame() {
  mario.x = 50;
  mario.y = canvas.height - 70;
  score = 0;
  lives = 3;
  updateHUD();
}

// Actualizar datos en HUD
function updateHUD() {
  scoreDisplay.textContent = score;
  livesDisplay.textContent = lives;
  levelDisplay.textContent = level;
}

