const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

//function to pull random word for player to guess
const getWord = async function() {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    const wordArray = words.split("\n");
    console.log(wordArray);
    //create random index
    const randomIndex = Math.floor(Math.random() * wordArray.length)
    //select random word
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();

// Display symbols as placeholders
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    //console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

//placeholder(word);


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
    countGuessesRemaining(guess);
    showLetters();
    updateWordInProgress(guessedLetters);
  }
};

const showLetters = function () {
    // Clear the list
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
    //Create list item and add it to the diplayed letters that were guessed   
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

const countGuessesRemaining = function (guess) {
    const upperCaseWord = word.toUpperCase();
    //Checks for the letter in the word and displays feedback on whether the letter is in the word or not.
    if (!upperCaseWord.includes(guess)) {
        message.innerText = `Sorry ${guess} is not in the word.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Awesome! The word contains ${guess}.`;
    } 
    //Counts down the remaining guesses when an incorrect letter is guessed. displays Game Over when player runs out of guesses
    if (remainingGuesses === 0) {
        message.innerHTML = `Game Over. The word is ${word}.`;
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
        startOver();
    } else if (remainingGuesses === 1 ) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }

};

const checkIfWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
        startOver();
    }
};

const startOver = function () {
    guessedLettersElement.classList.add("hide");
    guessLetterButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    //reset the game
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersElement.innerHTML = "";
    remainingGuesses = 8;
    guessedLetters = [];
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    //get new word
    getWord();
    //hide what we don't need to show
    guessedLettersElement.classList.remove("hide");
    guessLetterButton.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    playAgainButton.classList.add("hide");
});