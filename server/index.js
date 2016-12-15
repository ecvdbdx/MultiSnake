'use strict';

const path = require('path');
const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const totalDuration = 5000;
const gameDuration = 3000;

const playersNames = [];

app.use(express.static(path.join(__dirname, '..', 'client')));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {

	io.emit('client ID', socket.id);
	io.emit('connect message');
	socket.on('movement', event => {
		io.emit('movement', event);
	});
	socket.on('disconnect', () => {
		io.emit('disconnect message');
	});
});
	
setInterval(function() {
	io.emit('start', 'Démarrage de la partie');
	setTimeout(function() {
		io.emit('end', 'Fin de la partie');
	}, gameDuration);
}, totalDuration);

http.listen(3000, () => {
	console.log('listening on *:3000');
});