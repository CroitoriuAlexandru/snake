import { onSnake, expandSnake } from "./snake.js";
import { randomPosition as randomFoodPosition } from "./utils/grid.js";

let food = getRandomFoodPosition();
let EXPANSION_RATE = 2;
// Update food
export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
  }
}
// Draw food
export function draw(gameBoard) {
  let foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}
// Generate random food position
function getRandomFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomFoodPosition();
  }
  return newFoodPosition;
}
