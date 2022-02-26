import { getInputDirection } from "./utils/input.js";
import { outsideGrid } from "./utils/grid.js";

export const SNAKE_SPEED = 7;
let newSegments = 0;
let snakeBody = [
  { x: 11, y: 11 },
  { x: 11, y: 11 },
  { x: 11, y: 11 },
];

// Update snake
export function update() {
  addSegments();
  let inputDirection = getInputDirection();
  // update snakeBody from tail to head
  for (let i = snakeBody.length - 2; i >= 0; --i) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
  // update head with direction
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
  // check if head hit a wall and teleport snake head to the opposite wall
  if (outsideGrid(snakeBody[0])) {
    snakeTeleport();
  }
}
// Draws the snake
export function draw(gameBoard) {
  snakeBody.forEach((segment, index) => {
    let snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
}
// Set newSegmenet value when snake eats the food
export function expandSnake(amount) {
  newSegments += amount;
}
// Return true if the possition recived is on the snake
// If it gets called with the second param as true then check to see if the head is on the snake
export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPositions(segment, position);
  });
}
// Return snake head obj coordonates
export function getSnakeHead() {
  return snakeBody[0];
}
// Check to see if snake head intersected its body
export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}
// Check if the two possitions are at the same coordonates
function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}
// Add segments to snakeBody
function addSegments() {
  for (let i = 0; i < newSegments; ++i) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
  newSegments = 0;
}
// Teleport Snake head to the other side of the table
function snakeTeleport() {
  if (snakeBody[0].x === 22) {
    snakeBody[0].x = 1;
  } else if (snakeBody[0].x === 0) {
    snakeBody[0].x = 21;
  } else if (snakeBody[0].y === 22) {
    snakeBody[0].y = 1;
  } else if (snakeBody[0].y === 0) {
    snakeBody[0].y = 21;
  }
}
