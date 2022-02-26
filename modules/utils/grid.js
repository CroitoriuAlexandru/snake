const GRID_SIZE = 21;
// Return random position within grid
export function randomPosition() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE + 1),
    y: Math.floor(Math.random() * GRID_SIZE + 1),
  };
}
// Check if position is outside the grid
export function outsideGrid(position) {
  return (
    position.x < 1 ||
    position.x > GRID_SIZE ||
    position.y < 1 ||
    position.y > GRID_SIZE
  );
}
