const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

// Display symbols as placeholders
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessLetterButton.addEventListener("click", function (e) {
  e.preventDefault();
  // Empty message
  message.innerText = "";
  // Record the input
  const guess = letterInput.value;
  // Validate input
  const goodGuess = validateInput(guess);

  if (goodGuess) {
    makeGuess(guess);
  }
  letterInput.value = "";
});

const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    // If input empty?
    message.innerText = "Please enter a letter.";
  } else if (input.length > 1) {
    // If input is more than one letter?
    message.innerText = "Please enter a single letter.";
  } else if (!input.match(acceptedLetter)) {
    // If the input is not a letter
    message.innerText = "Please enter a letter from A to Z.";
  } else {
    // Ok, we have a letter
    return input;
  }
};

const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You've already guessed that letter. Please try again.";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    showLetters();
    updateWordInProgress(guessedLetters);
  }
};

const showLetters = function () {
    // Clear the list
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
    const listItem = document.createElement("li");
    listItem.innerText = letter;
    guessedLettersElement.append(listItem);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const displayWord = [];
    console.log(displayWord);
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            displayWord.push(letter.toUpperCase());
        } else {
            displayWord.push("●");
        }
    }
    console.log(displayWord);
    wordInProgress.innerText = displayWord.join("");
    checkIfWon();
};

const checkIfWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
    }
};