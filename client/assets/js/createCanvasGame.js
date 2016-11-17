"use strict";

export default function createCanvasGame(){

var canvas = document.getElementById("canvas");

var ctx = canvas.getContext("2d");

ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, canvas.width, canvas.height);
}
