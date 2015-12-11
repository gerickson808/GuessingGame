$(document).ready(function(){
	$('#playAgain').hide().removeClass('hidden');
	var correctAnswer = generateNumber();
	var lives = 5;
	console.log(correctAnswer);  //DELETE THIS WHEN DONE TESTING
	$('#submit').on('click',function(){
		answer = submitGuess(correctAnswer);
		switch (answer) {
			case -1:
				loseLife(lives);
				higher();
				wrongMessage();
				lives -= 1;
				break;
			case 1:
				loseLife(lives);
				lower();
				wrongMessage();
				lives -=1;
				break;
			case 0:
				winGame(correctAnswer);
				break;
			default:
		}
		console.log(lives); // DELETE AFTER TESTING
		if (lives == 0){
			loseGame(correctAnswer);
		};
	});
	$('#play-again').on('click', function(){
		lives = 5;
		resetGame();
		correctAnswer = generateNumber();
	});
});



function generateNumber() {
	return parseInt(Math.random() * 100 + 1);
}

function submitGuess(answer){
	var guess = $('#guessInput').val();
	if (isInt(guess)){
		if (guess==answer){
			return 0;
		}
		else if (guess < answer){
			return -1;
		}
		else {
			return 1;
		};
	}
	else {
		alert("Please guess an integer!");
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

function wrongMessage(){
	var messages = ['Think carefully.', 'Seize the moment.',
	'Don\'t let your dreams be dreams.', 'Find your inner strength.',
	'Think. Think!', 'Phone a friend?', 'It\'s all riding on this.',
	'Just do it!', 'Attack!'];
	var msgId = parseInt(Math.random() * 9);
	$('#message').text(messages[msgId]);
}

function loseGame(answer){
	alert('You lose. The answer was '+answer+'.');
	playAgain();
}

function winGame(answer){
	alert('You did it! The answer was '+answer+'!')
	playAgain();
}

function playAgain(){
	$('#playAgain').show();
	$('#mainContent').hide();
	$('.panel').hide();

}

function resetGame(){
	$('#playAgain').hide();
	$('#mainContent').show();
	$('.panel').show();
	$('#message').text("You have 5 tries.")
	$('#higher').addClass('dimmed');
	$('#lower').addClass('dimmed');
	$('#guessInput').val('');
}