// Lógica del Juego Tres en Raya

let currentPlayer = 'X';  // Empieza el jugador X
let gameBoard = ['', '', '', '', '', '', '', '', ''];  // Tablero vacío
let gameOver = false;

// Referencias a los elementos del DOM
const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('current-player');
const resultDisplay = document.getElementById('result');
const restartBtn = document.getElementById('restart-btn');

// Comprobamos las combinaciones ganadoras
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Función para manejar un clic en una celda
function handleClick(index) {
  if (gameBoard[index] !== '' || gameOver) return;

  // Colocamos el símbolo del jugador actual
  gameBoard[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  // Verificar si hay un ganador
  if (checkWinner()) {
    resultDisplay.textContent = `¡${currentPlayer} gana!`;
    gameOver = true;
  } else if (gameBoard.every(cell => cell !== '')) {
    // Empate si todas las celdas están llenas
    resultDisplay.textContent = 'Empate';
    gameOver = true;
  } else {
    // Cambiar al siguiente jugador
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayerDisplay.textContent = currentPlayer;
  }
}

// Comprobar si hay un ganador
function checkWinner() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c] && gameBoard[a] !== '';
  });
}

// Añadir eventos a las celdas
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleClick(index));
});

// Reiniciar el juego
function restartGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameOver = false;
  currentPlayer = 'X';
  currentPlayerDisplay.textContent = currentPlayer;
  resultDisplay.textContent = '';
  cells.forEach(cell => cell.textContent = '');
}

// Evento para el botón de reiniciar
restartBtn.addEventListener('click', restartGame);

// Volver al menú de juegos
const backLink = document.getElementById('back-link');
backLink.addEventListener('click', () => {
  window.location.href = "../index.html";  // Volver al menú principal
});
