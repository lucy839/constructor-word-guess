# constructor-word-guess

## Descripion

-   Welcome to Lucy's constructor word guess.
    This is  Word Guess command-line game using constructor functions.
    User can play this game by guessing in the command-line.

## Conflicts & Solution
-   Exporting and importing multiple constructors within different javascript files were confusing. 
    Following the direction thoroughly and drawing the connection on the board helped resolving the conflicts.

## Task List
-   [x] create github repository 
-   [x] initialize package.json file
-   [x] make Letter.js
    *   A string value to store the underlying character for the letter
    *   A boolean value that stores whether that letter has been guessed yet
    *   A function that returns the underlying character if the letter has been guessed, or a placeholder (like an underscore) if the letter has not been guessed
    *   A function that takes a character as an argument and checks it against the underlying character, updating the stored boolean value to true if it was guessed correctly
-   [x] make Words.js
    *   An array of `new` Letter objects representing the letters of the underlying word
    *   A function that returns a string representing the word. This should call the function on each letter object (the first function defined in `Letter.js`) that displays the character or an underscore and concatenate those together.
    *   A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in `Letter.js`)
-   [x] make index.js
    *   Randomly selects a word and uses the `Word` constructor to store it
    *   Prompts the user for each guess and keeps track of the user's remaining guesses
-   [x] `Letter.js` *should not* `require` any other files.
-   [x] `Word.js` *should only* require `Letter.js`
-   [x] readme
-   [x] submit screenshots and link to repo

## Techinical Approach
-   node, constructor, objects, npm packages

## Reference
-   please take a look at the link below to see working app.
    https://drive.google.com/file/d/1GMXsv87Ro8cqhM5Ccw8Glo5NjifIT11b/view?usp=sharing


