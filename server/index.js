'use strict';

const path = require('path');
const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

import * as constant from '../client/js/constant';
import Board from '../client/js/board.js';
import Snake from '../client/js/snake.js';
import Scoreboard from '../client/js/scoreboard.js';

var b = new Board();
let inProgressGame = false;


app.use(express.static(path.join(__dirname, '..', 'client')));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {

	io.emit('connect message');
	console.log('Nouvelle connexion');

	socket.on('movement', event => {
		io.emit('movement', event);
	});

	socket.on('disconnect', function() {
		io.emit('disconnect message');
	});

	socket.on('appleEaten', position => {
		b.apples.forEach((apple, index) => {
			if(apple.x === position.x && apple.y === position.y){
				b.apples.splice(index, 1);
			}
		});
	});

	socket.on('snakeNew', name => {

		let long = Math.floor(Math.random() * (constant.CANVAS_WIDTH/constant.GRID_SIZE)) * constant.GRID_SIZE;
		let lat = Math.floor(Math.random() * (constant.CANVAS_HEIGHT/constant.GRID_SIZE)) * constant.GRID_SIZE;
		let snake = b.newSnake(long, lat, name);
		console.log("snake : " + snake.name);
		io.emit('new_snake', snake);

		if(inProgressGame){
			io.emit('joinGame', b.apples);
		}
	});
  
	socket.on('changeDirection', (data) => {
		io.emit('setDirection', data);
	});

	if(!inProgressGame){
		inProgressGame = true;
		setInterval(function() { 
			io.emit('start', 'Démarrage de la partie');
			console.log('Démarrage de la partie');
			
			while(b.apples.length < constant.DEFAULT_APPLES_NUMBER){
				let apple = b.generateApple();
				io.emit('new_apple', apple);
			}

			setTimeout(function() {
				inProgressGame = false;
				console.log('Fin de la partie');
				io.emit('end', 'Fin de la partie');
			}, constant.GAME_DURATION);
		}, constant.TOTAL_DURATION);
	}else{
		//une partie est déjà en cours
		console.log('game en cours');
	}
});

http.listen(3000, () => {
	console.log('listening on *:3000');
});
