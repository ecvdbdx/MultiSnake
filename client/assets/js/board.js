'use strict';

import createCanvasGame from './createCanvasGame.js';
import Snake from './snake';
import Apple from './apple';

export default class Board {

	// A snake store his position (x and y) and his score
	constructor() {
		this.snakes = [];
		this.context = createCanvasGame();
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
	}

	newSnake(x, y){
		let snake = new Snake(this.context,x,y, this.colorAvailable());
		snake.draw();
		this.snakes.push(snake);
	}

	newApple(x,y){
		let apple = new Apple(this.context,x,y);
		apple.draw();
		this.apples.push(apple);
	}

	colorAvailable(){
		let colorsnake = this.snakes.map(function(snake){
			return snake.color;
		});

		let color_available =  this.color.filter(function(c) {
			return colorsnake.indexOf(c) === -1;
		});
		return color_available[0];
	}

}
