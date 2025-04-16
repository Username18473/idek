const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let computer = { x: 100, y: 300, width: 100, height: 100, vx: 0, vy: 0, isThrown: false };
const gravity = 0.5;
const groundLevel = 350;

// Load computer image
const computerImage = new Image();
computerImage.src = 'computer.jpg'; // Replace with the actual path to your image

function drawComputer() {
  if (computerImage.complete) {
    // Draw the image if it's loaded
    ctx.drawImage(computerImage, computer.x, computer.y, computer.width, computer.height);
  } else {
    // Fallback to drawing a rectangle while the image is loading
    ctx.fillStyle = 'gray';
    ctx.fillRect(computer.x, computer.y, computer.width, computer.height);
  }
}

computerImage.onload = () => {
  console.log('Computer image loaded');
};

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
