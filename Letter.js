// Contains a constructor, Letter
function Letter(letter) {
    // A string value to store the underlying character for the letter
    this.letter = letter;

    // A boolean value that stores whether that letter has been guessed yet
    this.isCorrect = false;

    // A function that returns the underlying character if the letter has been guessed, 
    // or a placeholder (like an underscore) if the letter has not been guessed
    this.getLetter = function() {
        if (!this.isCorrect && this.letter !== " ") {
            return "_";
        } if (this.letter == " "){
            return " ";
        } else {
            return this.letter;
        }
    }

    // A function that takes a character as an argument and checks it against the underlying character,
    //  updating the stored boolean value to true if it was guessed correctly
    this.checkLetter = function(guess) {
        if (guess === this.letter) {
            this.isCorrect = true;
        }
    }
}

// export letter constructor
module.exports = Letter;





