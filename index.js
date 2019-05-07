// the file containing the logic for the course of the game, which depends on `Word.js` and:
const Word = require("./Word.js");
const inquirer = require("inquirer");
//  Randomly selects a word and uses the `Word` constructor to store it
const wordList = ["Mickey", "Donald", "Goofy", "Pluto", "Daisy", " Minnie",
    "Walt", "Clarabelle", "Alice", "Cheshire Cat"];
var wordGuessed;
var wordToGuess;
var numGuess;
var wordGuessGame = {
    intro: function () {
        wordGuessed = [];
        console.log("Welcome to Word Guess Game in Disney!");
        console.log("#----------------------------------------------------------#");
        playGame();
    },
    playGame: function () {
        wordToGuess = "";
        numGuess = 10;

        if (wordGuessed.length < wordList.length) {
            // if list is not finished, continue to pick the word
            wordToGuess = pickWord();
        } else {
            // if list is finised and user won, prompt to continue or end
            console.log("You are a Disney Master!");
            moreOrStop();
        }

        // if the word is picked, have user guess the letter
        if (wordToGuess) {
            word = new Word(wordToGuess);
            word.getWord();
            guessLetter();
        }
    },
    pickWord: function () {
        // choose random number, then use it to choose random word.
        var randNum = Math.floor(Math.random() * wordList.length);
        var randWord = wordListt[ranNum];
        // check if that random word is already guessed
        if (wordGuessed.indexOf(randWord) === -1) {
            wordGuessed.push(randWord);
            return randWord;
        } else {
            // if is already guessed, choose another one.
            return pickWord();
        }
    },
    // Prompts the user for each guess and keeps track of the user's remaining guesses
    guessLetter: function() {
        var done = [];
        inquirer
        .prompt({
            name: "guessedLetter",
            message: word.update() + 
            "\nGuess a letter!" +
            "\nGuesses Left: " + numGuess
        })
        .then(data => {
            word.letters.forEach(letter => {
                letter.checkLetter(data.guessedLetter);
                done.push(letter.getLetter());
            });
            if(numGuess > 0 && done.indexOf("_") !== -1){
                numGuess--;
                if (numGuess == 0){
                    console.log("GAME OVER!");
                    moreOrStop();
                } else {
                    guessLetter();
                }
            } else { 
                console.log("CONGRATULATIONS! YOU GOT THE WORD!");
                console.log(word.update());
                playGame();
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
                    wordGuessed = [];
                    playGame();
                } else {
                    console.log("Come back again soon!");
                }
            });
    }
}

// call to start the game
wordGuessGame.intro();
