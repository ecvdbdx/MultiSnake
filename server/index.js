'use strict';

const path = require('path');
const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

import * as constant from '../client/js/constant';
import Board from '../client/js/board.js';

var b = new Board();

app.use(express.static(path.join(__dirname, '..', 'client')));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {

	io.emit('connect message');

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

	socket.on('changeDirection', (data) => {
		io.emit('setDirection', data);
	});

	startGame();

	socket.on('newPlayer', function(name) {
		io.emit('joinGame', b.apples);
	});
});

let partieEnCours = false;

function startGame(){
	if(partieEnCours === false){
		setInterval(function() {
			partieEnCours = true;
			io.emit('start', 'Démarrage de la partie');

			console.log('interval');
			while(b.apples.length < constant.DEFAULT_APPLES_NUMBER){
				let apple = b.generateApple();
				io.emit('new_apple', apple);
			}

			setTimeout(function() {
				partieEnCours = false;
				io.emit('end', 'Fin de la partie');
			}, constant.GAME_DURATION);
		}, constant.TOTAL_DURATION);
	}else{
		//une partie est déjà en cours
	}
}
http.listen(3000, () => {
	console.log('listening on *:3000');
});
