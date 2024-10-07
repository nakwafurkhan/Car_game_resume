// Initialize variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startScreen = document.getElementById('startScreen');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');

// Set up car variables
let carX = 0;
let carY = 0;
let carWidth = 0;
let carHeight = 0;
let carSpeed = 5; // Speed of the car
let obstacles = []; // Array to store obstacles
let isGameRunning = false;
let touchStartX = 0; // For swipe controls
let canvasWidth = 800;
let canvasHeight = 600;

// Event listeners for buttons
document.getElementById('playBtn').addEventListener('click', () => {
    startScreen.style.display = 'none';
    canvas.style.display = 'block';
    startGame();
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Make the canvas responsive
function setCanvasSize() {
    // Adjust canvas size based on the screen size
    canvas.width = Math.min(window.innerWidth, canvasWidth);
    canvas.height = Math.min(window.innerHeight, canvasHeight);

    // Set the car's initial position
    carWidth = canvas.width / 8;  // Adjust car size relative to canvas width
    carHeight = carWidth / 2;
    carX = (canvas.width - carWidth) / 2;  // Center the car horizontally
    carY = canvas.height - carHeight - 20;  // Position the car near the bottom
}

// Start the game
function startGame() {
    isGameRunning = true;
    setCanvasSize();  // Make sure canvas is resized correctly before starting
    gameLoop();
}

// Handle window resize
window.addEventListener('resize', () => {
    setCanvasSize();  // Resize canvas on window resize
});

// Game loop
function gameLoop() {
    if (!isGameRunning) return;
    update();
    render();
    requestAnimationFrame(gameLoop);
}

// Update game state
function update() {
    // Update car position based on input and obstacles
    obstacles.forEach((obstacle, index) => {
        obstacle.y += 5;  // Move obstacle down

        // Remove obstacles that go off the screen
        if (obstacle.y > canvas.height) {
            obstacles.splice(index, 1);
        }

        // Check for collision between car and obstacle
        if (
            carX < obstacle.x + obstacle.width &&
            carX + carWidth > obstacle.x &&
            carY < obstacle.y + obstacle.height &&
            carY + carHeight > obstacle.y
        ) {
            displayResumeInfo("You encountered a challenge!");
        }
    });

    // Randomly generate new obstacles (roadblocks)
    if (Math.random() < 0.02) {
        obstacles.push({
            x: Math.random() * (canvas.width - 50),
            y: 0,
            width: 50,
            height: 50,
            color: 'red' // Color to represent challenges
        });
    }
}

// Render game objects
function render() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the road
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the car
    ctx.fillStyle = "#555";
    ctx.fillRect(carX, carY, carWidth, carHeight);

    // Draw obstacles
    obstacles.forEach(obstacle => {
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

// Example function for collision and displaying modal
function displayResumeInfo(text) {
    modalContent.innerText = text;
    modal.style.display = 'block';
}

// Add keyboard control (for desktop)
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') moveRight();
    if (e.key === 'ArrowLeft') moveLeft();
});

// Add swipe control (for mobile)
canvas.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;  // Record the initial touch position
});

canvas.addEventListener('touchmove', (e) => {
    const touchX = e.touches[0].clientX;
    if (touchX - touchStartX > 50) {
        moveRight();  // If the swipe is right
    } else if (touchX - touchStartX < -50) {
        moveLeft();   // If the swipe is left
    }
});

// Car movement functions
function moveRight() {
    if (carX + carWidth + carSpeed <= canvas.width) {
        carX += carSpeed;
    }
}

function moveLeft() {
    if (carX - carSpeed >= 0) {
        carX -= carSpeed;
    }
}
