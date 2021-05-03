//document.addEventListener('DOMContentLoaded', () => {
const grid = document.querySelector('.grid');
const doodler = document.createElement('div');
const scoreDiv = document.querySelector('.score');
const startDiv = document.querySelector('.start');
const restartDiv = document.querySelector('.restart');
const resultDiv=document.querySelector('.result');

let doodlerLeftSpace = 50;
let doodlerBottomSpace = 250;
let isGameOver = false;
let platformCount = 5;
let platforms = [];
let upTimerId;
let downTimerId;
let isJumping = true;
let startPoint = 0;
let isGoingLeft = false;
let isGoingRight = false;
let leftTimerId;
let rightTimerId;
let score = 0;
let moveTimerId;

class Platform {
    constructor(newPlatBottom) {
        this.bottom = newPlatBottom;
        this.left = Math.random() * 315;
        this.visual = document.createElement('div');

        const visual = this.visual;
        visual.classList.add('platform');
        visual.style.left = this.left + 'px';
        visual.style.bottom = this.bottom + 'px';
        grid.appendChild(visual);
    }
}

function createDoodler() {
    grid.appendChild(doodler);
    doodler.classList.add('doodler');
    doodlerLeftSpace = platforms[0].left;
    console.log(doodlerLeftSpace);
    doodler.style.left = doodlerLeftSpace + 'px';
    doodler.style.bottom = doodlerBottomSpace + 'px';
}

function createPlatform() {
    for (let i = 0; i < platformCount; i++) {
        let platGap = 600 / platformCount;
        let newPlatBottom = 100 + i * platGap;
        let newPlatform = new Platform(newPlatBottom);
        platforms.push(newPlatform);
        console.log(platforms);
    }
}

function movePlatforms() {
    if (doodlerBottomSpace > 200) {
        platforms.forEach(platform => {
            platform.bottom -= 4;
            let visual = platform.visual;
            visual.style.bottom = platform.bottom + 'px';
            console.log(visual.style.bottom);
            if (platform.bottom < 10) {
                let firstPlateform = platforms[0].visual;
                firstPlateform.classList.remove('platform');
                platforms.shift();
                console.log(platform);
                let newPlatform = new Platform(600);
                platforms.push(newPlatform);

                // Updating scores
                score++;
                scoreDiv.innerHTML = 'SCORE<br>' + score;
            }
        })
    }
}

function jump() {
    clearInterval(downTimerId);
    isJumping = true;
    upTimerId = setInterval(function () {
        doodlerBottomSpace += 20;
        doodler.style.bottom = doodlerBottomSpace + 'px';
        if (doodlerBottomSpace > startPoint + 200) {
            fall();
            isJumping = false;
        }
    }, 30)
}

function fall() {
    clearInterval(upTimerId);
    isJumping = false;
    downTimerId = setInterval(function () {
        doodlerBottomSpace -= 5;
        doodler.style.bottom = doodlerBottomSpace + 'px';

        if (doodlerBottomSpace <= 0) {
            gameOver();
        }

        platforms.forEach(platform => {
            if (
                (doodlerBottomSpace >= platform.bottom)
                && (doodlerBottomSpace <= (platform.bottom + 15))
                && ((doodlerLeftSpace + 60) >= platform.left)
                && (doodlerLeftSpace <= (platform.left + 85))
                && !isJumping
            ) {
                console.log('landed');
                startPoint = doodlerBottomSpace;
                jump();
                isJumping = true;
            }
        })
    }, 30)
}

function control(e) {
    doodler.style.bottom = doodlerBottomSpace + 'px'
    if (e.key === 'ArrowLeft') {
        moveLeft();
    } else if (e.key === 'ArrowRight') {
        moveRight();
    } else if (e.key === 'ArrowUp') {
        moveStraight();
    }
}

function moveLeft() {
    if (isGoingRight) {
        clearInterval(rightTimerId);
        isGoingRight = false;
    }
    isGoingLeft = true;
    leftTimerId = setInterval(function () {
        if (doodlerLeftSpace >= 0) {
            doodlerLeftSpace -= 5;
            //console.log('going left');
            doodler.style.left = doodlerLeftSpace + 'px';
        } else moveRight();

    }, 30)
}

function moveRight() {
    if (isGoingLeft) {
        clearInterval(leftTimerId);
        isGoingLeft = false;
    }
    isGoingRight = true;
    rightTimerId = setInterval(function () {
        if (doodlerLeftSpace <= 313) {
            doodlerLeftSpace += 5;
            //console.log('going right');
            doodler.style.left = doodlerLeftSpace + 'px';
        } else moveLeft()
    }, 30)
}

function moveStraight() {
    isGoingRight = false;
    isGoingleft = false;
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);
}

function gameOver() {
    console.log('Game Over');
    isGameOver = true;
    score=0;
    scoreDiv.innerHTML = 'SCORE<br>' + score;
    clearInterval(upTimerId);
    clearInterval(downTimerId);
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);
    clearInterval(moveTimerId);
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    restartDiv.style.visibility = 'visible';
    resultDiv.innerHTML="Game Over!";
}

function start() {
    if (!isGameOver) {
        createPlatform();
        createDoodler();
        moveTimerId=setInterval(movePlatforms, 30);
        jump();
        document.addEventListener('keyup', control);
        startDiv.style.visibility = 'hidden';
    }
}

function restart() {
    doodlerLeftSpace = 50;
    doodlerBottomSpace = 250;
    isGameOver = false;
    platformCount = 5;
    platforms = [];
    isJumping = true;
    startPoint = 0;
    isGoingLeft = false;
    isGoingRight = false;
    clearInterval(upTimerId);
    clearInterval(downTimerId);
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);
    clearInterval(moveTimerId);
    if (!isGameOver) {
        createPlatform();
        createDoodler();
        moveTimerId=setInterval(movePlatforms, 30);
        jump();
        document.addEventListener('keyup', control);
    }
    restartDiv.style.visibility = 'hidden';
}


//})