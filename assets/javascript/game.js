function loadGame(){
    var wins = 0;
    var losses = 0;
    var guessesLeft = 9;
    var lettersGuessed = [];
    var lettersArr = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    var wordToGuess = "bigl"; //max 14 characters all lower case.
    var guessedCorrect = [];
    var goodCount = 0;
    var hangStage = "./assets/images/hung-start.png";
    var start = true;
    var spacebar = true;
    var k;
    var tutor = false;
    var gamesArr = [
        {
            song: '<audio controls style="display:none" autoplay><source src="./assets/audio/001-allcity-actual.mp3" type="audio/mpeg"></audio>',
            word: 'primo',
            hint: "Christopher Edward Martin, known professionally as DJ Premier, has collaborated with many East Coast Rappers, including the current group playing named All City.  One of DJ Premier's well known nickname's is what 5 letter word?",
            num: '0'
        },
        {
            song: '<audio controls style="display:none" autoplay><source src="./assets/audio/002-allcity-moveonyou.mp3" type="audio/mpeg"></audio>',
            word: 'allcity',
            hint: "This American rap duo composed of Brooklyn-based rappers J. Mega and Greg Valentine is best known for its hit single \"The Actual\", of which they partnered with DJ Premier for the beat.  What is this rap duo's name?",
            num: '1'
        },
        {
            song: '<audio controls style="display:none" autoplay><source src="./assets/audio/003-nickatina-ayo.mp3" type="audio/mpeg"></audio>',
            word: 'cocaine',
            hint: "In the song Ayo for Yayo by Andre Nickatina, he frequently refers to Yayo.  Yayo is slang for what?",
            num: '2'
        },
        {
            song: '<audio controls style="display:none" autoplay><source src="./assets/audio/004-nickatina-4am.mp3" type="audio/mpeg"></audio>',
            word: 'oakland',
            hint: "In the song 4am-Bay Bridge Music by Andre Nickatina, refers to the Bay Bridge in the San Francisco Bay Area.  The Bay Bridge connects San Francisco to which city?",
            num: '3'
        },
        {
            song: '<audio controls style="display:none" autoplay><source src="./assets/audio/005-nickatina-gitdown.mp3" type="audio/mpeg"></audio>',
            word: 'equipto',
            hint: "Andre Nickatina collaborates on many albums, but especially with one particular artist.  An example would be the 2005 album Horns and Halos.  Who is this artist?",
            num: '4'
        },
    ];
    var ranNum = Math.floor(Math.random()*gamesArr.length);
    var gameHint;
    var gameSong;
    var gamePlay;
    var wordsPicked = [];
        
    function beginTutorial(){
        document.onkeypress = function(e){
            if(e.keyCode == 32 && spacebar == true){
                document.querySelector('#score').innerText = "Guesses: " + guessesLeft + "\xa0\xa0\xa0\xa0Wins: " + wins + "\xa0\xa0\xa0\xa0Losses: " + losses;
                document.querySelector('#delete').innerText = "";
                document.querySelector('#letters').innerText = "Incorrect Letters Guessed: " + lettersGuessed;
                document.querySelector('#hint').innerText = "Hint:";
                document.querySelector('#hinttext').innerText = "This is where the hint will go to help you figure out the word, name, or phrase represented by underscores below.  This first game is used as a tutorial so you can get the hang (no pun intended) of the game before we start keeping score.  The tutorial is always the same, but from here on out, the word will chosen randomly.  This tutorial also acts as a tribute to my favorite old school rapper Big L from the D.I.T.C. Crew.  If you can't guess the word from this hint, you are a fool.  But feel free to test out a couple of mistakes before guessing correclty.";
                strCreator();
                hangStart();
                tutorialTime();
                spacebar = false;
                document.onkeyup = grabKeyPressed;
            }
        }
    }

    beginTutorial();


    function grabKeyPressed(){        
        if (tutor==false && !lettersGuessed.includes(event.key) && lettersArr.includes(event.key) && !wordToGuess.includes(event.key)){
            lettersGuessed.push(event.key);
            typeLetters();
            guessCounter();
            document.querySelector('#score').innerText = "Guesses: " + guessesLeft + "\xa0\xa0\xa0\xa0Wins: " + wins + "\xa0\xa0\xa0\xa0Losses: " + losses;
            hangChange();
            if (tutor==false && guessesLeft>0){
                badSound(); 
                blinkBlue();
                setTimeout(blinkRed, 300);
                setTimeout(blinkBlue, 600);
                setTimeout(resetPic, 900); 
            } else if (tutor==false && guessesLeft===0){
                !lettersGuessed.push(event.key);
                tutor = true;
                loseSound();
                blinkBlue();
                setTimeout(blinkRed, 300);
                setTimeout(blinkBlue, 600);
                setTimeout(blinkRed, 900);
                setTimeout(blinkBlue, 1200);
                setTimeout(blinkRed, 1500);
                setTimeout(blinkBlue, 1800);
                setTimeout(blinkRed, 2100);
                setTimeout(blinkBlue, 2400);
                setTimeout(readyToPlay, 2400);
            }
        } else if (tutor==false && guessesLeft!==0 && !guessedCorrect.includes(event.key) && wordToGuess.includes(event.key) && lettersArr.includes(event.key) && tutor==false){
            goodCount++;
            strUpdater();
            goodSound();
            blinkPurp();
            setTimeout(blinkWhite, 300);
            setTimeout(blinkPurp, 600);
            setTimeout(resetPic, 900);
            if (goodCount == wordToGuess.length){
                tutor=true;
                setTimeout(blinkWhite, 900);
                setTimeout(winSound, 900);
                setTimeout(blinkPurp, 1200);
                setTimeout(winSoundTwo, 1500);
                setTimeout(blinkWhite, 1500);
                setTimeout(blinkPurp, 1800);
                setTimeout(readyToPlay, 2100);
            }
        } 
    }

    function guessCounter(){
        if (guessesLeft>0){
            guessesLeft--;
        }
    }

    function typeLetters(){
        if (guessesLeft>0){
            document.querySelector("#letters").innerText = "Incorrect Letters Guessed: " + lettersGuessed.toString().substr(0);
        }
    }

    function tutorialTime(){
        if (start == true) {
            document.querySelector('#song').innerHTML = '<audio controls style="display:none" autoplay><source src="./assets/audio/000-bigl-eightenuff.mp3" type="audio/mpeg"></audio>';
            start = false;
        }
    }

    function hangStart(){
        if (guessesLeft === 9){
            hangStage = "./assets/images/hung-start.png";
            document.querySelector('#hangstage').src = hangStage;
        }
    }

    function hangChange(){
        if (guessesLeft === 8){
            document.querySelector('#hangstage').src = "./assets/images/hung0.png";
        } else if (guessesLeft === 7){
            document.querySelector('#hangstage').src = "./assets/images/hung1.png"; 
        } else if (guessesLeft === 6){
            document.querySelector('#hangstage').src = "./assets/images/hung2.png"; 
        } else if (guessesLeft === 5){
            document.querySelector('#hangstage').src = "./assets/images/hung3.png"; 
        } else if (guessesLeft === 4){
            document.querySelector('#hangstage').src = "./assets/images/hung4.png"; 
        } else if (guessesLeft === 3){
            document.querySelector('#hangstage').src = "./assets/images/hung5.png"; 
        } else if (guessesLeft === 2){
            document.querySelector('#hangstage').src = "./assets/images/hung6.png"; 
        } else if (guessesLeft === 1){
            document.querySelector('#hangstage').src = "./assets/images/hung7.png"; 
        } else if (guessesLeft === 0){
            document.querySelector('#hangstage').src = "./assets/images/hung.png"; 
        }
    }

    function readyToPlay(){
        var ready = prompt("Well done sucka.  You completed the tutorial.  Easy right?  \n\nIf you want to retry the tutorial, type \"retry\" and press OK.  \n\nIf you're ready to play for real, type \"play\" and press OK. \n\nIf and when you're done playing, exit the window.")
        if (ready == "retry"){
            location.reload();
        } else if (ready == "play"){
            resetGame();
        } else {
            readyToPlay();
        }
    }

    function resetPic(){
        document.querySelector('#header').src = "./assets/images/hoodrap-hangman.png";
    }

    function blinkRed(){
        document.querySelector('#header').src = "./assets/images/hoodrap-hangman-red.png";
    }

    function blinkBlue(){
        document.querySelector('#header').src = "./assets/images/hoodrap-hangman-blue.png";
    }

    function badSound(){
        document.querySelector('#sound').innerHTML = '<audio controls style="display:none" autoplay><source src="./assets/sounds/krsone.mp3" type="audio/mpeg"></audio>';
    }

    function loseSound(){
        document.querySelector('#sound').innerHTML = '<audio controls style="display:none" autoplay><source src="./assets/sounds/krsone_1.mp3" type="audio/mpeg"></audio>';
    }

    function goodSound(){
        document.querySelector('#sound').innerHTML = '<audio controls style="display:none" autoplay><source src="./assets/sounds/nas_1.mp3" type="audio/mpeg"></audio>'; 
    }

    function winSound(){
        document.querySelector('#sound').innerHTML = '<audio controls style="display:none" autoplay><source src="./assets/sounds/2pac_6.mp3" type="audio/mpeg"></audio>'; 
    }

    function winSoundTwo(){
        document.querySelector('#sound').innerHTML = '<audio controls style="display:none" autoplay><source src="./assets/sounds/chingy_1.mp3" type="audio/mpeg"></audio>'; 
    }

    function blinkPurp(){
        document.querySelector('#header').src = "./assets/images/hoodrap-hangman-purple.png";
    }

    function blinkWhite(){
        document.querySelector('#header').src = "./assets/images/hoodrap-hangman-white.png";
    }

    function strCreator(){
        for (var i=0; i<wordToGuess.length; i++){
            guessedCorrect[i] = "_";
        }
        document.querySelector('#getlost').innerHTML = `<h3>${guessedCorrect.join(" ")}</h3>`;
    };

    function strUpdater(){
        for (var i=0; i<wordToGuess.length; i++){
            if (wordToGuess[i] == event.key){
                guessedCorrect.splice(i, 1, event.key);
            }
            document.querySelector('#getlost').innerHTML = `<h3>${guessedCorrect.join(" ")}</h3>`;
        }
    }

    function gameOver(){        
        if (wins + losses == gamesArr.length && wins < losses){
            var loser = prompt(`Damn, I knew you was a sucka that didn't know shit about rap.  

            You lost ${losses} times and only won ${wins} times.  You lost more than you won! 
            
            If you want to try again, type "retry" and press OK.
            
            If and when you're done playing, type "exit" and press OK to quit.`)
            if (loser == "retry"){
                location.reload();
            } else if (loser == "exit"){
                window.close();
            } else {
                gameOver();
            }
        }  if (wins + losses == gamesArr.length && wins > losses){
            var winner = prompt(`Damn, I guess you do know a little something about rap.  

            You won ${wins} times and only lost ${losses} times.  You won more than you lost! 
            
            Well, if you want to play again, type "play" and press OK.
            
            If and when you're done playing, type "exit" and press OK to quit.`)
            if (winner == "play"){
                location.reload();
            } else if (winner == "exit"){
                window.close();
            } else {
                gameOver();
            }
        } else resetGame();
    }

    function resetGame(){
        var n = ranNum.toString();
        if (wordsPicked.includes(n)){
            ranNum = Math.floor(Math.random()*gamesArr.length);
            resetGame();
        } else
        goodCount = 1;
        guessesLeft = 9;
        document.querySelector('#score').innerText = "Guesses: " + guessesLeft + "\xa0\xa0\xa0\xa0Wins: " + wins + "\xa0\xa0\xa0\xa0Losses: " + losses;
        lettersGuessed = [];
        guessedCorrect = [];
        document.querySelector('#letters').innerText = "Incorrect Letters Guessed: " + lettersGuessed;
        hangStart();
        resetPic();
        wordToGuess = gamesArr[ranNum].word;
        gameHint = gamesArr[ranNum].hint;
        document.querySelector('#hinttext').innerText = gameHint;
        gameSong = gamesArr[ranNum].song;
        document.querySelector('#song').innerHTML = gameSong;
        wordsPicked.push(gamesArr[ranNum].num);
        strCreator();
        gamePlay=true;
        letGameBegin();
    }

    function letGameBegin(){
        document.onkeyup = regularGamePlay;
    }

    function regularGamePlay(){        
        if (gamePlay==true && !lettersGuessed.includes(event.key) && lettersArr.includes(event.key) && !wordToGuess.includes(event.key)){
            lettersGuessed.push(event.key);
            typeLetters();
            guessCounter();
            document.querySelector('#score').innerText = "Guesses: " + guessesLeft + "\xa0\xa0\xa0\xa0Wins: " + wins + "\xa0\xa0\xa0\xa0Losses: " + losses;
            hangChange();
            if (gamePlay==true && guessesLeft>0){
                badSound(); 
                blinkBlue();
                setTimeout(blinkRed, 300);
                setTimeout(blinkBlue, 600);
                setTimeout(resetPic, 900); 
            } else if (gamePlay==true && guessesLeft===0){
                document.querySelector('#getlost').innerHTML = `<h3 style="color:red;">${wordToGuess.split("").join(" ")}</h3>`;
                !lettersGuessed.push(event.key);
                gamePlay = false;
                guessedCorrect = [];
                loseSound();
                blinkBlue();
                losses++;
                document.querySelector('#score').innerText = "Guesses: " + guessesLeft + "\xa0\xa0\xa0\xa0Wins: " + wins + "\xa0\xa0\xa0\xa0Losses: " + losses;
                ranNum = Math.floor(Math.random()*gamesArr.length);
                setTimeout(blinkRed, 300);
                setTimeout(blinkBlue, 600);
                setTimeout(blinkRed, 900);
                setTimeout(blinkBlue, 1200);
                setTimeout(blinkRed, 1500);
                setTimeout(blinkBlue, 1800);
                setTimeout(blinkRed, 2100);
                setTimeout(blinkBlue, 2400);
                setTimeout(gameOver, 4400);
            }
        } else if (gamePlay==true && guessesLeft!==0 && !guessedCorrect.includes(event.key) && wordToGuess.includes(event.key) && lettersArr.includes(event.key) && gamePlay==true){
            goodCount++;
            strUpdater();
            goodSound();
            blinkPurp();
            setTimeout(blinkWhite, 300);
            setTimeout(blinkPurp, 600);
            setTimeout(resetPic, 900);
            if (guessedCorrect.join("") === wordToGuess){
                gamePlay=false;
                guessedCorrect = [];
                wins++;
                document.querySelector('#score').innerText = "Guesses: " + guessesLeft + "\xa0\xa0\xa0\xa0Wins: " + wins + "\xa0\xa0\xa0\xa0Losses: " + losses;
                ranNum = Math.floor(Math.random()*gamesArr.length);
                setTimeout(blinkWhite, 900);
                setTimeout(winSound, 900);
                setTimeout(blinkPurp, 1200);
                setTimeout(winSoundTwo, 1500);
                setTimeout(blinkWhite, 1500);
                setTimeout(blinkPurp, 1800);
                setTimeout(gameOver, 3800);
            }
        } 
    }
}

loadGame();