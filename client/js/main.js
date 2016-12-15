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
			

			let snake = board.snakes[board.snakes.length - 1];
			server.sendNewUser(snake);
           

			server.sendDeleteUser();
			server.sendMove();

			board.render();
		});
	});

	server.on('disconnection', function(){
        // Destroy Snake
	});

});
