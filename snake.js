const canvas = document.getElementById("canvas");
const board = canvas.getContext("2d");
const gameWidth = board.width;
const gameHeight = board.height;
const unitSize = 50;
const foodColor = "red";
const SnakeColor = "green"

let apple = [0, 0];     // (x, y)
let snake = [[7, 4], [6, 4], [5, 4], [4, 4]];
let direction = (-1, 0)  // (left/right, down/up)

// calls changeDirection whenever a key is pressed
window.addEventListener("keydown", changeDirection);

// start game
function startGame(){
    console.log("Game started")
    nextRound();
};

// starts next round
function nextRound(){
    drawBoard();
    moveSnake();
};

// draws the board
function drawBoard(){
    // set board to black
    board.fillStyle = "black";
    board.fillRect(0, 0, gameWidth, gameHeight);

    // add Apple
    board.fillStyle = foodColor;
    board.fillRect(apple[0], apple[1], unitSize, unitSize);

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
            direction = (-1, 0);
        case (keyPressed == right):
            direction = (1, 0);
        case (keyPressed == down):
            direction = (0, -1);
        case (keyPressed == up):
            direction = (0, 1);
    }
}

// moves Snake
function moveSnake(){
    let len = snake.length
    snake.push((snake[len - 1][0] + direction[0], snake[len - 1][1] + direction[1]));
    if (gameOver()){
        endGame();
    }
    else{
        checkApple();
        //nextRound();
    }
};

// Test whether game is over
function gameOver(){};

// checks if apple was eaten // pop from snake when apple was not eaten
function checkApple(){
    eatApple();
};

// Snake eats the apple
function eatApple(){
    createApple();
};

// creates an apple at a random position
function createApple(){};

// ends game
function endGame(){};

startGame()