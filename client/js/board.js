'use strict';

import Snake from './snake';
import Apple from './apple';
import Scoreboard from './scoreboard';
import * as constant from './constant';
import EventEmitter from 'event-emitter-es6';

export default class Board extends EventEmitter{

	constructor(canvasContext) {
		super();
		this.context = canvasContext;
		this.snakes = [];
		this.apples = [];
		this.color = [
			"#468966",
			"#fff1a8",
			"#FFB03B",
			"#B64926",
			"#f64804",
			"#3032cd",
			"#CD2C24",
			"#13ad00",
			"#51f1e0",
			"#F2385A"
		];
		this.clientLocalSnake = undefined;
	}

	newSnake(x, y, name) {
		if(this.snakes.length < 10){
			let snake = new Snake(this.context, x, y, this.getAvailableColor(), name);
			
			snake.draw();

			this.snakes.push(snake);
			this.scoreboard.updateScores(this.snakes);
			return snake;
		} else {
			console.error('Error : only 10 snakes can be on the board');
		}
	}

	newApple(x, y) {
		let apple = new Apple(this.context, x, y);

		this.apples.push(apple);

		return apple;
	}

	generateApple(){

		var x = Math.floor(Math.random() * constant.CANVAS_WIDTH/constant.GRID_SIZE) * constant.GRID_SIZE + constant.GRID_SIZE/2;
		var y = Math.floor(Math.random() * constant.CANVAS_HEIGHT/constant.GRID_SIZE) * constant.GRID_SIZE + constant.GRID_SIZE/2;

		return this.newApple(x,y);

	}

	getAvailableColor() {
		let snakeColor = this.snakes.map(function (snake) {
			return snake.color;
		});

		return this.color.find(function (c) {
			if (!snakeColor.includes(c)) {
				return c;
			}
		});
	}

	createScoreboard() {
		this.scoreboard = new Scoreboard();

		this.scoreboard.playersContainer.appendTo('#scoreboard');
	}

	render() {
		this.intervalId = setInterval(() => {
			this.snakes.forEach(snake => {
				if(!snake.dead) {
					snake.move(this);
				}
			});
			this.scoreboard.updateScores(this.snakes, this.clientLocalSnake);
			this.checkSnakeSelfCollision();
			this.checkCollisionWithApples();
            // END TEMP
		}, constant.DELAY);
	}

	stopRendering(){
		clearInterval(this.intervalId);
	}

	checkSnakeSelfCollision() {

		this.snakes.forEach((snake) => {

			let firstBodyPart = snake.bodyParts[0];
			snake.bodyParts.forEach((bodyPart, index) => {
				if (index === 0) {
					return;
				}

				if (firstBodyPart.x < bodyPart.x + bodyPart.width &&
                    firstBodyPart.x + firstBodyPart.width > bodyPart.x &&
                    firstBodyPart.y < bodyPart.y + bodyPart.height &&
                    firstBodyPart.height + firstBodyPart.y > bodyPart.y) {

					//this.removeSnakeFromArray(i);
					snake.remove();
				}
			});
		});
	}

	checkCollisionWithApples() {
		this.snakes.forEach((snake, i) => {

			let firstBodyPart = snake.bodyParts[0];

			this.apples.forEach((apple, index) => {
				if (firstBodyPart.x < apple.x + apple.radius * 2 &&
	                firstBodyPart.x + firstBodyPart.width > apple.x &&
	                firstBodyPart.y < apple.y + apple.radius * 2 &&
	                firstBodyPart.height + firstBodyPart.y > apple.y) {

					this.apples.splice(index, 1);
					snake.addScore();
					snake.addBodyPart();

					this.emit('appleEaten', {'x':apple.x, 'y':apple.y});
				}
			});
		});
	}

	removeSnakeFromArray(i) {
		this.snakes[i].remove();
		this.snakes.splice(i, 1);
		this.scoreboard.updateScores(this.snakes[i]);
	}

}
