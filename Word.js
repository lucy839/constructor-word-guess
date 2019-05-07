// Contains a constructor, Word that depends on the Letter constructor. 
const Letter = require("./Letter.js");

function Word (word){
    this.word = word;
    // An array of `new` Letter objects representing the letters of the underlying word
    this.letters = [];
    // A function that returns a string representing the word. 
    // This should call the function on each letter object (the first function defined in `Letter.js`) 
    // that displays the character or an underscore and concatenate those together.
    this.getWord = function(){
        var wordArr = this.word.split("");
        for (var i in wordArr){
            var newLetter = new Letter (wordArr[i])
            this.letters.push(newLetter)
        }
    }
    // A function that takes a character as an argument and calls the guess function 
    // on each letter object (the second function defined in `Letter.js`)
    this.checkWord = function(guess){
        this.letters.forEach(letter => {
            letter.checkLetter(guess);
        });
    }
        
    // update after each guess
    this.update = function(){
        var theWord = "";
        this.letters.forEach(letter => {
            theWord += letter.getLetter() + " ";
        });
        return theWord;
    }
}

// export out the word constructor
module.exports = Word;