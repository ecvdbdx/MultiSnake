"use strict";
import io from 'socket.io-client';
var socket = io();
var ee = require('event-emitter');

var clientId;

var serverObject = ee({
	sendNewUser(snake){
		socket.emit('new snake', snake);
	},
	sendDeleteUser(){
		socket.emit('disconnect', 'Un utilisateur s\'est déconnecté');
	},
	sendMove(event){
		socket.emit('movement', event);
	}
});

socket.on('start', function(){
	serverObject.emit('start');
});

socket.on('end', function(){
	serverObject.emit('end');
});

socket.on('snakes', snakes => {
	console.log(snakes);
});

socket.on('connect message', function() {
	serverObject.emit('connection');
});

socket.on('disconnect', function() {
	serverObject.emit('disconnect');
});

socket.on('new_apple', function(data) {
	serverObject.emit('new_apple', data);
});

window.addEventListener('offline', function() {
	serverObject.emit('disconnect');
});

 
export default serverObject;