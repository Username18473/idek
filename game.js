const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let computer = { x: 100, y: 300, width: 50, height: 30, vx: 0, vy: 0, isThrown: false };
const gravity = 0.5;
const groundLevel = 350;

// Draw the computer
function drawComputer() {
  ctx.fillStyle = 'gray';
  ctx.fillRect(computer.x, computer.y, computer.width, computer.height);
}

// Update physics
function update() {
  if (computer.isThrown) {
    computer.vy += gravity; // Apply gravity
    computer.x += computer.vx; // Update horizontal position
    computer.y += computer.vy; // Update vertical position

    // Check for collision with the ground
    if (computer.y + computer.height >= groundLevel) {
      computer.y = groundLevel - computer.height;
      computer.vy = 0;
      computer.isThrown = false; // Stop motion
      console.log('Computer broken!');
    }
  }
}

// Handle mouse click to "throw"
canvas.addEventListener('click', () => {
  if (!computer.isThrown) {
    computer.vx = 5; // Horizontal velocity
    computer.vy = -10; // Initial upward velocity
    computer.isThrown = true;
  }
});

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  drawComputer();
  update();
  requestAnimationFrame(gameLoop);
}

gameLoop();
