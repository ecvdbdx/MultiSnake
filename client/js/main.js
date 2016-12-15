'use strict';

import Board from './board';
import server from './sendToServer.js';
import createCanvasGame from './createCanvasGame.js';
import * as constant from './constant';
import $ from 'jquery';

document.addEventListener('DOMContentLoaded', function () {

	server.on('connection', function(){

		$('form.username').submit(function(e) {
			e.preventDefault();
			var name = $(this).find('input.username')[0].value;

			$('div.username').remove();

			let context = createCanvasGame();
			let board = new Board(context);
			board.createScoreboard();

			/* Random place on board for testing purpose */
			let long = Math.floor(Math.random() * (constant.CANVAS_WIDTH/constant.GRID_SIZE)) * constant.GRID_SIZE;
			let lat = Math.floor(Math.random() * (constant.CANVAS_HEIGHT/constant.GRID_SIZE)) * constant.GRID_SIZE;
			board.newSnake(long, lat, name);

			server.on('new_apple', function(data){

				let apple = board.newApple(data.x, data.y);
				apple.draw();
			});
			
			{
				let x = board.snakes[board.snakes.length - 1].x;
				let y = board.snakes[board.snakes.length - 1].y;
				let color = board.snakes[board.snakes.length - 1].color;
				let name = board.snakes[board.snakes.length - 1].name;

				let snakeData = {x, y, name, color};

				server.sendNewUser(snakeData);
			}

			server.on('snakeData', snakeData => {
				board.newSnake(snakeData.x, snakeData.y, snakeData.name, snakeData.color);
				console.log(snakeData);
				// board.scoreboard.addPlayer(newSnake);
			});
           

			server.sendDeleteUser();
			server.sendMove();

			board.render();
		});
	});

	server.on('disconnection', function(){
        // Destroy Snake
	});

});
