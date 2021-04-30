// Declare global variables
var sw=20,  //width of a square
    sh=20,  //height of a square
    tr=30, // number of columns
    td=30;  //number of rows

var snake = null, 
    food = null,  
    game = null;  

//Square function creates multuple elements such as snake body, snake head, and apple.
function Square(x,y,classname) {
    this.x = x * sw;
    this.y = y * sh;
    this.class = classname;
    this.viewContent = document.createElement('div'); //create div for each square
    this.viewContent.className = this.class;  //Adding DOM classes
    this.parent = document.getElementById('snakeWrap'); //set 'snakeWrap' as its parent
}

//Create style element in the Square.
Square.prototype.create = function() {   
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.width = sw + 'px';
    this.viewContent.style.height = sh + 'px';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.parent.appendChild(this.viewContent); // Appending child elements of Square.
}

// Remove element of viewContent
Square.prototype.remove = function() {
    this.parent.removeChild(this.viewContent);
}

function Snake() {
    this.head = null;  //Store information of snake head
    this.tail = null;  //Store information of snake tail
    this.pos = []; // Store position information of snake.
    this.directionNum = { // Snake directions
        left: { x: -1, y: 0, rotate: 180},
        right: {x: 1, y: 0,rotate: 0},
        up: {x: 0, y: -1, rotate: -90 },
        down: { x: 0, y: 1, rotate: 90 }
    }
}

// Initializing snake
Snake.prototype.init = function() {
    var snakeHead = new Square(2,0,'snakeHead'); // Creating new snake
    snakeHead.create(); // Create snake head;
    this.head = snakeHead; // Store the information of snake head;
    this.pos.push([2,0]);
    // Create snake head
    var snakeBody1 = new Square(1,0,'snakeBody');
    snakeBody1.create();
    this.pos.push([1,0]);
    var snakeBody2 = new Square(0,0,'snakeBody');
    snakeBody2.create();
    this.tail = snakeBody2;  // Store snake tail
    this.pos.push([0,0]);
    // Forming the linklist of snakehead and snakebody
    snakeHead.last = null;
    snakeHead.next = snakeBody1;
    snakeBody1.last = snakeHead;
    snakeBody1.next = snakeBody2;
    snakeBody2.last = snakeBody1;
    snakeBody2.next = null;
    // Adding direction to snakebody and set the initial direction to right.
    this.direction = this.directionNum.right; 
}

Snake.prototype.getNextPos = function() {
    var nextPos = [ // Store snake position
        this.head.x/sw + this.direction.x, 
        this.head.y/sh + this.direction.y   
    ];

    // If next point overlapped with snake points, then game over.
    var selfCollied = false; 
    this.pos.forEach(function(value) {
        if(value[0] == nextPos[0] && value[1] == nextPos[1]) {   
            // If x and y of position are same, then snake will hit itself on next point.
            selfCollied = true;
        }
    });
    if(selfCollied) {
        console.log("Hit Itself!");
        this.strategies.die.call(this);
        return;     
    }
    // 2、If next point is wall, then game over.
    if(nextPos[0] < 0 || nextPos[1] < 0 || nextPos[0] > td - 1 || nextPos[1] > tr - 1) {
        console.log("Hit the Wall!");
        this.strategies.die.call(this);
        return;
    }
    // If next point is apple, then eat the apple.
    if(food && food.pos[0] == nextPos[0] && food.pos[1] == nextPos[1]) {
        console.log("Eat Apple");
        this.strategies.eat.call(this);
        return;
    }
    // If next point contains nothing, then just walk though
    this.strategies.move.call(this); 
}
// After hit wall or itself:
Snake.prototype.strategies = {
    move: function(format) {  
        var newBody = new Square(this.head.x/sw, this.head.y/sh, 'snakeBody'); // Create new snake body
        newBody.next = this.head.next; // Renew the linklist of connection of snake body and head
        newBody.next.last = newBody;
        newBody.last = null;
        this.head.remove();  //Removing old snake head
        newBody.create();    //Adding new snake body
        var newHead = new Square(this.head.x/sw + this.direction.x,this.head.y/sh + this.direction.y,'snakeHead'); // Creating new snake head
        newHead.next = newBody; // Renewing connection of snake body
        newHead.last = null;
        newBody.last = newHead;
        newHead.viewContent.style.transform = 'rotate(' + this.direction.rotate + 'deg)';
        newHead.create();   //Adding new snake head to the page
        this.pos.splice(0,0,[this.head.x/sw + this.direction.x,this.head.y/sh + this.direction.y]);   //Renewing position store in the snake
        this.head = newHead;  //Renewing snake head
        if(!format) { 
            this.tail.remove();
            this.tail = this.tail.last;
            this.pos.pop();
        }
    },
    eat: function() {
        this.strategies.move.call(this, true);
        createFood();
        game.score++;
        document.getElementById("score").innerHTML="Score:"+game.score;
    },
    die: function() {
        game.over();
        document.getElementById("score").innerHTML="Game Over";
    }
}
snake = new Snake();

