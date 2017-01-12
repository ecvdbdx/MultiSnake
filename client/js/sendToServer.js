"use strict";
import io from 'socket.io-client';
var socket = io();
var ee = require('event-emitter');

var clientId;

// Envoi vers le serveur

var serverObject = ee({
	sendDeleteUser(){
		socket.emit('disconnect', 'Un utilisateur s\'est déconnecté');
	},
	sendMove(event){
		socket.emit('movement', event);
	},
	sendAppleEaten(position){
		socket.emit('appleEaten', position);
	},
	sendSnakeNew(name){
		console.log('sendToServer');
		socket.emit('snakeNew', name);
	},
	changeDirection(name, direction) {
		socket.emit('changeDirection', {name: name, direction: direction});
	}
});

// Reception du serveur et envoi vers le client

socket.on('start', function(){
	serverObject.emit('start');
});

socket.on('end', function(){
	serverObject.emit('end');
});

socket.on('client ID', function(id){
	clientId = id;
});

socket.on('connect message', function() {
	console.log('connection');
	serverObject.emit('connection');
});

socket.on('disconnect', function() {
	serverObject.emit('disconnect');
});

socket.on('new_apple', function(data) {
	serverObject.emit('new_apple', data);
});

socket.on('joinGame', function(apples) {
	serverObject.emit('joinGame', apples);
});

socket.on('appleEaten', function(data) {
	console.log('sendto');
	serverObject.emit('new_apple', data);
});

socket.on('new_snake', function(data) {
	serverObject.emit('new_snake', data);
});

socket.on('snakeMove', function(data) {
	console.log('sendto');
	serverObject.emit('new_snake_position', data);
});

socket.on('setDirection', data => {
	serverObject.emit('setDirection', data);
});

window.addEventListener('offline', function() {
	serverObject.emit('disconnect');
});

 
export default serverObject;
