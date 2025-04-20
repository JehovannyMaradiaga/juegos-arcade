// Juego de Memoria 🧠

let cards = [
    '🍎', '🍎',
    '🍌', '🍌',
    '🍓', '🍓',
    '🍇', '🍇',
    '🍊', '🍊',
    '🍉', '🍉',
    '🍍', '🍍',
    '🍑', '🍑'
  ];
  
  let flippedCards = [];
  let matchedCards = [];
  let attempts = 0;
  
  // Referencias a elementos DOM
  const memoryBoard = document.getElementById('memory-board');
  const attemptsDisplay = document.getElementById('attempts');
  const restartBtn = document.getElementById('restartBtn');
  
  // Mezclar las cartas al azar
  function shuffleCards() {
    cards = cards.sort(() => Math.random() - 0.5);
  }
  
  // Crear el tablero de cartas
  function createBoard() {
    memoryBoard.innerHTML = '';
    cards.forEach((card, index) => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.dataset.index = index;
      cardElement.addEventListener('click', flipCard);
      memoryBoard.appendChild(cardElement);
    });
  }
  
  // Voltear la carta
  function flipCard() {
    const cardElement = this;
    const cardIndex = cardElement.dataset.index;
    
    if (flippedCards.length === 2 || flippedCards.includes(cardElement)) {
      return;
    }
    
    cardElement.classList.add('flipped');
    cardElement.textContent = cards[cardIndex];
    
    flippedCards.push(cardElement);
    
    // Comprobar si las dos cartas son iguales
    if (flippedCards.length === 2) {
      attempts++;
      attemptsDisplay.textContent = `Intentos: ${attempts}`;
      
      if (cards[flippedCards[0].dataset.index] === cards[flippedCards[1].dataset.index]) {
        matchedCards.push(...flippedCards);
        flippedCards = [];
        
        // Comprobar si se ha ganado
        if (matchedCards.length === cards.length) {
          setTimeout(() => {
            alert(`¡Felicidades! Has ganado en ${attempts} intentos.`);
          }, 300);
        }
      } else {
        setTimeout(() => {
          flippedCards.forEach(card => card.classList.remove('flipped'));
          flippedCards = [];
        }, 1000);
      }
    }
  }
  
  // Reiniciar el juego
  function restartGame() {
    attempts = 0;
    flippedCards = [];
    matchedCards = [];
    shuffleCards();
    createBoard();
    attemptsDisplay.textContent = `Intentos: ${attempts}`;
  }
  
  // Configuración inicial
  shuffleCards();
  createBoard();
  restartBtn.addEventListener('click', restartGame);
  
  // Volver al menú de juegos
  const backLink = document.getElementById('back-link');
  backLink.addEventListener('click', () => {
    window.location.href = "../index.html";  // Volver al menú principal
  });
  