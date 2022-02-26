import { update as updateFood, draw as drawFood } from "./modules/food.js";
import {
  SNAKE_SPEED,
  snakeIntersection,
  update as updateSnake,
  draw as drawSnake,
} from "./modules/snake.js";

let gameBoard = document.getElementById("gameBoard");
let lastRenderTime = 0;
let gameOver = false;

// Define speed of game based on SNAKE_SPEED, using frames
export function main(currentRenderTime) {
  // Restart game by reload of the page
  if (gameOver) {
    if (confirm("You hit yourself, press ok to restart")) window.location = "/";
    return;
  }
  window.requestAnimationFrame(main);
  let secondsSinceLastRender = (currentRenderTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  lastRenderTime = currentRenderTime;
  update();
  draw();
}
window.requestAnimationFrame(main);
// Update game
function update() {
  updateFood();
  updateSnake();
  checkForDeath();
}
// Draw game
function draw() {
  gameBoard.innerHTML = "";
  drawFood(gameBoard);
  drawSnake(gameBoard);
}
// Check for win/lose conditions and set gameOver as answare
function checkForDeath() {
  gameOver = snakeIntersection();
}
