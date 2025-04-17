const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let computers = []; // Array to store multiple computers
const gravity = 0.5;
const groundLevel = 350;

// Currency system
let currency = 0; // Initial currency balance

// Load initial computer image
const computerImage = new Image();
computerImage.src = 'computer.jpg'; // Replace with the actual path to your default image

// Function to create a new computer
function createComputer(x, y, width, height) {
    return { x, y, width, height, vx: 0, vy: 0, isThrown: false };
}

// Function to draw all computers
function drawComputers() {
    computers.forEach(computer => {
        if (computerImage.complete) {
            ctx.drawImage(computerImage, computer.x, computer.y, computer.width, computer.height);
        } else {
            ctx.fillStyle = 'gray';
            ctx.fillRect(computer.x, computer.y, computer.width, computer.height);
        }
    });
}

// Function to display currency
function drawCurrency() {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`Currency: $${currency}`, 10, 30); // Display currency at the top-left corner
}

// Update physics for all computers
function updateComputers() {
    computers.forEach(computer => {
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

                // Reward currency when a computer lands
                currency += 10; // Add $10 to the balance
            }
        }
    });
}

// Handle mouse click to "throw" or spawn a new computer
canvas.addEventListener('click', () => {
    const newComputer = createComputer(100, 300, 100, 100); // Create a new computer
    newComputer.vx = 5; // Horizontal velocity
    newComputer.vy = -10; // Initial upward velocity
    newComputer.isThrown = true;
    computers.push(newComputer); // Add the new computer to the array
});

// Function to buy new electronics and update the image
function buyElectronics(price, type, imagePath) {
    if (currency >= price) {
        currency -= price; // Deduct the price from the balance
        computerImage.src = imagePath; // Change the computer image to the purchased one
        alert(`You bought a ${type}!`);
    } else {
        alert('Not enough currency!');
    }
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    drawCurrency(); // Draw the current currency
    drawComputers(); // Draw all computers
    updateComputers(); // Update all computers
    requestAnimationFrame(gameLoop);
}

// Example: Add buttons to buy new electronics
const buyLaptopButton = document.createElement('button');
buyLaptopButton.textContent = 'Buy Laptop ($50)';
buyLaptopButton.onclick = () => buyElectronics(50, 'laptop', 'laptop.jpg'); // Replace with the actual laptop image path
document.body.appendChild(buyLaptopButton);

const buyTabletButton = document.createElement('button');
buyTabletButton.textContent = 'Buy Tablet ($100)';
buyTabletButton.onclick = () => buyElectronics(100, 'tablet', 'tablet.jpg'); // Replace with the actual tablet image path
document.body.appendChild(buyTabletButton);

gameLoop();
