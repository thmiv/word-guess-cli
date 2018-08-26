/*
index.js: The file containing the logic for the course of the game, which depends on Word.js and:
Randomly selects a word and uses the Word constructor to store it
Prompts the user for each guess and keeps track of the user's remaining guesses
*/

const inquirer = require("inquirer");
const Word = require("./Word.js");
const chalk = require("chalk");

var guessNum;
var newWord;
var randomWord;

// starts the game
function startGame() {
    newWord = selectWord();
    guessNum = newWord.wordDisplay.length;
    console.log("\n"+ chalk.yellow(newWord.createWord()) +"\n"); 
    console.log(chalk.red("Guesses remaining: ") +chalk.white(guessNum) +"\n");
    promptForLetter();
}

// selects a random word from an array and assigns it to the Word constructor
function selectWord() {
    var words = ["mongoose", "pressure", "cooker", "reactor", "sequel", "onomatopoeia", "monitor", "printer", "speakers", "drive"];
    randomWord = words[Math.floor(Math.random() * words.length)];
    //console.log("random Word: " + randomWord);    // testing
    var newRandWord = new Word(randomWord);
    return newRandWord;
}

// prompts for letter and ends the game when conditions met
function promptForLetter() {
    inquirer.prompt([
        {
            name: "letterGuess",
            type: "input",
            message: "Type a letter to guess: "
        }
    ]).then(function(answer) {
        newWord.currentGuess(answer.letterGuess);

        console.log();
        
        var displayWord = newWord.createWord();
        console.log(chalk.yellow(displayWord) + "\n");   // displays current version of word
        guessNum -= 1;
        console.log(chalk.red("Guesses Remaining: ") + chalk.white(guessNum) + "\n");
        if (displayWord.includes("_") && guessNum > 0) {
            promptForLetter();
        } else {
            if (!(displayWord.includes("_"))) {
                console.log(chalk.magenta("Contgrats! You guessed correctly.\n"));
            } else {
                console.log(chalk.blue("Sorry, you did not guess correctly. The word was: ") + chalk.cyan(randomWord) +"\n");
            }
            inquirer.prompt([
                {
                    name: "playGame",
                    type: "confirm",
                    default: false,
                    message: "Would you like to play again?"
                }
            ]).then(function(answer) {
                if (answer.playGame) {
                    startGame();
                } else {
                    process.exit();
                }
            });
        }
    });
}

startGame();
