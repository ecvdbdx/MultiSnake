'use strict';

import Board from './board';
import server from './sendToServer.js';
import createCanvasGame from './createCanvasGame.js';
import displayMessage from './displayMessage.js';
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

			let long = Math.floor(Math.random() * (constant.CANVAS_WIDTH/constant.GRID_SIZE)) * constant.GRID_SIZE;
			let lat = Math.floor(Math.random() * (constant.CANVAS_HEIGHT/constant.GRID_SIZE)) * constant.GRID_SIZE;
			let clientLocaleSnake = undefined;

			board.clientLocalSnake = clientLocaleSnake;


			server.sendSnakeNew(name);
      
			server.on('new_apple', function(data){
				let apple = board.newApple(data.x, data.y);
				apple.draw();
			});

			server.on('new_snake', function(data){
				clientLocaleSnake = board.newSnake(data.x, data.y, data.name);
			});      
			server.on('joinGame', function(apples){
				apples.forEach((apple) => {
					let drawApple = board.newApple(apple.x, apple.y);
					drawApple.draw();
				});
			});


			server.on('setDirection', data => {
				board.snakes.forEach(snake => {
					if (snake.name === data.name) {
						snake.direction = data.direction;
					}
				});
			});

			//server.sendDeleteUser();
			server.sendMove();

			//server.sendAppleEaten(x, y);

			//board.render();
			board.on('appleEaten', function(position){
				server.sendAppleEaten(position);
			});



			server.on('disconnect', function(){
				board.stopRendering();
				displayMessage("Warning !", "You have been disconnected from the server ! Check your internet connection !");
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
