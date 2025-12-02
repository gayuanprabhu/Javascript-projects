const board = document.getElementById('board');
  const cells = document.querySelectorAll('.cell');
  const message = document.getElementById('message');
  const resetBtn = document.getElementById('reset');
  let turn = 'X';
  let boardState = Array(9).fill(null);
  let gameOver = false;

  const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
  ];

  function checkWinner() {
    for (let combo of winningCombos) {
      const [a,b,c] = combo;
      if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
        return boardState[a];
      }
    }
    if (boardState.every(cell => cell)) return 'draw';
    return null;
  }

  function handleClick(e) {
    const idx = e.target.dataset.index;
    if (gameOver || boardState[idx]) return;
    boardState[idx] = turn;
    e.target.textContent = turn;
    const winner = checkWinner();
    if (winner) {
      gameOver = true;
      message.textContent = winner === 'draw' ? "It's a draw!" : `${winner} wins!`;
    } else {
      turn = turn === 'X' ? 'O' : 'X';
      message.textContent = `${turn}'s turn`;
    }
  }

  cells.forEach(cell => cell.addEventListener('click', handleClick));

  resetBtn.addEventListener('click', () => {
    boardState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    turn = 'X';
    gameOver = false;
    message.textContent = `${turn}'s turn`;
  });

  message.textContent = `${turn}'s turn`;