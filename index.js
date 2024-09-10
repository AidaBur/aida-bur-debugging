// Access HTML elements
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber; // Variable to store the randomly generated target number
let attempts = 0; // Counter for the number of attempts made
const maxNumberOfAttempts = 5; // Maximum number of guesses allowed

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Function to handle guess submission
function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);

  // Check if the guess is within the valid range
  if (isNaN(guess) || guess < 1 || guess > 99) {
    // Show an error message or alert if needed
    alert("Please enter a number between 1 and 99.");
    guessInput.value = '';
    return; // Exit the function to prevent further checks
  }

  attempts = attempts + 1;

  hideAllMessages(); // Hide all message elements

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = ''; // Show the correct guess message

    submitButton.disabled = true;
    guessInput.disabled = true;
  } else {
    if (guess < targetNumber) {
      tooLowMessage.style.display = ''; // Show too low message
    } else {
      tooHighMessage.style.display = ''; // Show too high message
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = '';
    // Adjust the message based on the number of remaining attempts
    if (remainingAttempts === 1) {
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guess remaining`;
    } else {
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
    }
  }

  // Check if the maximum number of attempts has been reached
  if (attempts >= maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
    maxGuessesMessage.style.display = ''; // Show max attempts reached message
    numberOfGuessesMessage.style.display = 'none'; // Hide guesses message
    resetButton.style.display = '';
    return; // Exit the function to prevent further checks
  }

  guessInput.value = '';

  resetButton.style.display = '';
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

// Function to initialize or reset the game
function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
