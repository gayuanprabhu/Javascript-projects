
  const game = document.getElementById('game');
  const message = document.getElementById('message');
  const resetBtn = document.getElementById('reset');

  const symbols = ['🍎','🍌','🍇','🍒','🍉','🍍','🥝','🍑'];
  let cards = [...symbols, ...symbols];
  let flipped = [];
  let matched = 0;
  let lock = false;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function createCards() {
    game.innerHTML = '';
    cards = shuffle(cards);
    cards.forEach((symbol, i) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.symbol = symbol;
      card.textContent = symbol;
      card.style.color = 'transparent';
      card.addEventListener('click', () => flipCard(card));
      game.appendChild(card);
    });
  }

  function flipCard(card) {
    if (lock || card.classList.contains('flipped') || card.classList.contains('matched')) return;
    card.classList.add('flipped');
    card.style.color = 'black';
    flipped.push(card);

    if (flipped.length === 2) {
      lock = true;
      if (flipped[0].dataset.symbol === flipped[1].dataset.symbol) {
        flipped.forEach(c => c.classList.add('matched'));
        matched += 2;
        message.textContent = 'Match found!';
        flipped = [];
        lock = false;
        if (matched === cards.length) {
          message.textContent = 'You won! 🎉';
        }
      } else {
        message.textContent = 'No match, try again.';
        setTimeout(() => {
          flipped.forEach(c => {
            c.classList.remove('flipped');
            c.style.color = 'transparent';
          });
          flipped = [];
          lock = false;
          message.textContent = '';
        }, 1000);
      }
    }
  }

  resetBtn.addEventListener('click', () => {
    matched = 0;
    flipped = [];
    lock = false;
    message.textContent = '';
    createCards();
  });

  createCards();
