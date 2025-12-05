
  const quizData = [
    { question: "What is the capital of France?", options: ["Paris", "Berlin", "Rome", "Madrid"], answer: "Paris" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" }
  ];

  let currentIndex = 0;
  let score = 0;

  const questionEl = document.querySelector('.question');
  const optionsEl = document.querySelector('.options');
  const resultEl = document.getElementById('result');
  const nextBtn = document.getElementById('next');

  function loadQuestion() {
    nextBtn.style.display = 'none';
    resultEl.textContent = '';
    const current = quizData[currentIndex];
    questionEl.textContent = current.question;
    optionsEl.innerHTML = '';
    current.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.textContent = opt;
      btn.addEventListener('click', () => checkAnswer(opt));
      optionsEl.appendChild(btn);
    });
  }

  function checkAnswer(selected) {
    const current = quizData[currentIndex];
    if (selected === current.answer) {
      score++;
      resultEl.textContent = 'Correct!';
    } else {
      resultEl.textContent = `Wrong! Correct answer: ${current.answer}`;
    }
    nextBtn.style.display = 'inline-block';
    Array.from(optionsEl.children).forEach(btn => btn.disabled = true);
  }

  nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= quizData.length) {
      questionEl.textContent = `Quiz completed! Your score: ${score} / ${quizData.length}`;
      optionsEl.innerHTML = '';
      nextBtn.style.display = 'none';
      resultEl.textContent = '';
    } else {
      loadQuestion();
    }
  });

  loadQuestion();
