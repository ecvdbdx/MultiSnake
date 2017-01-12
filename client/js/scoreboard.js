import $ from 'jquery';

export default class Scoreboard {

	constructor() {
		this.playersToLi = new WeakMap;
		this.playersContainer = $('<ol>', {id: 'player-list'});
	}

	createPlayer(player) {
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

		return li;
	}

	updateScores(players, clientLocalSnake) {
		players.sort(function(p1, p2){
			return p2.score - p1.score;
		})

		this.playersContainer.empty();

		players.forEach((player) => {
      if(player === clientLocalSnake){
				this.playersToLi.get(player).addClass('current');
			}
			this.playersContainer.append(this.createPlayer(player));
		});
	}
}