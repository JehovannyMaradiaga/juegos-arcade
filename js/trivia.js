const questions = [
    {
      question: "¿Cuál es la capital de Francia?",
      options: ["Madrid", "París", "Berlín", "Londres"],
      answer: "París"
    },
    {
      question: "¿Qué planeta es conocido como el planeta rojo?",
      options: ["Marte", "Júpiter", "Venus", "Saturno"],
      answer: "Marte"
    },
    {
      question: "¿Quién escribió 'Cien años de soledad'?",
      options: ["Pablo Neruda", "Mario Vargas Llosa", "Gabriel García Márquez", "Jorge Luis Borges"],
      answer: "Gabriel García Márquez"
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  
  const questionBox = document.getElementById("question-box");
  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options-container");
  const nextBtn = document.getElementById("next-btn");
  const resultBox = document.getElementById("result-box");
  const scoreText = document.getElementById("score-text");
  
  function showQuestion() {
    const q = questions[currentQuestion];
    questionText.textContent = q.question;
    optionsContainer.innerHTML = "";
  
    q.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.classList.add("option-btn");
      btn.addEventListener("click", () => selectOption(btn, option));
      optionsContainer.appendChild(btn);
    });
  
    nextBtn.disabled = true;
  }
  
  function selectOption(button, selected) {
    const buttons = document.querySelectorAll(".option-btn");
    buttons.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
  
    nextBtn.disabled = false;
    button.dataset.selected = selected;
  }
  
  nextBtn.addEventListener("click", () => {
    const selectedBtn = document.querySelector(".option-btn.selected");
    const selectedAnswer = selectedBtn?.dataset.selected;
  
    if (selectedAnswer === questions[currentQuestion].answer) {
      score++;
    }
  
    currentQuestion++;
  
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });
  
  function showResult() {
    questionBox.classList.add("hidden");
    resultBox.classList.remove("hidden");
    scoreText.textContent = `Tu puntaje final es ${score} de ${questions.length}`;
  }
  
  // Iniciar
  showQuestion();
  