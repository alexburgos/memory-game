require('../styles/index.scss');

/**
 * A simple card memory game using a Javascript class
 * @param {Array} cards - An array of card nodes
 */

class Schmemory {
  constructor(cards) {
    this.cards = cards;
    this.matchCount = 0;
    this.firstCard = null;
    this.secondCard = null;
    this.hasFlippedCard = false;
    this.lockBoard = false;
    this.timeRemaining = 0;
    this.timer = document.querySelectorAll('.time-remaining')[0];
    this.counter = document.querySelectorAll('.count-text')[0];
    this.interval = null;
    this.gameOverScreen = document.querySelector('.Schmemory-overlay.game-over');
    this.victoryScreen = document.querySelector('.Schmemory-overlay.victory');
  }

  startGame() {
    this.shuffleCards();
    this.cards.forEach(card => card.addEventListener('click', this.flipCard));
    this.timeRemaining = 60;
    this.counter.innerHTML = this.matchCount;
    this.timer.innerHTML = this.timeRemaining;
    this.interval = setInterval(this.countDown, 1000);
  }

  // when a match happens, reset the board
  // if the match is the last set of cards, end the game and alert the winner!
  resetBoard() {
    [this.hasFlippedCard, this.lockBoard] = [false, false];
    [this.firstCard, this.secondCard] = [null, null];
    if (this.matchCount === this.cards.length / 2) {
      this.victoryScreen.classList.remove('hidden');
      clearInterval(this.interval);
    }
  }

  // shuffle cards positions with CSS order and display:grid
  shuffleCards() {
    this.cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
  }

  // If a double click on the same card happens return false
  // If the board is locked return false
  flipCard = e => {
    let card = e.currentTarget;
    if (this.lockBoard) return;
    if (card === this.firstCard) return;

    card.classList.add('flip');

    if (!this.hasFlippedCard) {
      this.hasFlippedCard = true;
      this.firstCard = card;
      return;
    }

    this.secondCard = card;
    this.checkForMatch();
  };

  // set a 60 second countdown and alert when the time runs out
  countDown = () => {
    this.timeRemaining = this.timeRemaining - 1;
    this.timer.innerHTML = this.timeRemaining;
    if (this.timeRemaining === 0) {
      this.lockBoard = true;
      clearInterval(this.interval);
      this.gameOverScreen.classList.remove('hidden');
      return;
    }
  };

  checkForMatch() {
    let isMatch =
      this.firstCard.dataset.location === this.secondCard.dataset.location;
    isMatch ? this.disableCards() : this.unflipCards();
  }

  // If there's a match, disable the current cards and reset the board to look for new matches
  disableCards() {
    this.matchCount = this.matchCount + 1;
    this.counter.innerHTML = this.matchCount;
    this.firstCard.removeEventListener('click', this.flipCard);
    this.secondCard.removeEventListener('click', this.flipCard);
    this.resetBoard();
  }

  // If there's no match, unflip the current cards and reset the board
  // To prevent an accidental click on other cards besides the current two, lock the board
  unflipCards() {
    this.lockBoard = true;

    setTimeout(() => {
      this.firstCard.classList.remove('flip');
      this.secondCard.classList.remove('flip');

      this.resetBoard();
    }, 1500);
  }
}

// Instantiate the game class with a set of cards (12 in this case)
const cards = document.querySelectorAll('.Schmemory-card');
const schmemoryGame = new Schmemory(cards);

document.querySelectorAll('.start-btn').forEach( button =>
  button.addEventListener('click', function() {
    this.parentElement.classList.add('hidden');
    schmemoryGame.startGame();
  })
);
