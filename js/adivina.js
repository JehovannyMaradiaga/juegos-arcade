// Adivina el Número 🎯

const min = 1;
const max = 100;
let secretNumber = Math.floor(Math.random() * (max - min + 1)) + min; // Número secreto
let attempts = 0;

// Referencias a elementos DOM
let guessInput = document.getElementById('guess');
let feedback = document.getElementById('feedback');
let guessBtn = document.getElementById('guessBtn');
let restartBtn = document.getElementById('restartBtn');

// Mostrar el número de intentos
function displayAttempts() {
  let attemptsMessage = `Número de intentos: ${attempts}`;
  feedback.innerHTML = attemptsMessage;
}

// Función para verificar la respuesta del jugador
function checkGuess() {
  let userGuess = parseInt(guessInput.value);  // Obtener el número ingresado
  
  // Verificar si el valor ingresado es un número
  if (isNaN(userGuess)) {
    feedback.innerHTML = "¡Por favor, ingresa un número válido!";
    feedback.style.color = "red";
    return;
  }

  attempts++;  // Aumentar el contador de intentos

  // Comprobar si el número es correcto
  if (userGuess === secretNumber) {
    feedback.innerHTML = `¡Felicidades! Has adivinado el número en ${attempts} intentos.`;
    feedback.style.color = "green";
    guessBtn.disabled = true;  // Desactivar el botón de adivinanza
  } else if (userGuess < secretNumber) {
    feedback.innerHTML = "¡El número es más alto! Intenta nuevamente.";
    feedback.style.color = "orange";
  } else {
    feedback.innerHTML = "¡El número es más bajo! Intenta nuevamente.";
    feedback.style.color = "orange";
  }

  displayAttempts();  // Actualizar intentos
  guessInput.value = '';  // Limpiar el campo de entrada
}

// Evento de click en el botón de adivinar
guessBtn.addEventListener('click', checkGuess);

// Evento de reiniciar el juego
restartBtn.addEventListener('click', () => {
  secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;  // Generar nuevo número secreto
  attempts = 0;  // Restablecer intentos
  guessInput.value = '';  // Limpiar entrada
  feedback.innerHTML = '';  // Limpiar feedback
  guessBtn.disabled = false;  // Habilitar el botón
  displayAttempts();  // Restablecer el contador de intentos
});

// Volver al menú de juegos
const backLink = document.getElementById('back-link');
backLink.addEventListener('click', () => {
  window.location.href = "../index.html";  // Volver al menú principal
});
