// the file containing the logic for the course of the game, which depends on `Word.js`
const Word = require("./Word.js");
const inquirer = require("inquirer");

const wordList = ["Mickey", "Donald", "Goofy", "Pluto", "Daisy", " Minnie",
    "Walt", "Clarabelle", "Alice", "Cheshire Cat"];
var wordGuessed;
var wordToGuess;
var numGuess;
var guessed = [];

// word guess game object
var wordGuessGame = {
    // function to log introduction and call play game
    intro: function () {
        wordGuessed = [];
        console.log("Welcome to Word Guess Game in Disney!");
        wordGuessGame.playGame();
    },

    // function to play game; deteremines whether to pick a word or finish
    // call function to guess letter
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

    //  function that randomly selects a word and uses the `Word` constructor to store it
    pickWord: function () {
        // choose random number, then use it to choose random word
        var randNum = Math.floor(Math.random() * wordList.length);
        var randWord = wordList[randNum];
        randWord = randWord.toLowerCase();
        // check if that random word is already guessed
        if (wordGuessed.indexOf(randWord) === -1) {
            wordGuessed.push(randWord);
            return randWord;
        } else {
            // if is already guessed, choose another one
            return wordGuessGame.pickWord();
        }
    },

    // function to prompt the user for each guess and keeps track of the user's remaining guesses
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
                // check if user put in just one letter
                if (guessArr.length > 1) {
                    console.log("PLEASE GUESS ONLY ONE LETTER!");
                    wordGuessGame.guessLetter();
                } else {
                    // if user put in just a letter, make it all lower case for consistency
                    chosenLetter = chosenLetter.toLowerCase();
                    // check if user already guessed that letter or not
                    if (guessed.indexOf(chosenLetter) > -1) {
                        console.log("YOU ALREADY GUESSED THIS LETTER!");
                        wordGuessGame.guessLetter();
                    } else {
                        // if user didn't guess that letter yet, check letter
                        guessed.push(chosenLetter);
                        word.letters.forEach(letter => {
                            letter.checkLetter(chosenLetter);
                            done.push(letter.getLetter());
                        });
                        // if number of guesses are left and there's letter left
                        if (numGuess > 0 && done.indexOf("_") !== -1) {
                            // check if user guessed correct answer and prompt accordingly
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
                            // if user guessed all the letter before running out number of guess, 
                            // let user know
                            console.log("CONGRATULATIONS! YOU GOT THE WORD!");
                            console.log(word.update());
                            wordGuessGame.moreOrStop();
                        }
                    }
                }
            });
    },

    // function to prompt the user either to continue or stop
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
                    guessed = [];
                    wordGuessGame.playGame();
                } else {
                    console.log("Come back again soon!");
                }
            });
    }
}

// call to start the game
wordGuessGame.intro();
