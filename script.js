const scores = {
  xWins: JSON.parse(localStorage.getItem('xWins')) || 0,
  oWins: JSON.parse(localStorage.getItem('oWins')) || 0,
  ties: JSON.parse(localStorage.getItem('ties')) || 0
};

const winsXElement = document.getElementById("xWins");
const winsOElement = document.getElementById("oWins");
const tiesElement = document.getElementById("ties");

const startButton = document.querySelector(".js-start-button");
startButton.addEventListener("click", () => startGame('play'));

const scoreButton = document.querySelector(".js-score-button");
scoreButton.addEventListener("click", startGame);

const restartButton = document.querySelector(".js-restart-button");
restartButton.addEventListener('click', () => {
  remainingBlocks.fill(null);
  allSquares.forEach(square => {
    square.innerText = '';
    square.disabled = false;
    square.style.cursor = '';
    square.style.backgroundColor = '';
    currentPlayer = symbol_X;
  })
  console.log(scores);
});

const restartScoreButton = document.querySelector('.js-remove-scores-button');
restartScoreButton.addEventListener('click', () => {
  const msg = confirm("Are you sure you want to reset the score?");
  if(msg){
    scores.oWins = 0;
    scores.xWins = 0;
    scores.ties = 0;
    saveScore();
    updateDisplayScores();
    console.log(scores);
  }
});

const returnButton = document.querySelectorAll(".js-return-button");
returnButton.forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".grid-container").style.display = 'none';
    document.querySelector(".score-container").style.display = 'none';
    document.querySelector(".menu").style.display = 'block';
  })
});

const allSquares = document.querySelectorAll('.block');
const symbol_O = "O";
const symbol_X = "X";
let currentPlayer = symbol_X;
const remainingBlocks = Array(9).fill(null);

function startGame(action) {
  document.querySelector(".menu").style.display = 'none';
  if(action === 'play'){
    document.querySelector(".grid-container").style.display = 'block';
  }else{
    updateDisplayScores();
    document.querySelector(".score-container").style.display = 'block';
  }
}

const posVitoria = [
  //horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  //vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  //diagonal
  [0, 4, 8],
  [2, 4, 6]
];

const playerHasWon = () => {
  for (const chance of posVitoria) {
    let [a, b, c] = chance;

    if(remainingBlocks[a] && remainingBlocks[a] === remainingBlocks[b] && remainingBlocks[a] === remainingBlocks[c]){
      return [a, b, c];
    }
  }
  return false;
};

const squareClicked = (square, e) => {
  const id = e.target.id;

  if(!remainingBlocks[id]){
    remainingBlocks[id] = currentPlayer;
    square.innerText = currentPlayer;
    square.disabled = true;
    square.style.cursor = 'default';

    if(playerHasWon() !== false){
      let winning_blocks = playerHasWon();
      winning_blocks.map(square => allSquares[square].style.backgroundColor = 'black');

      if(currentPlayer === symbol_X){
        scores.xWins++;
        saveScore();
      } else{
        scores.oWins++;
        saveScore();
      }

      console.log(scores);

      allSquares.forEach(square => {
        square.disabled = true;
        square.style.cursor = 'default';
      })
    }
    currentPlayer = currentPlayer === symbol_X ? symbol_O : symbol_X;
  }
};

const numberOfBlocks = [];
let cont = 0;
allSquares.forEach(square => {
  square.addEventListener('click', (e) => {
    squareClicked(square, e);
    numberOfBlocks.push(cont);
    cont++;

    if(numberOfBlocks.length === 9){
      scores.ties++;
      saveScore();
      console.log(scores);
    }
  })
});

function saveScore(){
  localStorage.setItem('xWins', JSON.stringify(scores.xWins));
  localStorage.setItem('oWins', JSON.stringify(scores.oWins));
  localStorage.setItem('ties', JSON.stringify(scores.ties));
}

function updateDisplayScores() {
  winsXElement.innerHTML = scores.xWins;
  winsOElement.innerHTML = scores.oWins;
  tiesElement.innerHTML = scores.ties;
}