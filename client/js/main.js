'use strict';

import Board from './board';
import server from './sendToServer.js';
import createCanvasGame from './createCanvasGame.js';
import displayMessage from './displayMessage.js';
import * as constant from './constant';
import $ from 'jquery';



document.addEventListener('DOMContentLoaded', function () {
	server.on('connection', function(){

		var uidP = new Promise(function(resolve) {
			server.on('uid', function(data){
				var uid = data;
				resolve(uid);
			});
		});


		$('form.username').submit(function(e) {
			e.preventDefault();
			var name = $(this).find('input.username')[0].value;
			$('div.username').remove();

			uidP.then(function(uid) {

			let context = createCanvasGame();
			let board = new Board(context);
			board.createScoreboard();

			setInterval(() => {
			console.log('board.snakes.length', board.snakes.length);
			}, 2000)

			let long = Math.floor(Math.random() * (constant.CANVAS_WIDTH/constant.GRID_SIZE)) * constant.GRID_SIZE;
			let lat = Math.floor(Math.random() * (constant.CANVAS_HEIGHT/constant.GRID_SIZE)) * constant.GRID_SIZE;

			const clientLocaleSnake = board.newSnake(long, lat, name, uid, 'down');

			board.clientLocalSnake = clientLocaleSnake;

			var snakeuser = {
				long: long,
				lat: lat,
				name: name,
				uid: uid,
				direction: "down"
			};

			server.sendSnakeNew(snakeuser);

			server.on('new_apple', function(data){
				let apple = board.newApple(data.x, data.y);
				apple.draw();
			});

				server.on('snakes', function(snakes){

					var verif = false;

					snakes.forEach(data => {
						if (data.id !== uid) {
							board.snakes.forEach(snake => {
								if (data.id === snake.id)
								{
									verif = true;
								}
							});

							if (verif === false)
							{
								board.newSnake(data.x, data.y, data.name, data.id, data.direction);
							}
						}
						console.log('snakes for each', data.id);
						verif = false;
					});
				});

				console.log('BOARD SNAKES', board.snakes.id);

				server.on('setDirection', function(data) {
					board.snakes.forEach(snake => {
						if (snake.id === uid) {
							snake.direction = data.direction;
							console.log('setdirection', snake.id, data.id, uid);
						}
						
					});
				});

			//server.sendDeleteUser();
			server.sendMove();

			//server.sendAppleEaten(x, y);

			board.render();
			board.on('appleEaten', function(position){
				server.sendAppleEaten(position);
			});

			server.on('disconnect', function(){
				board.stopRendering();
				displayMessage("Warning !", "You have been disconnected from the server ! Check your internet connection !");
			});

			$('body').keydown((e) => {
				if (e.keyCode === 37 && clientLocaleSnake.direction !== 'right') {
					server.changeDirection(clientLocaleSnake.id, 'left');
				}
				else if (e.keyCode === 38 && clientLocaleSnake.direction !== 'down') {
					server.changeDirection(clientLocaleSnake.id, 'up');
				}
				else if (e.keyCode === 39 && clientLocaleSnake.direction !== 'left') {
					server.changeDirection(clientLocaleSnake.id, 'right');
				}
				else if (e.keyCode === 40 && clientLocaleSnake.direction !== 'up') {
					server.changeDirection(clientLocaleSnake.id, 'down');
				}
			});

		});



		});
	});
});
