const canvas = document.getElementById("canvas");
const board = canvas.getContext("2d");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const unitSize = 50;
const foodColor = "red";
const SnakeColor = "green"

let apple = (0, 0);     // (x, y)
let snake = [(7, 4), (6, 4), (5, 4), (3, 4)];

// start game
function startGame(){};

// draws the board
function drawBoard(){
    // set board to black
    board.fillStyle("black");
    board.fillRect(0, 0, gameWidth, gameHeight);
    // add Apple
    board.fillStyle(foodColor);
    board.fillRect(apple[0], apple[1], unitSize, unitSize);

    // add Snake
    board.fillStyle(SnakeColor);
    snake.forEach(tuple => {
        board.fillRect(tuple[0], tuple[1], unitSize, unitSize);
    })
};

// moves Snake
function moveSnake(){};

// Test whether game is over
function gameOver(){};

// checks if apple was eaten // pop from snake when apple was not eaten
function checkApple(){};

// Snake eats the apple
function eatApple(){};

// creates an apple at a random position
function createApple(){};

// ends game
function endGame(){};