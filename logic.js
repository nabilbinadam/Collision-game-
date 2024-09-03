const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player1 = {
    x: 50,
    y: 50,
    width: 50,
    height: 50,
    color: 'blue',
    health: 100,
    score: 0,
    dx: 0,
    dy: 0
};

const player2 = {
    x: 500,
    y: 300,
    width: 50,
    height: 50,
    color: 'green',
    health: 100,
    score: 0,
    dx: 0,
    dy: 0
};

const keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function update() {
    // Player 1 movement (WASD)
    player1.dx = 0;
    player1.dy = 0;
    if (keys['w']) player1.dy = -5;
    if (keys['s']) player1.dy = 5;
    if (keys['a']) player1.dx = -5;
    if (keys['d']) player1.dx = 5;

    // Player 2 movement (Arrow keys)
    player2.dx = 0;
    player2.dy = 0;
    if (keys['ArrowUp']) player2.dy = -5;
    if (keys['ArrowDown']) player2.dy = 5;
    if (keys['ArrowLeft']) player2.dx = -5;
    if (keys['ArrowRight']) player2.dx = 5;

    // Update positions
    player1.x += player1.dx;
    player1.y += player1.dy;
    player2.x += player2.dx;
    player2.y += player2.dy;

    // Collision detection and response
    if (player1.x < player2.x + player2.width &&
        player1.x + player1.width > player2.x &&
        player1.y < player2.y + player2.height &&
        player1.y + player1.height > player2.y) {
        
        // Simple collision response
        player1.x -= player1.dx;
        player1.y -= player1.dy;
        player2.x -= player2.dx;
        player2.y -= player2.dy;

        // Decrease health and increase score
        player1.health -= 1;
        player2.health -= 1;
        player1.score += 1;
        player2.score += 1;
    }

    // Update health bars
    document.getElementById('player1-health').style.width = player1.health + 'px';
    document.getElementById('player2-health').style.width = player2.health + 'px';
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw players
    ctx.fillStyle = player1.color;
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);

    ctx.fillStyle = player2.color;
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
