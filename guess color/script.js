
  const colorBox = document.getElementById('colorBox');
  const guessInput = document.getElementById('guess');
  const checkBtn = document.getElementById('checkBtn');
  const message = document.getElementById('message');
  const newColorBtn = document.getElementById('newColor');

  let currentColor = '';

  function getRandomColor() {
    const r = Math.floor(Math.random()*256);
    const g = Math.floor(Math.random()*256);
    const b = Math.floor(Math.random()*256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function startGame() {
    currentColor = getRandomColor();
    colorBox.style.backgroundColor = currentColor;
    message.textContent = '';
    guessInput.value = '';
  }

  checkBtn.addEventListener('click', () => {
    const guess = guessInput.value.replace(/\s+/g, '');
    if (!/^(\d{1,3}),(\d{1,3}),(\d{1,3})$/.test(guess)) {
      message.textContent = 'Please enter RGB in the format: R,G,B';
      return;
    }
    if (guess === currentColor.replace(/\s+/g, '').slice(4, -1)) {
      message.textContent = 'Correct! 🎉';
    } else {
      message.textContent = `Wrong! The color was ${currentColor}`;
    }
  });

  newColorBtn.addEventListener('click', startGame);

  startGame();
