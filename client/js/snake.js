'use strict';

import SnakePart from './snakePart';
import * as constant from './constant';

export default class Snake {

	constructor(context, x, y, color, name) {
		this.context = context;
		this.x = x;
		this.y = y;
		this.score = 0;
        // TEMP: SET THE START DIRECTION TO RIGHT FOR TEST PURPOSES
		this.direction = 'right';
        // END TEMP
		this.color = color;
		this.width = constant.SNAKE_WIDTH;
		this.height = constant.SNAKE_HEIGHT;

		this.bodyParts = [];
		this.name = name;
		this.dead = false;
	}

	draw() {
		let snake = this.addBodyPart(this.x, this.y);
		this.addBodyPart(this.x, this.y);
		this.addBodyPart(this.x, this.y);

		snake.draw();
	}

	addBodyPart() {
		let snakePart = new SnakePart(this.context, this.x, this.y, this.width, this.height, this.color);
		this.bodyParts.push(snakePart);

		return snakePart;
	}

	moveDown() {
		let lastBodyPart = this.bodyParts[this.bodyParts.length - 1];
		let firstBodyPart = this.bodyParts[0];

		lastBodyPart.remove();

		lastBodyPart.y = firstBodyPart.y + this.height + constant.BODY_PART_MARGIN;
		lastBodyPart.x = firstBodyPart.x;

		if (firstBodyPart.y + this.height >= this.context.canvas.clientHeight - constant.BODY_PART_MARGIN) {
			lastBodyPart.y = 0;
		}

		this.moveBodyPartsInArray();
	}

	moveUp() {
		let lastBodyPart = this.bodyParts[this.bodyParts.length - 1];
		let firstBodyPart = this.bodyParts[0];

		lastBodyPart.remove();

		lastBodyPart.y = firstBodyPart.y - this.height - constant.BODY_PART_MARGIN;
		lastBodyPart.x = firstBodyPart.x;

		if (firstBodyPart.y <= 0) {
			lastBodyPart.y = this.context.canvas.clientHeight - (this.height + constant.BODY_PART_MARGIN);
		}

		this.moveBodyPartsInArray();
	}

	moveLeft() {
		let lastBodyPart = this.bodyParts[this.bodyParts.length - 1];
		let firstBodyPart = this.bodyParts[0];

		lastBodyPart.remove();

		lastBodyPart.y = firstBodyPart.y;

		lastBodyPart.x = firstBodyPart.x - this.width - constant.BODY_PART_MARGIN;

		if (firstBodyPart.x <= 0) {
			lastBodyPart.x = this.context.canvas.clientWidth - (this.width + constant.BODY_PART_MARGIN);
		}

		this.moveBodyPartsInArray();
	}

	moveRight() {
		let lastBodyPart = this.bodyParts[this.bodyParts.length - 1];
		let firstBodyPart = this.bodyParts[0];

		lastBodyPart.remove();

		lastBodyPart.y = firstBodyPart.y;

		lastBodyPart.x = firstBodyPart.x + this.width + constant.BODY_PART_MARGIN;

		if (lastBodyPart.x >= this.context.canvas.clientWidth) {
			lastBodyPart.x = 0;
		}

		this.moveBodyPartsInArray();
	}

	addScore() {
		this.score += 1;
	}

	moveBodyPartsInArray() {
		this.bodyParts.splice(0, 0, this.bodyParts.splice(this.bodyParts.length - 1, 1)[0]);
	}

	move() {
		/*this.checkCollisionWithApples(board.apples);*/
		if (this.direction === 'right') {
			return this.moveRight();
		}
		else if (this.direction === 'down') {
			return this.moveDown();
		}
		else if (this.direction === 'up') {
			return this.moveUp();
		}
		else if (this.direction === 'left') {
			return this.moveLeft();
		}
	}

	remove() {
		this.bodyParts.forEach((bodyPart) => {
			bodyPart.remove();
		});
		this.dead = true;
	}

}
