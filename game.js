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


function update() {
  if (computer.isThrown) {
    computer.vy += gravity; // Apply gravity
    computer.x += computer.vx; // Update horizontal position
    computer.y += computer.vy; // Update vertical position

    // Check if the computer goes off-screen
    if (computer.x + computer.width < 0 || computer.x > canvas.width || computer.y > canvas.height) {
      computer.x = 100; // Reset x position
      computer.y = 300; // Reset y position
      computer.vx = 0;  // Reset horizontal velocity
      computer.vy = 0;  // Reset vertical velocity
      computer.isThrown = false; // Stop motion
    }

    // Check for collision with the ground
    if (computer.y + computer.height >= groundLevel) {
      computer.y = groundLevel - computer.height;
      computer.vy = 0;
      computer.isThrown = false; // Stop motion
    }
  }
}
