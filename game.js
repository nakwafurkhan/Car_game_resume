        // DOM elements
        const startScreen = document.getElementById('start-screen');
        const gameScreen = document.getElementById('game-screen');
        const startGameBtn = document.getElementById('start-game');
        const viewResumeBtn = document.getElementById('view-resume');
        const contactInfoBtn = document.getElementById('contact-info');
        const car = document.getElementById('car');
        const leftBtn = document.getElementById('left');
        const rightBtn = document.getElementById('right');
        const gameArea = document.getElementById('game-area');

        let carPosition = 0;
        const carSpeed = 5;
        const gameAreaWidth = gameArea.offsetWidth;
        
        // Handle Game Start
        startGameBtn.addEventListener('click', () => {
            startScreen.classList.add('hidden');
            gameScreen.classList.remove('hidden');
            startGame();
        });

        // Placeholder functions for viewing resume and contact info
        viewResumeBtn.addEventListener('click', () => {
            alert("Resume Overview: Frontend Developer with expertise in React, JavaScript, and responsive design.");
        });

        contactInfoBtn.addEventListener('click', () => {
            alert("Contact: email@example.com | LinkedIn: linkedin.com/in/yourprofile | GitHub: github.com/yourusername");
        });

        // Game Logic
        let leftPressed = false;
        let rightPressed = false;
        const gameInterval = 1000 / 60;  // 60 FPS

        function startGame() {
            // Start game loop
            setInterval(() => {
                updateGameState();
                renderGame();
            }, gameInterval);
        }

        function updateGameState() {
            // Update car position
            if (leftPressed && carPosition > 0) {
                carPosition -= carSpeed;
            }
            if (rightPressed && carPosition < gameAreaWidth - car.offsetWidth) {
                carPosition += carSpeed;
            }
        }

        function renderGame() {
            // Render car position on screen
            car.style.left = `${carPosition}px`;
        }

        // Event Listeners for Button Controls
        leftBtn.addEventListener('mousedown', () => leftPressed = true);
        leftBtn.addEventListener('mouseup', () => leftPressed = false);
        leftBtn.addEventListener('mouseleave', () => leftPressed = false);

        rightBtn.addEventListener('mousedown', () => rightPressed = true);
        rightBtn.addEventListener('mouseup', () => rightPressed = false);
        rightBtn.addEventListener('mouseleave', () => rightPressed = false);

        // Keyboard Controls
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') leftPressed = true;
            if (e.key === 'ArrowRight') rightPressed = true;
        });

        document.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft') leftPressed = false;
            if (e.key === 'ArrowRight') rightPressed = false;
        });

        // Touch Controls for Mobile
        let touchStartX = 0;
        gameScreen.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        gameScreen.addEventListener('touchmove', (e) => {
            const touchEndX = e.touches[0].clientX;
            if (touchEndX < touchStartX) leftPressed = true;
            if (touchEndX > touchStartX) rightPressed = true;
        });

        gameScreen.addEventListener('touchend', () => {
            leftPressed = false;
            rightPressed = false;
        });