// Create apple
function createFood(params) {
    // Randomly assign number to the location of apple
    var x = null;
    var y = null;
    var include = true; 
    while(include) {
        x = Math.round(Math.random()*(td - 2));     //Choosing position of apple from 1-28.
        y = Math.round(Math.random()*(tr - 2));    
        snake.pos.some(function(value) {
            if(x != value[0] && y != value[1]) {
                include = false;
            }else{ // If x or y of apple location overlapped with the snake location, then jump out of loop.
                include = true;
                return true;
            }
        });
    }
    // Create apple 
    food = new Square(x,y,'food');
    food.pos = [x, y];  //Store apple position
    var foodDom = document.querySelector('.food');
    if(foodDom) {  //If there is an apple, then change position. 
        foodDom.style.left = x * sw + 'px';
        foodDom.style.top = y * sh + 'px';
    }else{   
        food.create(); // If there is no apple in the div, then create one. 
    }
}


// Game logic
function Game() {    
    this.timer = null; 
    this.score = 0;  
}   

Game.prototype.init = function() {
    snake.init();
    createFood();
    document.onkeydown = function(ev) {
        if(ev.which == 37 && snake.direction != snake.directionNum.right) {  // 用户按下左方向键，并且蛇的方向不往右边走
            snake.direction = snake.directionNum.left;
        }else if(ev.which == 38 && snake.direction != snake.directionNum.down) {  //上
            snake.direction = snake.directionNum.up;
        }else if(ev.which == 39 && snake.direction != snake.directionNum.left) {  //右
            snake.direction = snake.directionNum.right;
        }else if(ev.which == 40 && snake.direction != snake.directionNum.up) {  //下
            snake.direction = snake.directionNum.down;
        }
    }
    this.start();
}

// Game Start
Game.prototype.start = function() {
    this.timer = setInterval(() => {
        snake.getNextPos();
    }, 200);
}

// Pause Game 
Game.prototype.pause = function() { 
    clearInterval(this.timer);
}

Game.prototype.over = function() { 
    clearInterval(this.timer);
    // Restart Game
    var snakeWrap = document.getElementById('snakeWrap');
    snakeWrap.innerHTML = '';  //Clear page
    snake = new Snake();  //Clear snake
    game = new Game();  //Restart game
    var startBtnWrap = document.querySelector('.startBtn');
    startBtnWrap.style.display = 'block';
}

// Start Game
game = new Game();
var startBtn = document.querySelector('.startBtn button');
startBtn.onclick = function() {
    startBtn.parentNode.style.display = 'none';
    game.init();// Game initialize
}

// Pause Game
var snakeWrap = document.getElementById('snakeWrap');
var pauseBtn = document.querySelector('.pauseBtn button');
snakeWrap.onclick = function() {
    game.pause();
    pauseBtn.parentNode.style.display = 'block';  
}
pauseBtn.onclick = function() {
    game.start();
    pauseBtn.parentNode.style.display = 'none';
}