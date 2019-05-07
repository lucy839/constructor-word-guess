// the file containing the logic for the course of the game, which depends on `Word.js` and:
const Word = require("./Word.js");
const inquirer = require("inquirer");
//  Randomly selects a word and uses the `Word` constructor to store it
const wordList = ["Mickey", "Donald", "Goofy", "Pluto", "Daisy", " Minnie",
    "Walt", "Clarabelle", "Alice", "Cheshire Cat"];
var wordGuessed;
var wordToGuess;
var numGuess;
var guessed = [];
var wordGuessGame = {
    intro: function () {
        wordGuessed = [];
        console.log("Welcome to Word Guess Game in Disney!");
        wordGuessGame.playGame();
    },
    playGame: function () {
        wordToGuess = "";
        numGuess = 10;

        if (wordGuessed.length < wordList.length) {
            // if list is not finished, continue to pick the word
            wordToGuess = wordGuessGame.pickWord();
        } else {
            // if list is finised and user won, prompt to continue or end
            console.log("You are a Disney Master!");
            wordGuessGame.moreOrStop();
        }

        // if the word is picked, have user guess the letter
        if (wordToGuess) {
            word = new Word(wordToGuess);
            word.getWord();
            wordGuessGame.guessLetter();
        }
    },
    pickWord: function () {
        // choose random number, then use it to choose random word.
        var randNum = Math.floor(Math.random() * wordList.length);
        var randWord = wordList[randNum];
        randWord = randWord.toLowerCase();
        // check if that random word is already guessed
        if (wordGuessed.indexOf(randWord) === -1) {
            wordGuessed.push(randWord);
            return randWord;
        } else {
            // if is already guessed, choose another one.
            return wordGuessGame.pickWord();
        }
    },
    // Prompts the user for each guess and keeps track of the user's remaining guesses
    guessLetter: function () {
        var done = [];
        inquirer
            .prompt({
                name: "guessedLetter",
                message: word.update() +
                    "\nGuesses Left: " + numGuess +
                    "\nGuess a letter!",
                type: "input"

            })
            .then(data => {
                var chosenLetter = data.guessedLetter;
                var guessArr = chosenLetter.split("");
                if (guessArr.length > 1) {
                    console.log("PLEASE GUESS ONLY ONE LETTER!");
                    wordGuessGame.guessLetter();
                } else {
                    chosenLetter = chosenLetter.toLowerCase();
                    if (guessed.indexOf(chosenLetter) > -1) {
                        console.log("YOU ALREADY GUESSED THIS LETTER!");
                        wordGuessGame.guessLetter();
                    } else {
                        guessed.push(chosenLetter);
                        word.letters.forEach(letter => {
                            letter.checkLetter(chosenLetter);
                            done.push(letter.getLetter());
                        });
                        if (numGuess > 0 && done.indexOf("_") !== -1) {
                            if (done.indexOf(chosenLetter) == -1) {
                                console.log("YOU GUESSED THE WRONG LETTER!")
                                numGuess--;
                            }
                            if (numGuess == 0) {
                                console.log("GAME OVER!");
                                wordGuessGame.moreOrStop();
                            } else {
                                wordGuessGame.guessLetter();
                            }
                        } else {
                            console.log("CONGRATULATIONS! YOU GOT THE WORD!");
                            console.log(word.update());
                            wordGuessGame.moreOrStop();
                        }
                    }
                }
            });
    },

    moreOrStop: function () {
        inquirer
            .prompt({
                name: "again",
                type: "confirm",
                message: "Would you like to play again?"
            })
            .then(function (answer) {
                if (answer.again === true) {
                    // Starts the game again
                    if (wordGuessed.length == wordList.length) {
                        wordGuessed = [];
                    }
                    wordGuessGame.playGame();
                } else {
                    console.log("Come back again soon!");
                }
            });
    }
}

// call to start the game
wordGuessGame.intro();
