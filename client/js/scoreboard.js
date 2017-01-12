import $ from 'jquery';

export default class Scoreboard {

	constructor() {
		this.playersContainer = $('<ol>', {id: 'player-list'});
	}

	createPlayer(player, clientLocalSnake) {
		var li = $('<li>');
		li.css('color', player.color);
		li.data('name', player.name);
		li.append(
			$('<span>', {
				class: 'name',
				text: player.name
			}),
			$('<span>', {
				class: 'score',
				text: player.score
			})
		);

  		if(player === clientLocalSnake){
  			li.addClass('current');
		}

		return li;
	}

	updateScores(players, clientLocalSnake) {
		players.sort(function(p1, p2){
			return p2.score - p1.score;
		})

		this.playersContainer.empty();

		players.forEach((player) => {
			this.playersContainer.append(this.createPlayer(player, clientLocalSnake));
		});
	}
}