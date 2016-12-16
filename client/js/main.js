'use strict';

import Board from './board';
import server from './sendToServer.js';
import createCanvasGame from './createCanvasGame.js';
import displayDisconnectMessage from './displayDisconnectMessage.js';
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
			let clientLocaleSnake = board.newSnake(long, lat, name);

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
           

			server.on('setDirection', data => {
				board.snakes.forEach(snake => {
					if (snake.name === data.name) {
						snake.direction = data.direction;
					}
				});
			});

			server.sendNewUser();
			//server.sendDeleteUser();
			server.sendMove();

			//server.sendAppleEaten(x, y);

			board.render();
			board.on('appleEaten', function(position){
				server.sendAppleEaten(position);
			});

			server.on('disconnect', function(){
				board.stopRendering();
				displayDisconnectMessage();
			});

			$('body').keydown((e) => {
				if (e.keyCode === 37 && clientLocaleSnake.direction !== 'right') {
					server.changeDirection(clientLocaleSnake.name, 'left');
				}
				else if (e.keyCode === 38 && clientLocaleSnake.direction !== 'down') {
					server.changeDirection(clientLocaleSnake.name, 'up');
				}
				else if (e.keyCode === 39 && clientLocaleSnake.direction !== 'left') {
					server.changeDirection(clientLocaleSnake.name, 'right');
				}
				else if (e.keyCode === 40 && clientLocaleSnake.direction !== 'up') {
					server.changeDirection(clientLocaleSnake.name, 'down');
				}
			});
		});
	});
});
