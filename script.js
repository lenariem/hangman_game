const wordEl = document.getElementById('word');
const taskEl = document.getElementById('task');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'algorithm', 'boolean', 'constant', 'framework', 'expression'];
const tasks = ['Computer software package that performs a specific function', 
              'Process of designing and building an executable computer program',
              'A shared boundary across which two or more separate components of a computer system exchange information', 
              'Set of instructions or rules designed to solve a definite problem', 
              'An expression used for creating statements that are either TRUE or FALSE', 
              'A value that does not change throughout the execution of the program', 
              'A foundation with a specified level of complexity that may be altered by the programmer, making use of their code',
              'A legal grouping of letters, symbols, and numbers being used to represent the value of one or more variables',
            ];

let selectedWord = words[Math.floor(Math.random() * words.length)];
console.log(selectedWord)
let taskIndex = words.indexOf(selectedWord);

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
      )
      .join('')}
  `;

  taskEl.innerText = tasks[taskIndex];

  //delete empty spaces coming from the map method because each letter is in a span. 
  //console.log(wordEl.innerText);
  const innerWord = wordEl.innerText.replace(/\n/g, '');
  //console.log(innerWord)

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won! 😃👍🥇';
    popup.style.display = 'flex';
  }
}

// Update the wrong letters
function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p><b>WRONG</b></p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lost. 😕';
    popup.style.display = 'flex';
  }
}

// Show notification
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

// Keydown letter press
window.addEventListener('keydown', e => {
    // console.log(e.keyCode);
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key;
  
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
  
          updateWrongLettersEl();
        } else {
          showNotification();
        }
      }
    }
  });

const wordNow = selectedWord;
// Restart game and play again
playAgainBtn.addEventListener('click', () => {
  //  Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];
 
  if(selectedWord === wordNow) {
    selectedWord = words[Math.floor(Math.random() * words.length)];
  }

  taskIndex = words.indexOf(selectedWord);
  displayWord();

  updateWrongLettersEl();

  popup.style.display = 'none';
});

displayWord();
