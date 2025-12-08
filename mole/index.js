const holes = document.querySelectorAll('.hole');
  const scoreDisplay = document.getElementById('score');
  const startBtn = document.getElementById('start');
  let score = 0;
  let activeMole = null;
  let gameInterval = null;

  function randomHole() {
    const idx = Math.floor(Math.random() * holes.length);
    return holes[idx];
  }

  function showMole() {
    if (activeMole) activeMole.classList.remove('active');
    const hole = randomHole();
    const mole = hole.querySelector('.mole');
    mole.classList.add('active');
    activeMole = mole;
  }

  function startGame() {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    if (gameInterval) clearInterval(gameInterval);
    showMole();
    gameInterval = setInterval(showMole, 1000);
  }

  holes.forEach(hole => {
    hole.querySelector('.mole').addEventListener('click', e => {
      if (!e.target.classList.contains('active')) return;
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      e.target.classList.remove('active');
    });
  });

  startBtn.addEventListener('click', startGame);
