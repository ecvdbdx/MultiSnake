"use strict";
import io from 'socket.io-client';
var socket = io();
var ee = require('event-emitter');

var clientId;

var serverObject = ee({
	sendNewUser(snakeData){
		socket.emit('new snake', snakeData);
	},
	sendDeleteUser(){
		socket.emit('disconnect', 'Un utilisateur s\'est déconnecté');
	},
	sendMove(event){
		socket.emit('movement', event);
	},
	sendAppleEaten(position){
		socket.emit('appleEaten', position);
	},
	changeDirection(name, direction) {
		socket.emit('changeDirection', {name: name, direction: direction});
	}
});

socket.on('start', function(){
	serverObject.emit('start');
});

socket.on('end', function(){
	serverObject.emit('end');
});

socket.on('connect message', function() {
	serverObject.emit('connection');
});

socket.on('disconnect', function() {
	serverObject.emit('disconnect');
});

socket.on('snakeData', snakeData => {
	serverObject.emit('snakeData', snakeData);
});

socket.on('new_apple', function(data) {
	serverObject.emit('new_apple', data);
});

socket.on('appleEaten', function(data) {
	console.log('sendto');
	serverObject.emit('new_apple', data);
});

socket.on('setDirection', data => {
	serverObject.emit('setDirection', data);
});

window.addEventListener('offline', function() {
	serverObject.emit('disconnect');
});

 
export default serverObject;
