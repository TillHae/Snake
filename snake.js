const canvas = document.getElementById("canvas");
const board = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const scorePrompt = document.getElementById("score");
const gameWidth = canvas.width;
const gameHeight = canvas.height;
const unitSize = 50;
const width = gameWidth / unitSize;
const height = gameHeight / unitSize;
const foodColor = "red";
const SnakeColor = "green"

let apple;     // (x, y)
let snake = [[4, 4], [5, 4], [6, 4], [7, 4]];
let score = 0       // score is always the same as amount of apples eaten
let direction = [-1, 0]  // (left/right, down/up)

scorePrompt.innerHTML = score       // update score with first value

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
        moveSnake();
        drawBoard();
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
    if (gameOver()){
        endGame();
    }
    else{
        checkApple();
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
        updateScore();
        createApple();
    }
    else{
        snake.pop();
    }
};

// increment score by one and update the HTML prompt
function updateScore(){
    score += 1
    scorePrompt.innerHTML = score
};

// overwrites apple with a random position outside of snake
function createApple(){
    do{
        apple = [Math.floor(Math.random() * width), Math.floor(Math.random() * height)];
    } while(snake.some(part => part[0] == apple[0] && part[1] == apple[1]))
};

// ends game
function endGame(){
    window.alert("Game Over! Your score was: " + snake.length);
};