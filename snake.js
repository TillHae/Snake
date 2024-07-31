const canvas = document.getElementById("canvas");
const board = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const gameWidth = canvas.width;
const gameHeight = canvas.height;
const unitSize = 50;
const width = gameWidth / unitSize;
const height = gameHeight / unitSize;
const foodColor = "red";
const SnakeColor = "green"

let apple;     // (x, y)
let snake = [[4, 4], [5, 4], [6, 4], [7, 4]];
let direction = [-1, 0]  // (left/right, down/up)

// calls changeDirection whenever a key is pressed
window.addEventListener("keydown", changeDirection);
startBtn.addEventListener("click", startGame);

// start game
function startGame(){
    createApple();
    snake = [[4, 4], [5, 4], [6, 4], [7, 4]];
    direction = [-1, 0]  // (left/right, down/up)
    nextRound();
};

// starts next round
function nextRound(){
    setTimeout(() => {
        drawBoard();
        moveSnake();
    }, 400);
};

// draws the board
function drawBoard(){
    // set board to black
    board.fillStyle = "black";
    board.fillRect(0, 0, gameWidth, gameHeight);

    // add Apple
    board.fillStyle = foodColor;
    board.fillRect(apple[0] * unitSize, apple[1] * unitSize, unitSize, unitSize);

    // add Snake
    board.fillStyle = SnakeColor;
    snake.forEach(part => {
        board.fillRect(part[0] * unitSize, part[1] * unitSize, unitSize, unitSize);
    })
};

// changes Direction of Snake
function changeDirection(){
    const keyPressed = event.keyCode;
    const left = 37;
    const right = 39;
    const down = 40;
    const up = 38;
    switch (true){
        case (keyPressed == left):
            direction = [-1, 0];
            break;
        case (keyPressed == right):
            direction = [1, 0];
            break;
        case (keyPressed == down):
            direction = [0, 1];
            break;
        case (keyPressed == up):
            direction = [0, -1];
    }
}

// moves Snake
function moveSnake(){
    snake.unshift([snake[0][0] + direction[0], snake[0][1] + direction[1]]);
    checkApple();
    if (gameOver()){
        endGame();
    }
    else{
        nextRound();
    }
};

// Test whether game is over
function gameOver(){
    for (let i = 1; i < snake.length; i++){
        if (snake[0][0] == snake[i][0] && snake[0][1] == snake[i][1]){
            return true;
        }
    }
    if (snake[0][0] >= width || snake[0][1] >= height || snake[0][0] < 0 || snake[0][1] < 0){
        return true;
    }
    else{
        return false;
    }
};

// checks if apple was eaten // pop from snake when apple was not eaten
function checkApple(){
    if (snake[0][0] == apple[0] && snake[0][1] == apple[1]){
        createApple();
    }
    else{
        snake.pop();
    }
};

// overwrites apple with a random position
function createApple(){
    apple = [Math.round(Math.random() * width), Math.round(Math.random() * height)];
};

// ends game
function endGame(){
    drawBoard();
    window.alert("Game Over! Your score was: " + snake.length);
};

startGame();