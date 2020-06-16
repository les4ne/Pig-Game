/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, diceFirst, diceSecond, gamePlaying, prevRoundScore;


init();


document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
		var diceFirst = Math.floor(Math.random() * 6) + 1;
		var diceSecond = Math.floor(Math.random() * 6) + 1;
		var diceFirstDOM = document.querySelector('.dice-0');
		var diceSecondDOM = document.querySelector('.dice-1');

		diceFirstDOM.style.display = 'block';
		diceFirstDOM.src = 'dice-' + diceFirst + '.png';

		diceSecondDOM.style.display = 'block';
		diceSecondDOM.src = 'dice-' + diceSecond + '.png';

		// if ((prevRoundScore === 6 && diceFirst === 6) || (prevRoundScore === 6 && diceSecond === 6)) {
		// 	scores[activePlayer] = 0;
		// 	// prevRoundScore = diceFirst;
		// 	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		// 	nextPlayer();
		// } else 

		if (diceFirst !== 1 && diceSecond !== 1) {
			roundScore += diceFirst + diceSecond;
			console.log('roundScore' ,roundScore);
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			nextPlayer();
		}
		prevRoundScore = diceFirst;
	}
});


document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		scores[activePlayer] += roundScore;
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		var input = document.querySelector('.victory-score').value;
		var victoryScore;

		if (input) {
			victoryScore = input;
		} else {
			victoryScore = 100;
		}

		if (scores[activePlayer] >= victoryScore) {
			console.log('victoryScore', victoryScore);
			document.querySelector('#name-' + activePlayer).textContent = 'Winner';
			document.querySelector('.dice-0').style.display = 'none';
			document.querySelector('.dice-1').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			nextPlayer();
		}
	}
});


document.querySelector('.btn-new').addEventListener('click', init);


function nextPlayer() {
	activePlayer = activePlayer === 0 ? 1 : 0;
	roundScore = 0;

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-1-panel').classList.toggle('active');
	document.querySelector('.player-0-panel').classList.toggle('active');

	document.querySelector('.dice-0').style.display = 'none';
	document.querySelector('.dice-1').style.display = 'none';
}


function init() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	document.querySelector('.dice-0').style.display = 'none';
	document.querySelector('.dice-1').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 0';
	document.getElementById('name-1').textContent = 'Player 1';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}

