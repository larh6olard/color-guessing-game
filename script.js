class ColorGame {
  constructor() {
      this.score = 0;
      this.targetColor = '';
      this.options = [];
      
      this.colorBox = document.querySelector("#colorBox");
      this.colorOptions = document.querySelectorAll(".color-option");
      this.scoreElement = document.querySelector("#score");
      this.gameStatus = document.querySelector("#gameStatus");
      this.newGameButton = document.querySelector('[type="reset"]');
      
      newGameButton.addEventListener('click', () => {
        this.score = 0;
        this.startNewGame();
      });
      this.colorOptions.forEach(option => {
          option.addEventListener('click', (e) => this.handleGuess(e));
      });
      
      this.startNewGame();
  }
  
  generateRandomColor() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgb(${r}, ${g}, ${b})`;
  }
  
  generateColorOptions() {
      const colors = [this.targetColor];
      while (colors.length < 6) {
          const newColor = this.generateRandomColor();
          if (!colors.includes(newColor)) {
              colors.push(newColor);
          }
      }
      return this.shuffleArray(colors);
  }
  
  shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  }
  
  startNewGame() {
      this.targetColor = this.generateRandomColor();
      this.colorBox.style.backgroundColor = this.targetColor;
      
      this.options = this.generateColorOptions();
      this.colorOptions.forEach((option, index) => {
          option.style.backgroundColor = this.options[index];
          option.classList.remove('correct', 'wrong');
        });
        
        this.gameStatus.textContent = 'Make your guess!';
        this.updateScore();
  }
  
  handleGuess(event) {
      const selectedColor = event.target.style.backgroundColor;
      const isCorrect = selectedColor === this.targetColor;
      
      if (isCorrect) {
          this.score++;
          event.target.classList.add('correct');
          this.gameStatus.textContent = 'Correct! Well done!';
          setTimeout(() => this.startNewGame(), 1000);
      } else {
          event.target.classList.add('wrong');
          this.gameStatus.textContent = 'Wrong! Try again!';
      }
      
      this.updateScore();
  }
  
  updateScore() {
      this.scoreElement.textContent = this.score;
  }

}

document.addEventListener('DOMContentLoaded', () => {
  new ColorGame();
});