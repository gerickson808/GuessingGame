$(document).ready(function(){
	$('#playAgain').hide().removeClass('hidden');
	$("#guessInput").focus();
	var correctAnswer = generateNumber();
	var lives = 5;
	var previousGuesses = [];
	console.log(correctAnswer);  //DELETE THIS WHEN DONE TESTING

	$('#submit').on('click', function(){
		lives = gameAction(correctAnswer, lives, previousGuesses);
	});

	$(this).on('keypress',function(e){
		if(e.keyCode == 13){
			lives = gameAction(correctAnswer,lives, previousGuesses);
		};
	});

	$("#hint").on('click', function(){
		giveHint(correctAnswer);
	});

	$('#reset').on('click', function(){
		resetGame()
	});

	$('#play-again').on('click', function(){
		resetGame()
	});

	function resetGame(){
		lives = 5;
		previousGuesses = [];
		resetDOM();
		correctAnswer = generateNumber();
	}
});

function giveHint(correctAnswer){
	var elevensRhymes = { 1:"shmeleven",2:"flelve",3:"blurbeen",
										4:"poordean", 5:"schmifteen", 6:"fixlean",
										7:"jebenteen",8:"ratemeen", 9:"tinebean", 0:"men"};
	var tensRhymes = {2:"plenty", 3:"blurty",4:"sporty",5:"thrifty",
										6:"flixty",7:"bleventy",8:"fraidy",9:"blindy"};
	var onesRhymes = {0:"",1:"fun",2:"blue",3:"free",4:"score",5:"dive",
										6:"picks",7:"devin",8:"great",9:"fine"};
	var digits = correctAnswer.toString().split("");
	for (var i = 0; i < digits.length; i++) {
		digits[i] = Number(digits[i]);
	};
	var rhyme = "";
	if (digits.length === 3){
		rhyme = "fun wondered"
	}
	else if (digits.length === 2){
		if (digits[0] === "1"){
			rhyme = elevensRhymes[digits[1]];
		}
		else{
			rhyme = [tensRhymes[digits[0]], onesRhymes[digits[1]]].join(" ");
		};
	}
	else{
		rhyme = onesRhymes[digits[0]];
	}
	$("#message").text("The number rhymes with " + rhyme + ".");
}

function gameAction(correctAnswer, lives, previousGuesses){
	var answer = submitGuess(correctAnswer, previousGuesses);
	if (answer===0){
		winGame(correctAnswer);
	}
	else if (answer != undefined){
		console.log(answer);
		results(answer, previousGuesses);
		loseLife(lives);
		wrongMessage(previousGuesses, correctAnswer)
		lives -=1;
	};
	console.log(lives); // DELETE AFTER TESTING
	if (lives == 0){
		loseGame(correctAnswer);
	};
	$('#guessInput').val('');
	return lives;
}

function results(answer,previousGuesses){
	var light = "";
	var dim = ""
	if(answer == 1){
		light = "#lower";
		dim = "#higher";
	}
	else{
		light = "#higher";
		dim = "#lower";
	};
	feedback(light, dim, previousGuesses);
}

function feedback(light, dim,previousGuesses){
	$(light).removeClass('dimmed');
	$(dim).addClass('dimmed');
	$('.panel-body').text(previousGuesses.join(", "));
}


function generateNumber() {
	return parseInt(Math.random() * 100 + 1);
}

function submitGuess(answer, previousGuesses){
	var guess = $('#guessInput').val();
	if (isInt(guess) && guess != ""){
		if (contains(previousGuesses, guess)===true){
			$("#message").text("You've already guessed that!")
		}
		else if (guess==answer){
			return 0;
		}
		else if (guess < answer){
			previousGuesses.push(guess);
			return -1;
		}
		else {
			previousGuesses.push(guess);
			return 1;
		};
	}
	else {
		$("#message").text("Please guess an integer!");
	};
}

function isInt(num){
	if (Number(num) == num && num % 1 === 0){
		return true;
	}
	else {
		return false;
	};
}

function higher(){
	$('#lower').addClass('dimmed');
	$('#higher').removeClass('dimmed');
	loseLife();
}

function lower(){
	$('#higher').addClass('dimmed');
	$('#lower').removeClass('dimmed');
	loseLife();
}

function loseLife(lives){
		$('.lives:eq('+(lives-1)+')').fadeOut('slow');
}

function wrongMessage(previousGuesses, correctAnswer){
	var messages = ['Think carefully.', 'Seize the moment.',
	'Don\'t let your dreams be dreams.', 'Find your inner strength.',
	'Think. Think!', 'Phone a friend?', 'It\'s all riding on this.',
	'Just do it!', 'Attack!'];
	var closeMsg = ['Not close at all.', 'Kinda close.', 'You\'re on fire!']
	var difference = Math.abs(previousGuesses[previousGuesses.length - 1] - correctAnswer);
	var closeness = 0;
	var msgId = parseInt(Math.random() * 9);
	if (difference > 25){
		closeness = 0;
	}
	else if (difference > 10){
		closeness = 1;
	}
	else{
		closeness = 2;
	};
	var message = messages[msgId] + " " + closeMsg[closeness];
	$('#message').text(message);
}

function loseGame(answer){
	$('#message').text('You lose! The answer was '+answer+'.');
	$('#message').after("<img class='endImg' src='images/loser.jpg'>");
	setTimeout(playAgain, 3500);
}

function winGame(answer){
	$('#message').text('You did it! The answer was '+answer+'!')
	$('#message').after("<img class='endImg' src='images/winner.jpg'>");
	setTimeout(playAgain, 3500);

}

function playAgain(){
	$('#playAgain').show();
	$('#mainContent').hide();
	$('.jumbotron').find('img').hide();
	$('.panel').hide();

}

function resetDOM(){
	$('#playAgain').hide();
	$('#mainContent').show();
	$('.jumbotron').find('img').hide();
	$('.lives').show();
	$('.panel').show();
	$('#message').text("You have 5 tries.")
	$('#higher').addClass('dimmed');
	$('#lower').addClass('dimmed');
	$('#guessInput').val('');
	$('.panel-body').text('');
}

function contains(array, value) {
	var contained = false;
	for (var key in array){
		if (!array.hasOwnProperty(key)){
			continue;
		};
		if (array[key] == value){
			contained = true;
		};
	};
	return contained;
}