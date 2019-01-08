var wins = 0;
var losses = 0;
var guessesLeft = 9;
var lettersGuessed = [""];
var lettersArr = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var ranNum = Math.floor(Math.random()*lettersArr.length);
var letterToGuess = lettersArr[ranNum];
var playAgain;
var newNum;
var start = true;
var spacebar = true;

document.onkeyup = function(e){
    if(e.keyCode == 32 && spacebar == true){
        document.querySelector('#score').innerText = "Guesses: " + guessesLeft + "\xa0\xa0\xa0\xa0Wins: " + wins + "\xa0\xa0\xa0\xa0Losses: " + losses;
        document.querySelector('#delete').innerText = "";
        document.querySelector('#letters').innerText = "Incorrect Letters Guessed: " + lettersGuessed;
        document.querySelector('#hint').innerText = "Hint:";
        document.querySelector('#hinttext').innerText = "This is where the hint will go to help you figure out the word, name, or phrase represented by underscores below.  This first game is used as a tutorial so you can get the hang (no pun intended) of the game before we start keeping score.  The tutorial is always the same, but from hear on out, the word will chosen randomly.  This tutorial also acts as a tribute to my favorite old school rapper Big L from the D.I.T.C. Crew.  If you can't guess the word from this hint, you are a fool.  But feel free to test out a couple of mistakes before guessing correclty.";
        document.querySelector('#getlost').innerHTML = "<br><br><br>";
        document.querySelector('#hangstage').src = "./assets/images/hung-start.png";
        gameTime();
        spacebar = false;
    }
}

function gameTime(){
    if (start == true) {
        document.querySelector('#song').innerHTML = '<audio controls style="display:none" autoplay><source src="./assets/audio/eightenuff.mp3" type="audio/mpeg"></audio>';
        start = false;
    }
}



// document.onkeyup = function(){
//     if (letterToGuess.includes(event.key)){
//         wins++;
//         document.querySelector('#wins').innerText = "Wins: " + wins;
//         guessesLeft = 9;
//         document.querySelector('#tries').innerText = "Guesses Left: " + guessesLeft;
//         lettersGuessed = [""];
//         document.querySelector('#letters').innerText = "Letters Guessed: ";
//         playAgain = prompt("You win! The letter was " + letterToGuess + ". Do you want to play again? Enter y for yes! Otherwise, exit the window.")
//         if (playAgain = "y"){
//             newNum = Math.floor(Math.random()*lettersArr.length);
//             letterToGuess = lettersArr[newNum];
//         }        
//     } else {
//         lettersGuessed.push(event.key);
//         document.querySelector('#letters').innerText = "Letters Guessed: " + lettersGuessed;
//         guessesLeft--;
//         document.querySelector('#tries').innerText = "Guesses Left: " + guessesLeft;
//         if (guessesLeft < 1){
//             losses++;
//             document.querySelector('#losses').innerText = "Losses: " + losses;
//             guessesLeft = 9;
//             document.querySelector('#tries').innerText = "Guesses Left: " + guessesLeft;
//             lettersGuessed = [""];
//             document.querySelector('#letters').innerText = "Letters Guessed: ";
//             playAgain = prompt('The letter was ' + letterToGuess + '! You lose! Do you want to play again? Enter y for yes. Otherwise, exit the window.');
//             if (playAgain = "y"){
//                 newNum = Math.floor(Math.random()*lettersArr.length);
//                 letterToGuess = lettersArr[newNum];
//             }
//         }
//     }
// }
